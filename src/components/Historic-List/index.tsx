import { TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Container, Type, IconView, TypeText, ValorText, ValueArea, DateText } from "./styles";
/* import { Historic } from "../../pages/Home";  */

// TouchableWithoutFeedback: pega o evento quando clicar e segurar
export function HistoricList({ data, deleteItem }: any) {

  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
    <Container>
      <Type>
        <IconView typeProps={data.type}>
          <AntDesign
            name={data.type === "receita" ? "arrowup" : "arrowdown"}
            size={20}
            color="#fff"
          />
          <TypeText>{data.type}</TypeText>
        </IconView>
      </Type>
      <ValueArea>
      <ValorText>RS {data.value}</ValorText>
      <DateText>{data.date}</DateText>
      </ValueArea>
    </Container>
    </TouchableWithoutFeedback>
  );
}
