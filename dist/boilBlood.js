import JSZip from "../web_modules/jszip.js";
export default async function boilBlood(file, data) {
  function renameFile(originalFile, newEnding, newType = originalFile.type) {
    const newName = originalFile.name.split(".")[0] + "." + newEnding;
    return new File([originalFile], newName, {
      type: newType,
      lastModified: originalFile.lastModified
    });
  }
  if (file) {
    const reg_numb = file.name.substring(0, 5);
    if (file.name.split(".")[1] == "xlsx") {
      file = renameFile(file, "zip");
    }
    if (file.name.split(".")[1] == "zip") {
      const new_zip = new JSZip();
      const zip = await new_zip.loadAsync(file);
      const zip_arr = [];
      zip.forEach((relativePath, zipEntry) => {
        zip_arr.push(zipEntry);
      });
      for (let index = 0; index < zip_arr.length; index++) {
        const zipEntry = zip_arr[index];
        const fileType = zipEntry.name.split(".")[1];
        if (zipEntry.name == "docProps/core.xml") {
          const core = await zipEntry.async("string");
          data.push({
            reg_numb,
            core
          });
          return data;
        } else if (fileType === "xlsx") {
          const fileName = zipEntry.name.split("/")[zipEntry.name.split("/").length - 1];
          const newBlob = await zipEntry.async("blob");
          const newFile = new File([newBlob], fileName);
          data = await boilBlood(newFile, data);
        }
      }
    }
  }
  return data;
}
