import { Picker } from "@react-native-picker/picker";
import { PickerView } from "./styles";

export function Pickers({ onChange, type }: any) {
  return (
    <PickerView>
      <Picker
        style={{
          width: "100%",
        }}
        selectedValue={type}
        onValueChange={(value) => onChange(value)}
      >
        <Picker.Item label="Receita" color="#222" value="receita" />
        <Picker.Item label="Despesa" color="#222" value="despesa" />
      </Picker>
    </PickerView>
  );
}
