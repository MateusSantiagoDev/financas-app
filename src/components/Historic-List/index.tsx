import { AntDesign } from "@expo/vector-icons";
import { Container, Type, IconView, TypeText, ValorText } from "./styles";
/* import { Historic } from "../../pages/Home";  */

export function HistoricList({ data }: any) {
  return (
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
      <ValorText>RS {data.value}</ValorText>
    </Container>
  );
}
