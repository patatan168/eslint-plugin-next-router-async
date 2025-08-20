module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce async usage of params and searchParams in Next.js App Router",
      recommended: true,
    },
    messages: {
      requireAsync:
        "`params` and `searchParams` should be accessed via async context (e.g., await).",
    },
    schema: [], // no options
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (
          node.id.type === "ObjectPattern" &&
          node.init?.type === "Identifier" &&
          node.init.name === "context"
        ) {
          const props = node.id.properties.map((p) => p.key.name);
          const hasSyncAccess =
            props.includes("params") || props.includes("searchParams");

          if (hasSyncAccess && !isInsideAsyncFunction(context.getAncestors())) {
            context.report({
              node,
              messageId: "requireAsync",
            });
          }
        }
      },
    };
  },
};

function isInsideAsyncFunction(ancestors) {
  return ancestors.some(
    (node) =>
      (node.type === "FunctionDeclaration" ||
        node.type === "ArrowFunctionExpression") &&
      node.async
  );
}
