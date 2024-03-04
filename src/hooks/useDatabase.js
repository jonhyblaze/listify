import {
  onSnapshot,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import db from "../firebase/firestore";
import { generateUID } from "../functions/utils";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";

function useDatabase() {
  const [database, setDatabase] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    if (auth && auth.uid) {
      const fetchDatabase = async () => {
        try {
          // Get a reference to the user document
          const userDoc = doc(db, "users", auth.uid);

          // Fetch the user document
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            // If the user document exists, set the database state
            setDatabase(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error(
            "Error during data fetch!\n",
            `Error code: ${error.code}\n`,
            `Error message: ${error.message}\n`,
          );
        }
      };
      fetchDatabase();
    }
  }, [auth]);

  useEffect(() => {
    if (auth && auth.uid) {
      const userDoc = doc(db, "users", auth.uid);
      // Define an async function inside the useEffect hook
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setDatabase({ ...userData });
        } else {
          console.log("No such document!");
        }
      });

      // Cleanup function to be called when the component unmounts
      return () => unsubscribe();
    } else {
      console.log("No such document!");
    }
  }, [auth, db]);

  const createNewList = async (newListName) => {
    try {
      // Get a reference to the user document
      const userDoc = doc(db, "users", auth.uid);

      const newList = {
        name: newListName,
        items: [],
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
        list_uid: generateUID(),
      };

      await updateDoc(userDoc, {
        lists: arrayUnion(newList),
      });

      console.log(
        `New list succesfully created \n`,
        `List name >>> ${newListName}\n`,
        `List UID >>> ${newList.list_uid}`,
      );
    } catch (e) {
      console.e(
        "Error during database update!\n",
        `Erorr code: ${e.code}\n`,
        `Error message: ${e.message}\n`,
      );
    }
  };

  const renameList = async (index, newListName) => {
    try {
      // Get a reference to the user document
      const userDoc = doc(db, "users", auth.uid);

      // Get the current user's data
      const docSnap = await getDoc(userDoc);
      const userData = docSnap.data();

      if (userData.empty) {
        console.log("No matching documents");
        return;
      }

      if (userData.lists[index]) {
        userData.lists[index].name = newListName;

        // Update the user document
        await updateDoc(userDoc, userData);
        console.log(`Document update succesfull\n`, userData);
      }
    } catch (e) {
      console.error(
        "Error during database update!\n",
        `Error code: ${e.code}\n`,
        `Error message: ${e.message}\n`,
      );
    }
  };

  const deleteList = async (index) => {
    try {
      // Get a reference to the user document
      const userDoc = doc(db, "users", auth.uid);

      // Get the current user's data
      const docSnap = await getDoc(userDoc);
      const userData = docSnap.data();

      // If the list at the given index exists, delete it
      if (userData.lists[index]) {
        // Remove the list from the lists array
        userData.lists.splice(index, 1);

        // Update the user document
        await updateDoc(userDoc, userData);
        console.log("List deleted successfully");
      }
    } catch (e) {
      console.error(
        "Error during database update!\n",
        `Error code: ${e.code}\n`,
        `Error message: ${e.message}\n`,
      );
    }
  };

  return { database, createNewList, renameList, deleteList };
}

export default useDatabase;
