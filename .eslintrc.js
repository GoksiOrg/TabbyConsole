module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "standard-with-typescript",
        "plugin:react/jsx-runtime"
    ],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
        ecmaVersion: "latest",
        sourceType: "module"
    },
    settings: {
        react: {
            pragma: "React",
            version: "detect"
        }
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "prettier",
        "react-hooks"
    ],
    rules: {
        "react/prop-types": 0,
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "indent": "off",
        "quotes": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/quotes": "off"
    }
};
