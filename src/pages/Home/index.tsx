import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";
import { HistoricList } from '../../components/Historic-List'
import { Background, Container, Name, Saldo, Title, List } from "./styles";

export interface Historic {
  id: string;
  type: string;
  value: number;
}
export function Home() {
  const { user } = useContext<any>(AuthContext);
  const [historic, setHistoric] = useState<Historic[]>([
    { id: "1", type: "receita", value: 1200 },
    { id: "2", type: "despesa", value: 300 },
    { id: "3", type: "receita", value: 40 },
    { id: "4", type: "despesa", value: 89.65 },
    { id: "5", type: "receita", value: 20.23 },
    { id: "6", type: "receita", value: 800.65 },
    { id: "7", type: "receita", value: 8.65 },
    { id: "8", type: "despesa", value: 47.51 },
  ]);

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.name.name}</Name>
        <Saldo>R$ {user && user.name.saldo}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historic}
        keyExtractor={(item: Historic) => item.id}
        renderItem={({ item }: any) => (<HistoricList data={item}/>)}
      />
    </Background>
  );
}
