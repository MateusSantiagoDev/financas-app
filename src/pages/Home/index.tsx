import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";
import { HistoricList } from '../../components/Historic-List'
import { Background, Container, Name, Saldo, Title, List } from "./styles";

interface Historic {
  id: string;
  type: string;
  value: number;
}
export function Home() {
  const { user } = useContext<any>(AuthContext);
  const [historic, setHistoric] = useState<Historic[]>([
    { id: "1", type: "receita", value: 1200 },
    { id: "1", type: "despesa", value: 300 },
    { id: "1", type: "receita", value: 40 },
    { id: "1", type: "receita", value: 89.65 },
  ]);

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user.name.name}</Name>
        <Saldo>R$ {user.name.saldo}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>

      <List
        showVerticalScrollIndicator={false}
        data={historic}
        keyExtractor={(item: Historic) => item.id}
        renderItem={({ item }: any) => (<HistoricList/>)}
      />
    </Background>
  );
}
