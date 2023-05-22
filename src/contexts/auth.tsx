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
    return (
        <AuthContext.Provider value={{ }}>
            { children }
        </AuthContext.Provider>
    )
}
 