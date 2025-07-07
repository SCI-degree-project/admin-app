import {
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../../../config/firebase';

export async function loginWithEmail(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();

  const res = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  return { user: data.user, token: idToken };
}

export const logout = async () => {
  await signOut(auth);
};

import { onAuthStateChanged } from "firebase/auth";

export const onUserStateChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};
