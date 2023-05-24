import { useContext, useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  firebase_db,
  orderBy,
  query,
} from "../../services/firebaseConfig";
import { AuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";
import { HistoricList } from "../../components/Historic-List";
import { Background, Container, Name, Saldo, Title, List } from "./styles";

export interface Historic {
  id: string;
  type: string;
  value: number;
}
export function Home() {
  const { user, saldoUser } = useContext<any>(AuthContext);
  const [historic, setHistoric] = useState<Historic[]>([]);
  console.log("logouuu", saldoUser)

  useEffect(() => {
    async function loadHistoric() {
      const historicRef = query(collection(firebase_db, "historic"), orderBy("date"))

      const unsubscribe = onSnapshot(historicRef, (snapshot) => {
        const historicData = snapshot.docs.map((doc) => ({
          id: doc.id,
          type: doc.data().type,
          value: doc.data().value,
          userId: doc.data().userId,
          date: doc.data().date.date,
        }));  // .reverse() mostrar o ultimo criado no topo
        
        const userHistoric = historicData.filter((h) => h.userId == user.uid);
        console.log("Hist", userHistoric)
        setHistoric(userHistoric);
      });
      
      return () => unsubscribe();
    }
  
    loadHistoric();
  }, []);

  return (
    <Background>
      <Header />
      <Container>
        <Name>{(user && user.name.name) || user.name}</Name>
        <Saldo>R$ {saldoUser ? saldoUser.toFixed(2) : 0}</Saldo>
      </Container>

      <Title>Ultimas movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historic}
        keyExtractor={(item: Historic) => item.id}
        renderItem={({ item }: any) => <HistoricList data={item} />}
      />
    </Background>
  );
}
