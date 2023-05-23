import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/auth";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes/index";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar barStyle="light-content" backgroundColor="#131313" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
