import { useState, useContext } from "react";
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { format } from "date-fns";
import { Header } from "../../components/Header";
import { Pickers } from "../../components/Picker/index.android";
import { AuthContext } from "../../contexts/auth";
import { Background, Input, SubmitButton, SubmitText } from "./styles";

// SafeAreaView: para garantir que ele vai ocupar o espaço
// da tela independente do celular

// TouchableWithoutFeedback: button nativo sem efeito visual
// TouchableWithoutFeedback onPress={() => Keyboard.dismiss():
// se qualquer area fora do componente for tocada ele fecha o teclado

interface formatDate {
  date: string;
}

const formattedDate: formatDate = {
  date: format(new Date(), "dd/MM/yy"),
};

export function New() {
  const [value, setValue] = useState<string>("");
  const [type, setType] = useState<string>("receita");
  const { user, historic } = useContext<any>(AuthContext);

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(value)) || type === null) {
      alert("Preencha todos os campos");
      return;
    }

    Alert.alert(
      "Confirmando dados",
      `Tipo ${type} - Valor: ${parseFloat(value).toFixed(2)}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleAdd(),
        },
      ]
    );
  }

  function handleAdd() {
    historic(
      user.uid,
      type,
      parseFloat(value).toFixed(2),
      formattedDate,
      setValue
    );
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
            onChangeText={(text: string) => setValue(text)}
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
