import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import {
  Container,
  Name,
  NewLink,
  NewText,
  Logout,
  LogoutText,
} from "./styles";

export function Profile() {
  const { user, signOut } = useContext<any>(AuthContext);
  const navigation = useNavigation<any>();
  console.log("valores", user)

  return (
    <Container>
      <Name>{user && user.name.name}</Name>

      <NewLink onPress={() => navigation.navigate("Register")}>
        <NewText>Registar gastos</NewText>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}
