export const workspaceSettings = JSON.stringify(
  {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.prettier": true,
      "source.fixAll.stylelint": true,
    },
  },
  null,
  4
);

export const tsConfigSettiings = JSON.stringify(
  {
    compilerOptions: {
      target: "ESNext",
      module: "commonjs",
      lib: ["ES6", "ES2015", "ESNext", "DOM"],
      outDir: "lib",
      rootDir: "src",
      strict: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      resolveJsonModule: true,
      importHelpers: true,
      removeComments: true,
    },
    exclude: ["node_modules", "lib"],
  },
  null,
  4
);
