import React, {useState} from "../web_modules/react.js";
import "../web_modules/bootstrap/dist/css/bootstrap.min.css.proxy.js";
import "./App.css.proxy.js";
import boilBlood from "./boilBlood.js";
import haruspicy from "./haruspicy.js";
import DataTable from "./table.js";
function App({}) {
  const [files, updateFile] = useState(null);
  const FileData = (props) => {
    const files2 = props.files;
    const [data, setData] = useState(null);
    const [countErrors, setErrors] = useState([]);
    const onFileUpload = () => {
      const formData = new FormData();
      if (files2) {
        for (let index = 0; index < files2.length; index++) {
          const file = files2.item(index);
          if (file) {
            formData.append("myFile", file, file.name);
            (async () => setData(await boilBlood(file, [], countErrors, setErrors)))();
          }
          ;
        }
        ;
      }
      ;
    };
    const ZippedData = () => {
      if (data) {
        const meta_data = haruspicy(data);
        console.log("data exists", meta_data, data);
        if (meta_data[0]) {
          console.log("meta_data[0] exists");
          const delimiter = "|";
          const headers = Object.keys(meta_data[0]).join(delimiter);
          const body = meta_data.map((j) => Object.values(j).join(delimiter)).join("\n");
          const str = headers + "\n" + body;
          const bytes = new TextEncoder().encode(str);
          const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8"
          });
          const objectUrl = URL.createObjectURL(blob);
          const date = new Date();
          const date_output = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
          return /* @__PURE__ */ React.createElement("div", {
            className: "App"
          }, /* @__PURE__ */ React.createElement("h2", null, "Unzipped Details:"), /* @__PURE__ */ React.createElement("p", null, "Number of xlsx files found: ", meta_data.length), /* @__PURE__ */ React.createElement("p", null, "Number of faulty zip files: ", countErrors.length), () => {
            if (countErrors.length > 0) {
              return countErrors.forEach((regNumb) => {
                () => {
                  return /* @__PURE__ */ React.createElement("p", null, "Uploaded faulty file: ", regNumb);
                };
              });
            }
          }, /* @__PURE__ */ React.createElement("a", {
            href: objectUrl,
            target: "_blank",
            rel: "noopener noreferrer",
            download: `xlsx_meta_${date_output}.csv`
          }, /* @__PURE__ */ React.createElement("button", null, "Download data")), /* @__PURE__ */ React.createElement(DataTable, {
            data: meta_data
          }));
        }
      }
      return null;
    };
    if (files2) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "App"
      }, /* @__PURE__ */ React.createElement("p", null, "File Name: ", files2[0].name), /* @__PURE__ */ React.createElement("button", {
        onClick: onFileUpload
      }, "Upload files"), /* @__PURE__ */ React.createElement(ZippedData, null));
    } else {
      return null;
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "App-header"
  }, /* @__PURE__ */ React.createElement("h1", null, "BFTBG"), /* @__PURE__ */ React.createElement("p", null, "This page extracts meta data from uploaded xlsx files."), /* @__PURE__ */ React.createElement("p", null, "Results are compiled, presented and available for download."), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    onChange: (e) => updateFile(e.target.files)
  }), /* @__PURE__ */ React.createElement(FileData, {
    files
  })));
}
export default App;
