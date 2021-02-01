import parser from "../web_modules/fast-xml-parser.js";
export default function haruspicy(data) {
  const output = [];
  data.forEach((element) => {
    const field = parser.parse(element.core);
    if (field) {
      const sub_field = field["cp:coreProperties"];
      output.push({
        reg_numb: element.reg_numb,
        creator: sub_field["dc:creator"],
        lastModifiedBy: sub_field["cp:lastModifiedBy"],
        created: sub_field["dcterms:created"],
        modified: sub_field["dcterms:modified"]
      });
    }
  });
  return output;
}
