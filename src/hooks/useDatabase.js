import {
  collection,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  query,
  where,
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
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            //console.log(`${doc.id} => ${doc.data()}`);
            if (auth && auth.uid && doc.data().uid === auth.uid) {
              setDatabase(doc.data());
            }
          });
        } catch (error) {
          console.error(
            "Error during data fetch!\n",
            `Erorr code: ${error.code}\n`,
            `Error message: ${error.message}\n`,
          );
        }
      };
      fetchDatabase();
    }
  }, [auth]);

  useEffect(() => {
    if (auth && auth.uid) {
      const usersRef = collection(db, "users");
      // Define an async function inside the useEffect hook
      const fetchUserDoc = async () => {
        const querySnapshot = await getDocs(
          query(usersRef, where("uid", "==", auth.uid)),
        );

        querySnapshot.forEach((docSnapshot) => {
          if (docSnapshot.exists()) {
            // Get the document ID
            const docId = docSnapshot.id;

            // Set up the onSnapshot listener with the document ID
            const userDoc = doc(usersRef, docId);
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
        });
      };

      // Call the async function
      fetchUserDoc();
    }
  }, [auth, db]);

  const createNewList = async (newListName) => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("uid", "==", auth.uid)),
      );

      if (querySnapshot.empty) {
        console.log("No matching documents");
        return;
      }

      console.log("NEW_LIST------name", newListName);
      console.log("NEW_LIST------UID", auth.uid);

      querySnapshot.forEach(async (docSnapshot) => {
        const userDoc = doc(usersRef, docSnapshot.id);

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
      });
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
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("uid", "==", auth.uid)),
      );

      if (querySnapshot.empty) {
        console.log("No matching documents");
        return;
      }

      querySnapshot.forEach(async (docSnapshot) => {
        const userDoc = doc(usersRef, docSnapshot.id);

        // Get the current user's data
        const userData = docSnapshot.data();
        console.log("MAYBE IS NEW:", userData, "IIIIII", index);

        // If the list at the given index exists, rename it
        if (userData.lists[index]) {
          userData.lists[index].name = newListName;

          // Update the user document
          await updateDoc(userDoc, userData);
          console.log("<<<<<<<<<<UPDATE SUCCESFULL>>>>>>>>>>>");
        }
      });
    } catch (e) {
      console.error(
        "Error during database update!\n",
        `Error code: ${e.code}\n`,
        `Error message: ${e.message}\n`,
      );
    }
  };

  return { database, createNewList, renameList };
}

export default useDatabase;
