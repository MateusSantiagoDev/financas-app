import { useState } from "react";
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Header } from "../../components/Header";
import { Pickers } from "../../components/Picker/index.android";
import { Background, Input, SubmitButton, SubmitText } from "./styles";

// SafeAreaView: para garantir que ele vai ocupar o espaço
// da tela independente do celular

// TouchableWithoutFeedback: button nativo sem efeito visual
// TouchableWithoutFeedback onPress={() => Keyboard.dismiss():
// se qualquer area fora do componente for tocada ele fecha o teclado
export function New() {
  const [value, setValue] = useState<any>("");
  const [type, setType] = useState<any>("receita");

  function handleSubmit() {
    console.log(value, type);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />
        <SafeAreaView style={{ alignItems: "center" }}>
          <Input
            placeholder=" Valor desejado"
            keyboardType="numeric" // tipo numérico
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()} // quando ele clicar na setinha de enviar do teclado só vai fechar o teclado
            value={value}
            onChangeText={(text: any) => setValue(text)}
          />

          <Pickers onChange={setType} type={type} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
