module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "prettier",

    ],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
    ignorePatterns: ["node_modules/**", "dist/**"], // ignoring here works
};
