import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  firebase_auth,
  firebase_db,
  setDoc,
  doc,
  getDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../services/firebaseConfig";

export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);

  async function signUp(name: any, email: any, password: any) {
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
        email: newUser.user.email,
      };
      setUser(data);
      storageUser(data);
    }
  }

  async function signIn(email: any, password: any) {
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
    storageUser(data);
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

  return (
    // transformando o user em boolean (!!user)
    <AuthContext.Provider
      value={{ signed: !!user, loading, user, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
