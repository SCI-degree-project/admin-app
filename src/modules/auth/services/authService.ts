import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Usuario autenticado:", user);
    return user;
  } catch (error) {
    console.error("Error al autenticar con Google:", error);
    throw error;
  }
};


import { signOut } from "firebase/auth";

export const logout = async () => {
  await signOut(auth);
};

import { onAuthStateChanged } from "firebase/auth";

export const onUserStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
