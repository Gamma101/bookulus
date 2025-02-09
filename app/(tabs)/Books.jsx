import { useEffect, useState, useRef } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native';
import { getLocalStorage, removeLocalStorage } from '../../service/storage';
import EmptyState from '../../components/EmptyState';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Epub from 'epubjs';
import BookList from '../../components/BookList';
import { Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons';

const Books = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [books, setBooks] = useState([]);

  // Use a ref to track if the component is mounted
  const isMounted = useRef(true);

  useEffect(() => {
    // Set the mounted flag to true when the component mounts
    isMounted.current = true;

    // Fetch data when the component mounts
    getCurrentUser();
    getBooks();

    // Cleanup function to set the mounted flag to false when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, []);

  const deleteBook = async (bookId) => {
    setLoading(true);
    try {
      const booksJson = await AsyncStorage.getItem("books");
      let books = [];
  
      if (booksJson) {
        books = JSON.parse(booksJson);
      }
  
      const updatedBooks = books.filter((book) => book._id !== bookId);
  
      await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
  
      // console.log(`Book with ID ${bookId} deleted successfully.`);
  
      // Update the state with the new list of books
      if (isMounted.current) {
        setBooks(updatedBooks);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const pickDocument = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/epub+zip',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const file = result.assets[0];
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.readAsArrayBuffer(blob);
        reader.onloadend = async () => {
          try {
            const arrayBuffer = reader.result;
            let book = Epub(arrayBuffer);
            await book.ready;

            const metadata = await book.loaded.metadata;
            const { title, creator, description } = metadata;

            const bookData = {
              _id: Date.now().toString(),
              filePath: file.uri,
              title,
              creator,
              description,
              progress: null
            };

            let books = await AsyncStorage.getItem('books');
            books = books ? JSON.parse(books) : [];
            books.push(bookData);

            await AsyncStorage.setItem('books', JSON.stringify(books));

            // Only update state if the component is still mounted
            if (isMounted.current) {
              await getBooks();
            }
          } catch (error) {
            console.error('Error processing book:', error);
          } finally {
            if (isMounted.current) {
              setLoading(false);
            }
          }
        };

        reader.onerror = (error) => {
          console.error('FileReader error:', error);
          if (isMounted.current) {
            setLoading(false);
          }
        };
      } else {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    } catch (err) {
      console.error('Error picking document:', err);
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = await getLocalStorage('userDetail');
      if (isMounted.current) {
        setCurrentUser(user?.displayName || '');
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const getBooks = async () => {
    try {
      const books = await getLocalStorage('books');
      if (isMounted.current) {
        setBooks(books || []);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async () => {
    await pickDocument();
  };

  const shortenTitle = (title) => {
    if (title.length > 35) {
      title = title.slice(0, 35) + "..."
    }
    return title
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#034548" animated={true} />
      <View className="border-b-2 px-[25px] border-b-primary bg-background flex flex-row items-center justify-between">
        <Text className="pb-[10px] mt-4 font-manrope-semibold text-secondary text-[25px]">Hello, {currentUser}!</Text>
        {/* <TouchableOpacity onPress={async () => { await removeLocalStorage('books'); getBooks(); }}>
          <Text>REMOVE BOOKS</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="book-plus" size={27} color="#cdc3a3" />
        </TouchableOpacity>
      </View>

      {books.length > 0 ? (
        <FlatList
          className="h-full bg-dark pt-5"
          data={books}
          keyExtractor={(item) => item._id}
          onRefresh={getBooks}
          refreshing={loading}
          renderItem={({ item }) => (
            <View className="px-[20px] pb-5">
            <TouchableOpacity onPress={() => {  router.push({pathname: "/book-management/ReadBook", params: item})}} activeOpacity={1} key={item._id} className="p-5 bg-primary rounded-2xl flex-row items-center gap-4" >
              <FontAwesome6 name="book" size={40} color="#007e7e" className="bg-secondary p-3 rounded-xl" />
              <View className="w-[60%]">
                <Text className="text-xl text-secondary">{shortenTitle(item.title)}</Text>
                <Text className="text-secondary">{item.creator}</Text>
              </View>
              <View className="gap-4 justify-center items-center">
              <TouchableOpacity onPress={() => router.push({pathname: "/book-management/BookInfo", params: {...item}})} >
              <Entypo name="dots-three-horizontal" size={27} color="#cdc3a3" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {deleteBook(item._id)} }>
                <Ionicons name="trash" size={30} color="#9d3e3e" />
              </TouchableOpacity>
    
              </View>
            </TouchableOpacity>
        </View>
          )}
        />
      ) : (
        <EmptyState openModal={() => setModalVisible(true)} />
      )}

      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <View className="h-full text-center items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className="items-center justify-center bg-dark rounded-xl p-6">
            <Pressable onPress={() => setModalVisible(false)} className="ml-auto mb-2">
              <MaterialIcons name="close" size={30} color="#9d3e3e" />
            </Pressable>
            <Text className="text-3xl font-manrope-medium text-secondary">Add a New Book</Text>
            <Text className="text-sm font-manrope text-secondary">Supports only .EPUB format</Text>
            <TouchableOpacity onPress={() => {handleAddBook(); setModalVisible(false)}} className="bg-primary flex-row justify-center items-center px-4 py-2 mt-4 rounded-xl">
              <MaterialIcons className="mr-3" name="drive-folder-upload" size={28} color="#CDC3A3" />
              <Text className="text-2xl text-secondary">Pick a File</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Books;