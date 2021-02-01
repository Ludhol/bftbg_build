import JSZip from "../web_modules/jszip.js";
export default async function boilBlood(file, data, countErrors, setErrors) {
  function renameFile(originalFile, newEnding, newType = originalFile.type) {
    const newName = originalFile.name.split(".")[0] + "." + newEnding;
    return new File([originalFile], newName, {
      type: newType,
      lastModified: originalFile.lastModified
    });
  }
  if (file) {
    const regNumb = file.name.substring(0, 5);
    let fileEnding = file.name.split(".")[file.name.split(".").length - 1];
    if (fileEnding == "xlsx") {
      file = renameFile(file, "zip");
      fileEnding = "zip";
    }
    if (fileEnding == "zip") {
      const new_zip = new JSZip();
      try {
        const zip = await new_zip.loadAsync(file);
        const zip_arr = [];
        zip.forEach((_, zipEntry) => {
          zip_arr.push(zipEntry);
        });
        for (let index = 0; index < zip_arr.length; index++) {
          const zipEntry = zip_arr[index];
          const fileType = zipEntry.name.split(".")[zipEntry.name.split(".").length - 1];
          if (zipEntry.name == "docProps/core.xml") {
            const core = await zipEntry.async("string");
            data.push({
              reg_numb: regNumb,
              core
            });
            return data;
          } else if (fileType === "xlsx") {
            const fileName = zipEntry.name.split("/")[zipEntry.name.split("/").length - 1];
            const newBlob = await zipEntry.async("blob");
            const newFile = new File([newBlob], fileName);
            data = await boilBlood(newFile, data, countErrors, setErrors);
          }
        }
      } catch (error) {
        console.log(error);
        setErrors(countErrors.push(regNumb));
      }
    }
  }
  return data;
}
