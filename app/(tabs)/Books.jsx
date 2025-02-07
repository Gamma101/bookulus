import { useEffect, useState } from 'react'
import { View, Text, StatusBar, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native'
import { getLocalStorage } from '../../service/storage';
import EmptyState from '../../components/EmptyState';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as DocumentPicker from 'expo-document-picker'


const Books = () => {

  const router = useRouter();


  const [currentUser, setCurrentUser] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const getCurrentUser = async () => {
    const user = await getLocalStorage("userDetail")
    setCurrentUser(user.displayName)
  }

  useEffect(() => {
    getCurrentUser();
  }, [])
  

  return (
        <View>
          <StatusBar barStyle="light-content" backgroundColor="#034548" animated={true} />
        <View className="border-b-2 px-[25px] border-b-primary bg-background flex flex-row items-center justify-between">

          <Text className=" pb-[10px] mt-4 font-manrope-semibold text-secondary text-[25px]">Hello, {currentUser}!</Text>
          <TouchableOpacity onPress={() => router.push("/book-management/AddBook")}>
            <MaterialCommunityIcons name="book-plus" size={27} color="#cdc3a3" />
          </TouchableOpacity>
        </View>
        <ScrollView className="p-[25px] bg-dark h-full">
          <EmptyState openModal={() => {setModalVisible(true)}} />
        </ScrollView>


        <Modal animationType='fade' visible={modalVisible} transparent={true}>
          <View className="h-full text-center items-center justify-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className="items-center justify-center bg-dark rounded-xl p-6">
                <Pressable onPress={() => setModalVisible(false)} className="ml-auto mb-2">
                <MaterialIcons name="close" size={30} color="#9d3e3e" />
                </Pressable>
              <Text className="text-3xl font-manrope-medium text-secondary">Add a New Book</Text>
              <Text className="text-sm font-manrope text-secondary">Supports only EPUB or FB2 fromats</Text>
              <TouchableOpacity onPress={() => {router.push("book-management/AddBook"); setModalVisible(false)}} className="bg-primary flex-row justify-center items-center px-4 py-2 mt-4 rounded-xl">
                <MaterialIcons name="drive-folder-upload" size={24} color="black" />
                <Text className="text-2xl">Pick a File</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        </View>

  )
}

export default Books