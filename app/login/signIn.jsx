import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { doSignIn } from '../../service/authService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';

const signIn = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const router = useRouter();

  const onSignIn = () => {
    doSignIn(email, password, router);
  };

  return (
    <View className="bg-background h-full items-center">
      <View className="absolute left-5 top-5">
        <TouchableOpacity onPress={() => {router.back()}}>
        <AntDesign name="arrowleft" size={30} color="#CDC3A3" />
        </TouchableOpacity>
      </View>
      <Image source={require("../../assets/images/mylogo.png")} resizeMode='contain' className="w-[40%] mt-14 h-[200px]" />
      <Text className="text-secondary font-manrope-semibold text-5xl mb-10">Bookulus</Text>
      <View className="w-full items-center">
        <Text className="pl-5 text-left text-secondary text-xl font-manrope-semibold">Email</Text>
        <TextInput onChangeText={(value) => {setEmail(value)}} placeholder='Enter Email' className="font-manrope bg-secondary w-[75%] rounded-full text-lg pl-5 py-4 color-background" />
        <Text className="pl-5 text-left text-secondary text-xl font-manrope-semibold mt-4">Password</Text>

        <TextInput secureTextEntry onChangeText={(value) => {setPassword(value)}} className="font-manrope bg-secondary w-[75%] rounded-full text-lg pl-5 py-4 color-background" placeholder='Enter Password' />
        <TouchableOpacity onPress={onSignIn} className=" bg-primary mt-7 w-[75%] rounded-full text-lg py-4">
          <Text className="text-center text-xl font-manrope-semibold text-secondary">Login</Text>
        </TouchableOpacity>
        <View className="flex-row items-center mt-4">
          <Text className="text-lg text-secondary">Don't have an account? </Text>
          <Link href="/login/signUp">
            <Text className="text-lg font-manrope-semibold text-primary">Sign Up</Text>
          </Link>
        </View>
      </View>

    </View>
  )
}

export default signIn