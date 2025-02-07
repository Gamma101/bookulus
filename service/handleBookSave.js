
const book = null;

const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (result.canceled === false) {
      const fileName = result.assets[0].name
      const fileMime = fileName.slice(fileName.lastIndexOf(".")).toLocaleLowerCase()
      console.log(fileMime)
      if (fileMime == '.fb2' || fileMime == ".epub") {
        book = result.assets[0];
      } else {
        console.log("Wrong format")
      }
      
    } else {
      console.log('Document picking cancelled');
    }
  } catch (err) {
    console.error('Error picking document:', err);
  }
};