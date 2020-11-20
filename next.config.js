const withCSS = require("@zeit/next-css");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

// const path = require("path");
const { languagesArr } = require("monaco-editor-webpack-plugin/out/languages");

const yamlLang = languagesArr.find((t) => t.label === "yaml");
console.log("yamlLang is ", yamlLang);
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
        // Add languages as needed...
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
