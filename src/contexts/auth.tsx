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
const [user, setUser] = useState<string>('');
const [loading, setLoading] = useState<boolean>(true);

export function AuthProvider({ children }: any) {
    return (
        // transformando o user em boolean (!!user)
        <AuthContext.Provider value={{ signed: !!user, loading, user }}>
            { children }
        </AuthContext.Provider>
    )
}
 