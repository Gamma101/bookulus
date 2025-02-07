import React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const AddBook = () => {

  const router = useRouter()

  const [selectedDocument, setSelectedDocument] = React.useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/epub+zip",
        copyToCacheDirectory: true,
      });

      if (result.canceled === false) {
        const file = result.assets[0];
        console.log('Selected File:', file);

        // Save the file URI to AsyncStorage
        await AsyncStorage.setItem('selectedBookUri', file.uri);

        setSelectedDocument(file);
      } else {
        console.log('Document picking cancelled');
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  return (
    <View>
      <Button title="Pick a Document" onPress={pickDocument} />
      {selectedDocument && (
        <View>
          <Text>Selected File: {selectedDocument.name}</Text>
          <Text>URI: {selectedDocument.uri}</Text>
          <Text>Size: {selectedDocument.size} bytes</Text>
          <Text>MIME Type: {selectedDocument.mimeType}</Text>
        </View>
      )}

      <TouchableOpacity className='p-4 bg-primary m-5' onPress={() => {router.push("/book-management/ReadBook")}}>
        <Text> READ BOOK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddBook;