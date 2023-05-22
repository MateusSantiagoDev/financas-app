import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes/index";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#131313" />
      <Routes />
    </NavigationContainer>
  );
}
