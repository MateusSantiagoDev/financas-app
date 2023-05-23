import { useState } from 'react'
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Header } from "../../components/Header";
import {Background, Input, SubmitButton, SubmitText} from './styles';

// SafeAreaView: para garantir que ele vai ocupar o espaço
// da tela independente do celular

// TouchableWithoutFeedback: button nativo sem efeito visual
// TouchableWithoutFeedback onPress={() => Keyboard.dismiss(): 
// se qualquer area fora do componente for tocada ele fecha o teclado
export function New() {

  const [value, setValue] = useState<any>('')
  const [type, setType] = useState<any>(null)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <Background>
      <Header />
      <SafeAreaView style={{ alignItems: "center" }}>
        <Input
        placeholder="Valor desejado"
        keyboardType="numeric" // tipo numérico
        returnKeyType="next" 
        onSubmitEditing={() => Keyboard.dismiss()}// quando ele clicar na setinha de enviar do teclado só vai fechar o teclado  
        value={value}
        onChangeText={(text: any) => setValue(text)}      
        />

        <SubmitButton>
          <SubmitText>Registrar</SubmitText>
        </SubmitButton>
      </SafeAreaView>
    </Background>
    </TouchableWithoutFeedback>
  );
}
