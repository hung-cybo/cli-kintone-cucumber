// cucumber.js
const featureToRun = process.env.FEATURE;

const common = [
  // 'src/features/**/*.feature',                // Specify our feature files
  "--require-module ts-node/register", // Load TypeScript module
  "--require src/step-definitions/**/*.ts", // Load step definitions
  "--format @cucumber/pretty-formatter",
  "--publish-quiet",
  "--backtrace",
  // '--parallel 3',
  // '--retry 3',
];

if (featureToRun) {
  common.push(featureToRun);
} else {
  common.push("src/features/**/*.feature");
}

module.exports = {
  default: common.join(" "),
};
