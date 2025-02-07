import * as React from 'react';

import { SafeAreaView, Text } from 'react-native';
import { Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system'; // for Expo project
import { useState } from 'react';
import { getLocalStorage } from '../../service/storage';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ReadBook() {
    const [bookUri, setBookUri] = useState();
    const [loading, setLoading] = useState();

    const getUri = async () => {
        setLoading(true)
        try {
            const book = await AsyncStorage.getItem("selectedBookUri");
            setBookUri(book)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(()=>{
        getUri();
    },[])

    if(loading) {
        return <Text>Loading...</Text>
    }

  const { goToLocation } = useReader();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Reader
        src={bookUri}
        fileSystem={useFileSystem}
      />
    </SafeAreaView>
  );
}