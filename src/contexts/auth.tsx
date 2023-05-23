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

  async function signUp({ name, email, password }: any) {
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
    }
  }

  return (
    // transformando o user em boolean (!!user)
    <AuthContext.Provider value={{ signed: !!user, loading, user, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
