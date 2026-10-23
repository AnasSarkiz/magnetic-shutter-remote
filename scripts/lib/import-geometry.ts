import ts from "typescript";

type Literal = string | number | boolean | null | Literal[] | LiteralObject;
type LiteralObject = { [key: string]: Literal };
type Feature = { element: string; attributes: LiteralObject };

function readLiteral(node: ts.Expression): Literal {
	if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node))
		return readLiteral(node.expression);
	if (ts.isStringLiteral(node)) return node.text;
	if (ts.isNumericLiteral(node)) return Number(node.text);
	if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
	if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
	if (node.kind === ts.SyntaxKind.NullKeyword) return null;
	if (
		ts.isPrefixUnaryExpression(node) &&
		node.operator === ts.SyntaxKind.MinusToken &&
		ts.isNumericLiteral(node.operand)
	)
		return -Number(node.operand.text);
	if (ts.isArrayLiteralExpression(node))
		return node.elements.map((element) => readLiteral(element));
	if (ts.isObjectLiteralExpression(node)) {
		const properties: LiteralObject = {};
		for (const property of node.properties) {
			if (!ts.isPropertyAssignment(property))
				throw new Error(`Nonliteral property: ${property.getText()}`);
			const name = property.name;
			if (!ts.isIdentifier(name) && !ts.isStringLiteral(name))
				throw new Error(`Nonliteral key: ${name.getText()}`);
			properties[name.text] = readLiteral(property.initializer);
		}
		return properties;
	}
	throw new Error(`Unsupported literal: ${node.getText()}`);
}

function readAttributes(node: ts.JsxAttributes): LiteralObject {
	const attributes: LiteralObject = {};
	for (const attribute of node.properties) {
		if (!ts.isJsxAttribute(attribute))
			throw new Error("Spread attributes require explicit inspection");
		const initializer = attribute.initializer;
		if (!initializer) attributes[attribute.name.getText()] = true;
		else if (ts.isStringLiteral(initializer))
			attributes[attribute.name.getText()] = initializer.text;
		else if (ts.isJsxExpression(initializer) && initializer.expression)
			attributes[attribute.name.getText()] = readLiteral(
				initializer.expression,
			);
		else throw new Error(`Unsupported attribute: ${attribute.getText()}`);
	}
	return attributes;
}

interface ImportInspection {
	features: Feature[];
	counts: Record<string, number>;
	declarations: LiteralObject;
	insertionDirection: Literal;
	switchType: string | null;
}

function visitImportNode(node: ts.Node, inspection: ImportInspection) {
	if (
		ts.isVariableDeclaration(node) &&
		ts.isIdentifier(node.name) &&
		["pinLabels", "pinAttributes"].includes(node.name.text) &&
		node.initializer
	)
		inspection.declarations[node.name.text] = readLiteral(node.initializer);
	if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
		const element = node.tagName.getText();
		inspection.counts[element] = (inspection.counts[element] ?? 0) + 1;
		if (["smtpad", "platedhole", "hole", "solderpaste"].includes(element))
			inspection.features.push({
				element,
				attributes: readAttributes(node.attributes),
			});
		if (element === "footprint")
			inspection.insertionDirection =
				readAttributes(node.attributes).insertionDirection ?? null;
		if (element === "switch") {
			const attribute = node.attributes.properties.find(
				(property) =>
					ts.isJsxAttribute(property) && property.name.getText() === "type",
			);
			if (
				attribute &&
				ts.isJsxAttribute(attribute) &&
				attribute.initializer &&
				ts.isStringLiteral(attribute.initializer)
			)
				inspection.switchType = attribute.initializer.text;
		}
	}
	ts.forEachChild(node, (child) => visitImportNode(child, inspection));
}

/** Inspect generated TSX without executing components, downloading, or routing. */
export function inspectImport(source: string): ImportInspection {
	const syntax = ts.createSourceFile(
		"component.tsx",
		source,
		ts.ScriptTarget.Latest,
		true,
		ts.ScriptKind.TSX,
	);
	const inspection: ImportInspection = {
		features: [],
		counts: {},
		declarations: {},
		insertionDirection: null,
		switchType: null,
	};
	visitImportNode(syntax, inspection);
	return inspection;
}

/** Ignore only named process attributes when separately comparing copper/drills. */
export function copperDrillFeatures(features: Feature[]) {
	return features
		.filter((feature) => feature.element !== "solderpaste")
		.map((feature) => ({
			element: feature.element,
			attributes: Object.fromEntries(
				Object.entries(feature.attributes).filter(
					([key]) => !["solderPasteMargin", "solderMaskMargin"].includes(key),
				),
			),
		}));
}

function canonicalLiteral(literal: Literal): string {
	if (Array.isArray(literal))
		return `[${literal.map(canonicalLiteral).join(",")}]`;
	if (literal !== null && typeof literal === "object")
		return `{${Object.keys(literal)
			.sort()
			.map((key) => `${JSON.stringify(key)}:${canonicalLiteral(literal[key])}`)
			.join(",")}}`;
	return JSON.stringify(literal);
}

/** Compare exact geometry; differences are reported, never rewritten. */
export function featureSignatures(features: Feature[]) {
	return features
		.map((feature) =>
			canonicalLiteral({
				element: feature.element,
				attributes: feature.attributes,
			}),
		)
		.sort();
}

export function literalSignature(literal: Literal) {
	return canonicalLiteral(literal);
}
