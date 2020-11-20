import dynamic from "next/dynamic";

import sample from "../code-sample3";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

function IndexPage() {
  return (
    <MonacoEditor
      height={"600px"}
      language="json"
      theme="vs-dark"
      value={sample}
      onChange={console.log}
      editorDidMount={() => {
        window.MonacoEnvironment.getWorkerUrl = (moduleId, label) => {
          console.log(
            "setting MonacoEnvironment.moduleID is ",
            moduleId,
            "and label is ",
            label
          );
          if (label === "json") return "/_next/static/json.worker.js";
          if (label === "css") return "/_next/static/css.worker.js";
          if (label === "html") return "/_next/static/html.worker.js";
          if (label === "typescript" || label === "javascript")
            return "/_next/static/ts.worker.js";
          return "/_next/static/editor.worker.js";
        };
      }}
    />
  );
}

export default IndexPage;
