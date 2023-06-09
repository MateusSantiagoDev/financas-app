import { useState, useContext } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { AuthContext } from "../../contexts/auth";
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from "../SignIn/styles";

export function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signUp, loadingAuth } = useContext<any>(AuthContext);

  function handleSignUp() {
    signUp(name, email, password);
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === "ios" ? "pading" : undefined}
        enabled
      >
        <AreaInput>
          <Input
            placeholder="Name"
            autoCorrect={false}
            autoCapitalize="none"
            value={name}
            onChangeText={(text: string) => setName(text)}
          />
        </AreaInput>

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

        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
