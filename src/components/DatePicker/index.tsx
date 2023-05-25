import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { Container, Header } from "./styles";

export function DatePicker({ date, onClose, onChange }: any) {
  const [dateNow, setDateNow] = useState<any>(new Date(date));

  return (
    <Container>
      {Platform.OS === "ios" && (
        <Header>
          <TouchableOpacity onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </Header>
      )}
      <DateTimePicker
        value={dateNow} // data atual
        mode="date"
        display="default"
        onChange={(event, date) => {
          // date = data selecionada
          const currentDate = date || dateNow;
          setDateNow(currentDate);
          onChange(currentDate);
        }}
        style={{ backgroundColor: "white" }}
      />
    </Container>
  );
}
