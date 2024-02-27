import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseApp from "../firebase/firebase";
import { useState, useEffect } from "react";

function useAuth() {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState(null);
  const authInstance = getAuth(firebaseApp);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setAuth(user);
        console.log("THIS IS IT", authInstance.user);
      } else {
        setAuth(null);
      }
    });

    return unsubscribe;
  }, [authInstance]);

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password,
      );
      setAuth(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password,
      );
      setAuth(userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(authInstance);
      setAuth(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    auth,
    signOut: signOutUser,
    signIn,
    signUp,
  };
}

export default useAuth;
