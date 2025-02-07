import { SplashScreen, Stack, useRouter } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font"
import { useEffect } from "react";
import { ReaderProvider } from '@epubjs-react-native/core';
export default function RootLayout() {

  const [loaded, error] = useFonts({
    'Lora-Bold': require('../assets/fonts/Lora-Bold.ttf'),
    'Lora-Medium': require('../assets/fonts/Lora-Medium.ttf'),
    'Lora-Regular': require('../assets/fonts/Lora-Regular.ttf'),
    'Lora-SemiBold': require('../assets/fonts/Lora-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf')
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    
  },[])

  if (!loaded && !error) {
    return null;
  }

  return <ReaderProvider>
    <Stack   screenOptions={{headerShown: false, animation:"fade"}} />;
    </ReaderProvider>
}
