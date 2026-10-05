import ts from "typescript";

export interface AuthoredPlacement {
	ref: string;
	x_mm: number;
	y_mm: number;
	ccw_rotation_degrees: number;
	rotation_explicit: boolean;
	line: number;
}

function numericLiteral(expression: ts.Expression): number {
	if (ts.isNumericLiteral(expression)) return Number(expression.text);
	if (
		ts.isPrefixUnaryExpression(expression) &&
		expression.operator === ts.SyntaxKind.MinusToken &&
		ts.isNumericLiteral(expression.operand)
	)
		return -Number(expression.operand.text);
	throw new Error(`Audit requires a literal, found ${expression.getText()}`);
}

function lengthMillimetres(attribute: ts.JsxAttribute): number {
	const initializer = attribute.initializer;
	if (initializer && ts.isStringLiteral(initializer)) {
		if (!/^-?\d+(\.\d+)?mm$/.test(initializer.text))
			throw new Error(
				`Audit requires explicit mm units: ${attribute.getText()}`,
			);
		return Number(initializer.text.slice(0, -2));
	}
	if (initializer && ts.isJsxExpression(initializer) && initializer.expression)
		return numericLiteral(initializer.expression);
	throw new Error(`Unsupported length: ${attribute.getText()}`);
}

export function readAuthoredPlacements(
	sourceText: string,
): AuthoredPlacement[] {
	const sourceFile = ts.createSourceFile(
		"remote-circuit.tsx",
		sourceText,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TSX,
	);
	const placements: AuthoredPlacement[] = [];
	visitPlacements(sourceFile, { sourceFile, placements });
	if (placements.length !== 37)
		throw new Error(
			`Expected 37 authored fitted placements, got ${placements.length}`,
		);
	return placements;
}

function visitPlacements(
	node: ts.Node,
	context: { sourceFile: ts.SourceFile; placements: AuthoredPlacement[] },
) {
	if (ts.isJsxSelfClosingElement(node)) {
		const attributes = node.attributes.properties.filter(ts.isJsxAttribute);
		const name = attributes.find(
			(attribute) => attribute.name.getText() === "name",
		);
		if (
			name?.initializer &&
			ts.isStringLiteral(name.initializer) &&
			/^(J|U|R|C|Q|LED|SW)\d+$/.test(name.initializer.text)
		) {
			const x = attributes.find(
				(attribute) => attribute.name.getText() === "pcbX",
			);
			const y = attributes.find(
				(attribute) => attribute.name.getText() === "pcbY",
			);
			const rotation = attributes.find(
				(attribute) => attribute.name.getText() === "pcbRotation",
			);
			if (!x || !y)
				throw new Error(`Missing authored XY: ${name.initializer.text}`);
			let ccwRotationDegrees = 0; // Documented pcbRotation default, not an inferred orientation.
			if (rotation) {
				if (
					!rotation.initializer ||
					!ts.isJsxExpression(rotation.initializer) ||
					!rotation.initializer.expression
				)
					throw new Error(`Unsupported rotation: ${rotation.getText()}`);
				ccwRotationDegrees = numericLiteral(rotation.initializer.expression);
			}
			context.placements.push({
				ref: name.initializer.text,
				x_mm: lengthMillimetres(x),
				y_mm: lengthMillimetres(y),
				ccw_rotation_degrees: ccwRotationDegrees,
				rotation_explicit: Boolean(rotation),
				line:
					context.sourceFile.getLineAndCharacterOfPosition(node.getStart())
						.line + 1,
			});
		}
	}
	ts.forEachChild(node, (child) => visitPlacements(child, context));
}
