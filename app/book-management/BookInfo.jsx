import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import {useLocalSearchParams, useRouter} from "expo-router"
import { AntDesign } from '@expo/vector-icons';

const BookInfo = () => {
    const router = useRouter();
    const bookParams = useLocalSearchParams();
    useEffect(()=>{
      console.log(bookParams)
    },[])
  return (
        <View className="bg-background h-full items-center">
          <View className="p-4 mr-auto border-b-2 w-full border-b-primary">
            <TouchableOpacity onPress={() => {router.back()}}>
            <AntDesign name="arrowleft" size={30} color="#CDC3A3" />
            </TouchableOpacity>
          </View>
          <ScrollView className="bg-dark w-full p-[25px]">
            <View className="items-center my-5">
              <Text className="text-[40px] font-manrope-semibold text-center text-secondary">{bookParams.title}</Text>
              <Text className="text-secondary font-manrope mb-5">By: {bookParams.creator}</Text>
              <Text className="text-xl text-center font-manrope-medium text-secondary">{bookParams.description}</Text>
            </View>
          </ScrollView>
    </View>

  )
}

export default BookInfo