import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const EmptyState = ({openModal}) => {

  return (
    <View className="h-full bg-dark pt-20 items-center">
    <View className="items-center bg-secondary rounded-3xl w-[90%]">
        <Image source={require("../assets/images/empty-books.png")} style={{ width: 200, height: 200 }} />
        <Text className="font-manrope-medium mb-3 text-primary text-2xl">Quite Empty here...</Text>
        </View> 
        <View className="justify-center items-center mt-7 w-full">
            <TouchableOpacity onPress={openModal} className="bg-primary rounded-3xl p-2 w-[80%]">
            <Text className="text-center text-secondary text-xl p-3">+ Add a New Book</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default EmptyState