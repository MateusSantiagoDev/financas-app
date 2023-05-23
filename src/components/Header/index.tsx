import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Container, ButtonMenu } from "./styles";
import { Entypo } from "@expo/vector-icons";

export function Header() {
    const navigation = useNavigation<any>();

    // toggleDrawer() vai abrir e fechar o menu de navegação
  return (
    <Container>
      <ButtonMenu onPress={() => { navigation.toggleDrawer() }}>
        <Entypo name="menu" size={30} color="#fff" />
      </ButtonMenu>
    </Container>
  );
}
