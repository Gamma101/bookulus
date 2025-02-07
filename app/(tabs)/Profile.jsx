import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getLocalStorage, removeLocalStorage } from '../../service/storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const Profile = () => {

  const router = useRouter();

  const [currentUser, setCurrentUser] = useState();
  const [currentEmail, setCurrentEmail] = useState();

  const getCurrentUser = async () => {
    const user = await getLocalStorage("userDetail")
    setCurrentUser(user.displayName)
    setCurrentEmail(user.email)
  }

  const logOut = async () => {
    await removeLocalStorage("userDetail")
    router.replace("login/welcome")
  }

  useEffect(() => {
    getCurrentUser();
  }, [])

  return (
    <View>
        <View className="border-b-2 px-[25px] border-b-primary bg-background flex flex-row items-center justify-between">
        <Text className="pb-[10px] mt-4 font-manrope-semibold text-secondary text-[25px]">Profile</Text>
      </View>
      <View className="h-full bg-dark items-center">
        <FontAwesome className="mt-14 mb-3" name="user-circle" size={100} color="#cdc3a3" />
        <Text className=" font-manrope-semibold text-secondary" style={{fontSize: 40}}>{currentUser}</Text>
        <Text className="font-manrope-medium text-lg text-primary">{currentEmail}</Text>
        <View className="bg-secondary w-[70%] rounded-3xl" style={{padding: 5, marginTop: 20}}>

          <TouchableOpacity onPress={logOut} className="flex flex-row items-center">
          <Ionicons className=" bg-background" name="log-out" size={35} color="#007e7e" style={{padding: 5, marginRight: 10, borderRadius: 17}} />
            <Text className="text-xl text-primary">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;