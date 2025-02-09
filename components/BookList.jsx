import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import EmptyState from './EmptyState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { deleteBook } from '../service/bookDelete';

const BookList = ({ book,setLoading }) => {

  const router = useRouter()

  const shortenTitle = (title) => {
    if (title.length > 35) {
      title = title.slice(0, 35) + "..."
    }
    return title
  }


  return (
    <View className="gap-5 p-[20px]">
        <TouchableOpacity onPress={() => {router.push("/book-management/ReadBook")}} activeOpacity={1} key={book._id} className="p-5 bg-primary rounded-2xl flex-row items-center gap-4" >
          <FontAwesome6 name="book" size={40} color="#007e7e" className="bg-secondary p-3 rounded-xl" />
          <View className="w-[60%]">
            <Text className="text-xl text-secondary">{shortenTitle(book.title)}</Text>
            <Text className="text-secondary">{book.creator}</Text>
          </View>
          <View className="gap-2 justify-center items-center">
          <TouchableOpacity onPress={() => router.push({pathname: "/book-management/BookInfo", params: {...book}})} >
          <Entypo name="dots-three-horizontal" size={27} color="#cdc3a3" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {deleteBook(book._id)} }>
            <Ionicons name="trash" size={30} color="#9d3e3e" />
          </TouchableOpacity>

          </View>
        </TouchableOpacity>
    </View>
  );
};



export default BookList;