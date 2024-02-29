import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import firebaseApp from "../firebase/firebase";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/firestore";

function useAuth() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const authInstance = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setAuth(user);
      } else {
        setAuth(null);
      }
    });

    return unsubscribe;
  }, [authInstance]);

  const signUp = async (email, password, userName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password,
      );

      const user = userCredential.user;
      console.log("Signup Succesfull", user);

      const docRef = await addDoc(collection(db, "users"), {
        displayName: userName,
        email,
        uid: user.uid || null,
        lists: [
          {
            name: "Bakery",
            items: [
              {
                name: "baguette",
                checked: true,
                quantity: [2, "items"],
              },
              {
                name: "bread",
                checked: false,
                quantity: [1, "items"],
              },
            ],
          },
          {
            name: "Alcohol",
            items: [
              {
                name: "beer",
                checked: false,
                quantity: [4, "items"],
              },
              {
                name: "wine",
                checked: false,
                quantity: [1, "items"],
              },
              {
                name: "vodka",
                checked: true,
                quantity: [0.5, "items"],
              },
            ],
          },
        ],
      });

      console.log("Document written with ID: ", docRef.id);

      setAuth(user);

      // Update display name immediately after successful registration
      await updateProfile(user, { displayName: userName });
      console.log("User display name updated successfully!");
    } catch (error) {
      console.error(
        "Sign up went wrong!\n",
        `Erorr code: ${error.code}\n`,
        `Error message: ${error.message}\n`,
      );

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
      console.log("Sign in Succesfull");

      return "Sign in Succesfull";
    } catch (error) {
      setError(error.message);
      console.error(
        "Sign in went wrong!\n",
        `Erorr code: ${error.code}\n`,
        `Error message: ${error.message}\n`,
      );
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

  const googleProvider = new GoogleAuthProvider();

  const googleSignIn = async () => {
    try {
      // Initiate redirect using signInWithRedirect
      const result = await signInWithRedirect(authInstance, googleProvider);

      // Handle callback automatically by listening to auth state changes
      onAuthStateChanged(authInstance, (user) => {
        if (user) {
          // User successfully signed in
          setAuth(user);
          // Perform additional actions (e.g., update UI, store user data)
          console.log("Google sign in succesfull");
        }
      });
    } catch (error) {
      console.error(
        "Sign up with google went wrong!\n",
        `Erorr code: ${error.code}\n`,
        `Error message: ${error.message}\n`,
      );
      // Handle errors appropriately (e.g., display error message)
      setError(error.message);
    }
  };

  const updateDisplayName = async (newDisplayName) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
      });
      console.log("Display name updated successfully!");
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  return {
    auth,
    signOut: signOutUser,
    signIn,
    signUp,
    googleSignIn,
    loading,
    success,
    error,
    updateDisplayName,
  };
}

export default useAuth;
