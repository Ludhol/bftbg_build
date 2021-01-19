import {Table} from "../web_modules/react-bootstrap.js";
import React from "../web_modules/react.js";
export default function DataTable(props) {
  const data = props.data;
  return /* @__PURE__ */ React.createElement(Table, {
    striped: true,
    bordered: true,
    hover: true,
    variant: "dark"
  }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "#"), Object.keys(data[0]).map((key) => {
    return /* @__PURE__ */ React.createElement("th", null, key);
  }))), /* @__PURE__ */ React.createElement("tbody", null, data.map((element, index) => {
    return /* @__PURE__ */ React.createElement("tr", {
      key: index
    }, /* @__PURE__ */ React.createElement("th", null, index + 1), Object.values(element).map((val) => {
      if (typeof val === "string")
        return /* @__PURE__ */ React.createElement("th", null, val);
    }));
  })));
}
