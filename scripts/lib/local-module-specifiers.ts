import ts from "typescript";

/** Read real module edges; comments and generated-code strings are not imports. */
export function localModuleSpecifiers({
	path,
	source,
}: {
	path: string;
	source: string;
}): string[] {
	const syntax = ts.createSourceFile(
		path,
		source,
		ts.ScriptTarget.Latest,
		true,
		path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
	);
	const specifiers = new Set<string>();
	function visit(node: ts.Node) {
		if (
			(ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
			node.moduleSpecifier &&
			ts.isStringLiteral(node.moduleSpecifier)
		) {
			if (node.moduleSpecifier.text.startsWith("."))
				specifiers.add(node.moduleSpecifier.text);
		}
		if (
			ts.isCallExpression(node) &&
			node.expression.kind === ts.SyntaxKind.ImportKeyword &&
			node.arguments.length === 1 &&
			ts.isStringLiteral(node.arguments[0])
		) {
			if (node.arguments[0].text.startsWith("."))
				specifiers.add(node.arguments[0].text);
		}
		ts.forEachChild(node, visit);
	}
	visit(syntax);
	return [...specifiers];
}
