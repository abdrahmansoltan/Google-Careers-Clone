module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"], // file extensions to look for when testing are ".spec.js or .test.js"
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};
