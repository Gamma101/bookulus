import React, { useEffect } from 'react'
import { getLocalStorage } from '../../service/storage';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Text, TouchableOpacity } from 'react-native';

export default function TabLayout() {
    const router = useRouter();

    const GetUserDetail = async () => {
      const userInfo = await getLocalStorage('userDetail');
       if (!userInfo) {
        router.replace("login/welcome")
       }
    }

    useEffect(()=>{
      GetUserDetail();
    }, [])

    return (
        <Tabs
        screenOptions={
          {headerShown: false, 
            tabBarStyle: {backgroundColor: "#034548", borderTopWidth: 2, borderTopColor: "#007e7e"}, 
            tabBarActiveTintColor: "#CDC3A3", 
            animation: "fade", 
            tabBarButton: (props) => (
              <TouchableOpacity {...props} activeOpacity={1}> {/* Установка activeOpacity=1 */}
                {props.children}
              </TouchableOpacity>
        ),}
        }>
            <Tabs.Screen name="Books" options={{
            tabBarIcon: ({color,size}) => (
              <FontAwesome6 name="book-bookmark" size={size} color={color} />
            )}} />
            <Tabs.Screen name="Profile" options={{
              tabBarIcon: ({color,size}) => (
              <FontAwesome6 name="user-large" size={size} color={color} />
            )}} />
        </Tabs>
    )
}