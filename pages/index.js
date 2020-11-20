import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import sample from "../code-sample3";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

const resolveRelativeUrl = (url) =>
  new URL(url, window.location.href).toString();

function IndexPage() {
  const [value, setValue] = useState(null);
  // const editorRef = React.useRef();

  /* in the monaco-yaml example, they had to access the monaco api by importing it directly into this file.
  however, since we're adding monaco-yaml through the plugin, we can access the yaml object directly 
  through the _monaco object that's made availble through the editorDidMount function
   */
  const editorDidMount = (editor, _monaco) => {
    // editorRef.current = editor;

    console.log(_monaco);
    const { yaml } = _monaco.languages || {};
    console.log("yaml is ,", yaml);
    yaml &&
      yaml.yamlDefaults.setDiagnosticsOptions({
        validate: true,
        enableSchemaRequest: true,
        hover: true,
        completion: true,
        enableSchemaRequest: true,
        format: true,
        // the file path is wrong here - need to figure out how next.js resolves static assets 
        schemas: [
          {
            uri: resolveRelativeUrl("../circleciconfig.json"),
            fileMatch: ["*"],
          },
        ],
      });

    console.log(yaml);

    // The other languages aside from yaml don't matter here
    // including them so we can switch back easily between languages to verify if something is a yaml specific issue
    window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
      console.log(
        "setting MonacoEnvironment.moduleID is ",
        moduleId,
        "and label is ",
        label
      );
      // the workers are available at these urls because of the monaco-webpack-plugin
      if (label === "json") return "/_next/static/json.worker.js";
      if (label === "css") return "/_next/static/css.worker.js";
      if (label === "html") return "/_next/static/html.worker.js";
      if (label === "typescript" || label === "javascript")
        return "/_next/static/ts.worker.js";
      // note that the yaml worker was not imported into this file, it was imported through the monaco webpack plugin
      if (label === "yaml") {
        return "/_next/static/yaml.worker.js";
      }
      return "/_next/static/editor.worker.js";
    };
  };

  return (
    <MonacoEditor
      height={"600px"}
      language="yaml"
      theme="vs-dark"
      value={value}
      // onChange={console.log}
      editorDidMount={(editor, _monaco) => {}}
    />
  );
}

export default IndexPage;
