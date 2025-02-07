import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="signIn" options={{ title: "Sign In" }} />
      <Stack.Screen name="signUp" options={{ title: "Sign Up" }} />
    </Stack>
  );
}