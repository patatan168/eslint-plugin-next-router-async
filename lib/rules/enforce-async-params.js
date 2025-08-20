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
    function isInsideAsyncFunction(ancestors) {
      return ancestors.some(
        (node) =>
          (node.type === "FunctionDeclaration" ||
            node.type === "ArrowFunctionExpression") &&
          node.async
      );
    }

    function checkFunctionParams(fnNode) {
      if (fnNode.async) return;

      const param = fnNode.params[0];
      if (param?.type === "ObjectPattern") {
        const props = param.properties.map((p) =>
          p.type === "Property" && p.key.type === "Identifier"
            ? p.key.name
            : null
        );
        const hasSyncAccess =
          props.includes("params") || props.includes("searchParams");

        if (hasSyncAccess) {
          context.report({
            node: param,
            messageId: "requireAsync",
          });
        }
      }
    }

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

      FunctionDeclaration: checkFunctionParams,
      ArrowFunctionExpression: checkFunctionParams,
    };
  },
};
