import { useContext, useState, useEffect } from "react";
import { Alert, TouchableOpacity, Platform } from "react-native";
import { format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  onSnapshot,
  firebase_db,
  orderBy,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "../../services/firebaseConfig";
import { DatePicker } from "../../components/DatePicker";
import { AuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";
import { HistoricList } from "../../components/Historic-List";
import {
  Background,
  Container,
  Name,
  Saldo,
  Title,
  List,
  Area,
} from "./styles";

export interface Historic {
  id: string;
  type: string;
  value: number;
}
export function Home() {
  const { user, saldoUser, setSaldoUser } = useContext<any>(AuthContext);
  const [historic, setHistoric] = useState<Historic[]>([]);
  const [currentDate, setCurrentDate] = useState<any>(new Date());
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    async function loadHistoric() {
      const historicRef = query(
        collection(firebase_db, "historic"),
        orderBy("date", "desc")
      );

      const unsubscribe = onSnapshot(historicRef, (snapshot) => {
        const historicData = snapshot.docs.map((doc) => ({
          id: doc.id,
          type: doc.data().type,
          value: doc.data().value,
          userId: doc.data().userId,
          date: doc.data().date.date,
        })); // .reverse() mostrar o ultimo criado no topo

        const userHistoric = historicData.filter(
          (h) => h.userId == user.uid && h.date == format(currentDate, "dd/MM/yy")
        );
        setHistoric(userHistoric);
      });

      return () => unsubscribe();
    }

    loadHistoric();
  }, [currentDate]);

  function handleDelete(data: any) {
    if (data) {
      Alert.alert(
        "Delete",
        `Você desaje excluir ${data.type} - valor ${data.value}`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Continuar",
            onPress: () => handleDeleteSuccess(data),
          },
        ]
      );
    }
  }

  async function handleDeleteSuccess(data: any) {
    const ref = doc(firebase_db, `historic/${data.id}`);
    if (ref.id === data.id) {
      deleteDoc(ref)
        .then(async () => {
          let saldoAtual = saldoUser;

          data.type === "despesa"
            ? (saldoAtual += parseFloat(data.value))
            : (saldoAtual -= parseFloat(data.value));

          await updateDoc(doc(firebase_db, "users", user.uid), {
            saldo: saldoAtual,
          });
          setSaldoUser(saldoAtual);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }

  function handleShowPicker() {
    // abre o datePicker
    setShow(true);
  }

  function handleClose() {
    // fecha o datePicker
    setShow(false);
  }

  function onChange(date: any) { // recebo a data selecionada
    // se for igual a ios não vou fechar pois vai fechar no button
    setShow(Platform.OS === "ios");
    setCurrentDate(date);
    console.log(date);
  }

  return (
    <Background>
      <Header />
      <Container>
        <Name>{(user && user.name.name) || user.name}</Name>
        <Saldo>R$ {saldoUser ? saldoUser.toFixed(2) : 0}</Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}> 
          <MaterialIcons name="event" size={30} color="#fff" />
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>
      <List
        showsVerticalScrollIndicator={false}
        data={historic}
        keyExtractor={(item: Historic) => item.id}
        renderItem={({ item }: any) => (
          <HistoricList data={item} deleteItem={handleDelete} />
        )}
      />
      {show && (
        <DatePicker
          date={currentDate} // data atual
          onClose={handleClose}
          onChange={onChange} 
        />
      )}
    </Background>
  );
}
