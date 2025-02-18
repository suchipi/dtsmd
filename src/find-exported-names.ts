import * as ee from "equivalent-exchange";
import traverse from "@suchipi/traverse";

function typeScriptTrustMeItsA<T>(_value: unknown): asserts _value is T {}

export type ExportedNames = {
  // local name to exported name
  [localName: string]: string;
};

const cache = new WeakMap<
  ee.types.Program | ee.types.TSModuleDeclaration,
  ExportedNames
>();

export function findExportedNames(
  ast: ee.types.Program | ee.types.TSModuleDeclaration
): ExportedNames {
  if (cache.has(ast)) {
    return cache.get(ast)!;
  }

  const outerType = ast.type;

  const exportedNames: { [localName: string]: string } = {};
  traverse(ast, {
    before(value: unknown, path): any {
      if (typeof value !== "object" || value == null) {
        return;
      }
      const node = value as { type?: string };

      if (outerType === "Program" && node?.type === "TSModuleDeclaration") {
        // this function only checks the outer scope
        return traverse.stop;
      }

      if (node.type === "ExportNamedDeclaration") {
        typeScriptTrustMeItsA<ee.types.ExportNamedDeclaration>(node);
        if (node.source) {
          return traverse.stop;
        }

        for (const specifier of node.specifiers) {
          if (!ee.types.isExportSpecifier(specifier)) {
            continue;
          }
          const localName = specifier.local.name;
          let exportedName: string;
          if (ee.types.isIdentifier(specifier.exported)) {
            exportedName = specifier.exported.name;
          } else if (ee.types.isStringLiteral(specifier.exported)) {
            exportedName = specifier.exported.value;
          } else {
            // this should never happen...
            continue;
          }

          exportedNames[localName] = exportedName;
        }
      }
    },
  });
  cache.set(ast, exportedNames);
  return exportedNames;
}
