import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system'; // for Expo project
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../service/storage';

export default function ReadBook() {
  const book = useLocalSearchParams();
  const { getCurrentLocation, goToLocation } = useReader();
  const [loc, setLoc] = useState(null);
  const [customTheme, setCustomTheme] = useState({
    body: {
      background: '#034548', // Light gray background
      color: '#CDC3A3 ', // Black text
    },
    '::selection': {
      background: '#007e7e', // Black selection background
      color: '#02373a', // White selection text
    },
  });

  const saveCurrentLocation = async () => {
    try {
      const booksInfo = await getLocalStorage("books");
      const bookIndex = booksInfo.findIndex((bookInf) => bookInf._id === book._id);
      if (bookIndex !== -1) {
        const updatedBook = { ...booksInfo[bookIndex], progress: getCurrentLocation().start.cfi };
        const updatedBooksInfo = [...booksInfo];
        updatedBooksInfo[bookIndex] = updatedBook;
        await removeLocalStorage("books");
        await setLocalStorage("books", updatedBooksInfo);
        // console.log("Progress saved");
      }
    } catch (error) {
      console.log("Error saving progress:", error);
    }
  };

  useEffect(() => {
    const fetchLastReadLocation = async () => {
      try {
        const booksInfo = await getLocalStorage("books");
        const bookInfo = booksInfo.find((bookInf) => bookInf._id === book._id);
        if (bookInfo && bookInfo.progress) {
          setLoc(bookInfo.progress);
        }
      } catch (error) {
        console.log("Error fetching last read location:", error);
      }
    };

    fetchLastReadLocation();
  }, [book._id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Reader
        defaultTheme={customTheme} // Set the custom theme
        onReady={() => {
          if (loc) {
            goToLocation(loc);
          }
        }}
        // enableSelection={true}
        onLocationChange={saveCurrentLocation}
        src={book.filePath}
        fileSystem={useFileSystem}
      />
    </SafeAreaView>
  );
}