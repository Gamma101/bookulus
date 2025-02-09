import { getLocalStorage, setLocalStorage } from "./storage"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const deleteBook = async (bookId) => {
    const booksJson = await AsyncStorage.getItem("books");
    let books = [];

    if (booksJson) {
        books = JSON.parse(booksJson)
    }

    const updatedBooks = books.filter((book) => book._id !== bookId);

    await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));

    console.log(`Book with ID ${bookId} deleted successfully.`);

}