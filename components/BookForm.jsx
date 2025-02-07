import { View, Text, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const BookForm = () => {

    const router = useRouter();

  return (
    <View className="bg-background h-full items-center">
      <View className="absolute left-5 top-5">
        <TouchableOpacity onPress={() => {router.back()}}>
        <AntDesign name="arrowleft" size={30} color="#CDC3A3" />
        </TouchableOpacity>
      </View>
      </View>
  )
}

export default BookForm