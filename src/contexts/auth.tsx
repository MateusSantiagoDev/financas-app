import { useState, useEffect, createContext } from "react";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  firebase_auth,
  firebase_db,
  setDoc,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  collection,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../services/firebaseConfig";

export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>("");
  const [saldoUser, setSaldoUser] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const navigation = useNavigation<any>();

  async function loadStorage() {
    const storageUser = await AsyncStorage.getItem("Auth_user");
    if (storageUser) {
      // transformo novamente em json
      setUser(JSON.parse(storageUser));
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    // toda vez q renderizar busco o usuário logado no asyncStorage
    loadStorage();
  }, []);

  async function signUp(name: any, email: any, password: any) {
    try {
      setLoadingAuth(true);
      // cria um usuário
      const newUser = await createUserWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
      if (newUser) {
        // cria uma collection com o id personalizado
        await setDoc(doc(firebase_db, "users", newUser.user.uid), {
          saldo: 0,
          name: name,
        });

        const data: any = {
          uid: newUser.user.uid,
          name: name,
          saldo: 0,
          email: newUser.user.email,
        };
        setSaldoUser(0);
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      }
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        alert("email invalido");
      }
      if (err.code === "auth/missing-password") {
        alert("senha invalida");
      }
      if (err.code === "auth/weak-password") {
        alert("A senha deve ter pelo menos 6 caracteres");
      }
      if (err.code === "auth/email-already-in-use") {
        alert("email já esta em uso");
      }
      setLoadingAuth(false);
    }
  }

  async function signIn(email: any, password: any) {
    try {
      setLoadingAuth(true);
      const user = await signInWithEmailAndPassword(
        firebase_auth,
        email,
        password
      );
      const userName = await getDoc(doc(firebase_db, `users/${user.user.uid}`));

      const data: any = {
        uid: user.user.uid,
        name: userName.data(),
      };

      setUser(data);
      setSaldoUser(data.name.saldo);
      storageUser(data);
      setLoadingAuth(false);
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        alert("Email invalido!");
      }
      if (err.code === "auth/missing-password") {
        alert("Informe a senha!");
      }
      if (err.code === "auth/wrong-password") {
        alert("Senha invalida!");
      }
      setLoadingAuth(false);
    }
  }

  async function storageUser(data: any) {
    // transformo em string
    await AsyncStorage.setItem("Auth_user", JSON.stringify(data));
  }

  async function signOut() {
    await firebase_auth.signOut();
    await AsyncStorage.clear();
    setUser("");
  }

  async function historic(
    user: any,
    type: any,
    value: any,
    date: any,
    setValue: any
  ) {
    await addDoc(collection(firebase_db, "historic"), {
      type: type,
      value: value,
      date: date,
      userId: user,
    });
    const isUser = await getDoc(doc(firebase_db, `users/${user}`));
    const userData: any = {
      saldo: isUser.data(),
    };

    let saldo = userData.saldo.saldo;

    type === "despesa"
      ? (saldo -= parseFloat(value))
      : (saldo += parseFloat(value));

    await updateDoc(doc(firebase_db, "users", user), {
      saldo,
    });
    setValue("");
    Keyboard.dismiss();
    navigation.navigate("Home");
    setSaldoUser(saldo);
  }

  return (
    // transformando o user em boolean (!!user)
    <AuthContext.Provider
      value={{
        signed: !!user,
        loading,
        user,
        signUp,
        signIn,
        signOut,
        historic,
        saldoUser,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
