import { useRouter } from "expo-router";
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Welcome() {

  const router = useRouter();

  return (
<ImageBackground
  source={require('../../assets/images/greet-image.png')}
  className="flex-1" // Растягиваем ImageBackground на весь экран
  resizeMode="cover"
>
  <StatusBar barStyle="light-content" backgroundColor="#034548" animated={true} />


  <View className="flex-1 justify-end items-center">
    <View className="p-4 w-[100%] py-10 bg-black/50 rounded-lg items-center">
      <Text className="text-3xl font-manrope-semibold text-center text-white">Welcome to Bookulus</Text>
      <Text className="font-manrope text-white">Open, Read, Close, Repeat</Text>
      <TouchableOpacity onPress={() => {router.push("/login/signIn")}} className="mt-10 bg-primary rounded-full w-[80%]">
        <Text className="p-4 text-xl text-center font-manrope-semibold text-white">Let's start!</Text>
      </TouchableOpacity>
    </View>
  </View>
</ImageBackground>
  );
}


{/* <Text>Welcome to Bookulus.</Text>
<View className="gap-10">
  <Link className="color-white p-3 bg-primary" href="/login/signUp">Go to signUp</Link>
  <Link className="bg-secondary color-white p-3" href="/login/signIn">Go to signIn</Link>
  <Link className="bg-accent color-white p-3" href="/(tabs)/Books">Go to BOOKS</Link>
  <TouchableOpacity className="bg-background color-white p-3" onPress={async () => {console.log(await getLocalStorage("userDetail"))}}><Text>Show current user</Text></TouchableOpacity>
</View> */}
