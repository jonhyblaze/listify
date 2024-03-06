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
import { Timestamp, doc, getDoc } from "firebase/firestore";
import firebaseApp from "../firebase/firebase";
import { useState, useEffect } from "react";
import { setDoc } from "firebase/firestore";
import db from "../firebase/firestore";
import { generateUID } from "../functions/utils";

function useAuth() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const authInstance = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        console.log("User signed in");
        await createUserInFirestore(user);
        setAuth(user);
      } else {
        console.log("User signed out");
        setAuth(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [authInstance]);

  const createUserInFirestore = async (user, userName) => {
    // Get a reference to the user document
    const userDoc = doc(db, "users", user.uid);

    // Check if the user document already exists
    const docSnap = await getDoc(userDoc);

    // If the user document does not exist, create it
    if (!docSnap.exists()) {
      await setDoc(userDoc, {
        displayName: userName || user.displayName,
        email: user.email,
        uid: user.uid || null,
        lists: [
          {
            name: "Bakery",
            createdAt: Timestamp.now(),
            lastUpdated: Timestamp.now(),
            list_uid: generateUID("list"),
            items: [
              {
                name: "baguette",
                checked: true,
                quantity: [2, "items"],
                createdAt: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                item_uid: generateUID("item"),
              },
              {
                name: "bread",
                checked: false,
                quantity: [1, "items"],
                createdAt: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                item_uid: generateUID("item"),
              },
            ],
          },
          {
            name: "Alcohol",
            createdAt: Timestamp.now(),
            lastUpdated: Timestamp.now(),
            list_uid: generateUID("list"),
            items: [
              {
                name: "beer",
                checked: false,
                quantity: [4, "items"],
                createdAt: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                item_uid: generateUID("item"),
              },
              {
                name: "wine",
                checked: false,
                quantity: [1, "items"],
                createdAt: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                item_uid: generateUID("item"),
              },
              {
                name: "vodka",
                checked: true,
                quantity: [0.5, "items"],
                createdAt: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                item_uid: generateUID("item"),
              },
            ],
          },
        ],
      });

      console.log("Document written with ID: ", user.uid);
    } else {
      console.log("User document already exists");
    }
  };

  const signUp = async (email, password, userName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password,
      );

      const user = userCredential.user;
      console.log("Signup Succesfull", user);

      await createUserInFirestore(user, userName);

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
      await signInWithRedirect(authInstance, googleProvider);
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
