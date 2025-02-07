import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { Alert } from "react-native";
import { setLocalStorage } from "./storage";

export const doSignUp = (email, password, fullName, router) => {
    if (!email || !password || !fullName) {
        Alert.alert("Please, fill in all the fields");
        return false;
      }
        createUserWithEmailAndPassword(auth, email, password, fullName)
      .then(async (userCredential) => {
        // Signed up 
        const user = userCredential.user;
        await updateProfile(user, {"displayName": fullName})
        // ...
        await setLocalStorage("userDetail", user);
        router.replace("/(tabs)/Books");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorCode, errorMessage)
      });
}


export const doSignIn = (email, password, router) => {
    if (!email || !password) {
        Alert.alert("Please, fill in all the fields");
        return false;
      }
  
      signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
    console.log("hi")

      const user = userCredential.user;
      
      await setLocalStorage("userDetail", user)
      router.replace("/(tabs)/Books");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Alert.alert("Login Failed", errorMessage);
    });
}