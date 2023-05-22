import { useState } from "react";
import { Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
} from "./styles";

export function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<any>();

  function handleSignIn() {}

  function handleRoute() {
    navigation.navigate("SignUp");
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === "ios" ? "pading" : undefined}
        enabled
      >
        <Logo source={require("../../assets/logo.png")} />

        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Password"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignIn}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={handleRoute}>
          <LinkText>Criar uma conta</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
