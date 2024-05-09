import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#3f51b5",
          },
          headerTitle: "",
          statusBarHidden: true,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="note-form" />
      </Stack>
    </Provider>
  );
}
