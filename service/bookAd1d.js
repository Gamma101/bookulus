import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Epub from 'epubjs';

export const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/epub+zip",
      copyToCacheDirectory: true,
    });

    if (result.canceled === false) {
      const file = result.assets[0];
    //   console.log('Selected File:', file);

      const response = await fetch(file.uri);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);

      reader.onloadend = async () => {
        try {
          const arrayBuffer = reader.result;

          // Load the book from the ArrayBuffer
          let book = Epub(arrayBuffer);
          await book.ready;

          const metadata = await book.loaded.metadata;
        //   console.log('Metadata:', metadata);

          const { title, creator, description, identifier, pubdate, publisher } = metadata;
        //   console.log(metadata)
          const bookData = {
            _id: Date.now().toString(),
            filePath: file.uri,
            title,
            creator,
            description,
            pubdate,
            publisher,
            progress: null,
          };

          // Retrieve existing books from AsyncStorage
          let books = await AsyncStorage.getItem("books");
          books = books ? JSON.parse(books) : []; // Initialize as an empty array if null

          // Add the new book to the list
          books.push(bookData);


          // Save the updated list back to AsyncStorage
          await AsyncStorage.setItem('books', JSON.stringify(books));

          return true


          // console.log('Book saved successfully:', bookData);
        } catch (error) {
          console.error('Error processing book:', error);
        }
      };

      reader.onerror = (error) => {
        console.error('FileReader error:', error);
      };
    } else {
      console.log('Document picking cancelled');
    }
  } catch (err) {
    console.error('Error picking document:', err);
  }
};