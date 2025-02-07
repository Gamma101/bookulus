import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../config/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setLocalStorage } from '../../service/storage';
import { doSignUp } from '../../service/authService';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';

const signUp = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  const [fullName, setFullName] = useState()
  const router = useRouter();


  const onSignUp = () => {
    doSignUp(email, password, fullName, router);

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
      <Text className="pl-5 text-left text-secondary text-xl font-manrope-semibold">Full Name</Text>
      <TextInput onChangeText={(value) => {setFullName(value)}} placeholder='Enter Full Name' className="font-manrope bg-secondary w-[75%] rounded-full text-lg pl-5 py-4 color-background" />
        <Text className="pl-5 text-left mt-4 text-secondary text-xl font-manrope-semibold">Email</Text>
        <TextInput onChangeText={(value) => {setEmail(value)}} placeholder='Enter Email' className="font-manrope bg-secondary w-[75%] rounded-full text-lg pl-5 py-4 color-background" />
        <Text className="pl-5 text-left text-secondary text-xl font-manrope-semibold mt-4">Password</Text>

        <TextInput secureTextEntry onChangeText={(value) => {setPassword(value)}} className="font-manrope bg-secondary w-[75%] rounded-full text-lg pl-5 py-4 color-background" placeholder='Enter Password' />
        <TouchableOpacity onPress={onSignUp} className=" bg-primary mt-7 w-[75%] rounded-full text-lg py-4">
          <Text className="text-center text-xl font-manrope-semibold text-secondary">Sign Up</Text>
        </TouchableOpacity>
        <View className="flex-row items-center mt-4">
          <Text className="text-lg text-secondary">Already have an account? </Text>
          <Link href="/login/signIn">
            <Text className="text-lg font-manrope-semibold text-primary">Sign In</Text>
          </Link>
        </View>
      </View>

    </View>
  )
}

export default signUp