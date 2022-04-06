const pkg = require("./package.json");
const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];

export default {
  input: "dist/temp/index.js",
  output: [
    {
      file: "dist/" + pkg.main,
      format: "umd",
      exports: "named",
      name: pkg.name,
      sourcemap: true,
      globals: {
        angular: "angular",
        tslib: "tslib",
      },
    },
    {
      file: "dist/" + pkg.module,
      format: "es",
      sourcemap: true,
      globals: {
        angular: "angular",
        tslib: "tslib",
      },
    },
  ],
  external,
  plugins: [],
};
