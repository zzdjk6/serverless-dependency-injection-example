module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["prettier"],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": process.env.CI ? "error" : "warn",
    "linebreak-style": process.env.CI ? ["error", "unix"] : "off",
    curly: "error",
  },
};
