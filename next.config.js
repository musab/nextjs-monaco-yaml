const withCSS = require("@zeit/next-css");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

// We can add modify the worker id of yaml in the language object before we initialize the MonacoWebpackPlugin
// this is what allows us to import monaco-yaml directly into the monacoWebpackPlugin
const { languagesArr } = require("monaco-editor-webpack-plugin/out/languages");
const yamlLang = languagesArr.find((t) => t.label === "yaml");

yamlLang.entry = [
  yamlLang.entry,
  "../../monaco-yaml/lib/esm/monaco.contribution",
];
yamlLang.worker = {
  id: "vs/language/yaml/yamlWorker",
  entry: "../../monaco-yaml/lib/esm/yaml.worker.js",
};

module.exports = withCSS({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });

    config.plugins.push(
      new MonacoWebpackPlugin({
        // yaml needs to be added in the languates array
        languages: [
          "javascript",
          "typescript",
          "html",
          "json",
          "handlebars",
          "yaml",
        ],
        filename: "static/[name].worker.js",
      })
    );

    return config;
  },
});
