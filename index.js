module.exports = {
  rules: {
    "enforce-async-params": require("./lib/rules/enforce-async-params"),
  },
  configs: {
    recommended: {
      plugins: ["next-router-async"],
      rules: {
        "next-router-async/enforce-async-params": "warn",
      },
    },
  },
};
