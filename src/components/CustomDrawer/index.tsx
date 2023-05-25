import {useContext} from "react";
import { View, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from '../../contexts/auth';

// DrawerContentScrollView = scroll personalizado dentro do drawer
export function CustomDrawer(props: any) {
  const { user, signOut } = useContext<any>(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="contain" // redimensionar a imagem para a medida a cima
        />
        <Text style={{ color: "#fff", fontSize: 18, marginTop: 5 }}>
          Bem vindo(a)!
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontWeight: "bold",
            paddingBottom: 25,
          }}
        >
          {user && user.name.name || user.name}
        </Text>
      </View>

      <DrawerItemList {...props}/>

      <DrawerItem {...props}
      label="Sair do app"
      inactiveTintColor="#fff"
      inactiveBackgroundColor="#c62c36"
      onPress={() => signOut()}
      />

    </DrawerContentScrollView>
  );
}
