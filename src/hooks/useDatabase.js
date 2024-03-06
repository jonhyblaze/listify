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
        list_uid: generateUID("list"),
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

  const createListItem = async (
    itemName,
    list_uid,
    quantity = [1, "items"],
    checked = false,
  ) => {
    try {
      const userDoc = doc(db, "users", auth.uid);
      const userSnapshot = await getDoc(userDoc);
      const userData = userSnapshot.data();
      const lists = userData.lists;
      const listIndex = lists.findIndex((list) => list.list_uid === list_uid);

      const newItem = {
        name: itemName,
        quantity: quantity,
        checked: checked,
        createdAt: Timestamp.now(),
        lastUpdated: Timestamp.now(),
        item_uid: generateUID("item"), // Add a unique identifier to each item
      };

      lists[listIndex].items.unshift(newItem);
      await updateDoc(userDoc, { lists });
      console.log(`New item successfully added to list ${list_uid}`);
    } catch (e) {
      console.error("Error during database update!", e);
    }
  };

  const toggleCheckItem = async (item_uid, list_uid) => {
    try {
      const userDoc = doc(db, "users", auth.uid);
      const userSnapshot = await getDoc(userDoc);
      const userData = userSnapshot.data();
      const lists = userData.lists;
      const listIndex = lists.findIndex((list) => list.list_uid === list_uid);
      const itemIndex = lists[listIndex].items.findIndex(
        (item) => item.item_uid === item_uid,
      );

      // Toggle the 'checked' property of the item
      lists[listIndex].items[itemIndex].checked =
        !lists[listIndex].items[itemIndex].checked;

      // Update the 'lastUpdated' property of the item and the list
      lists[listIndex].items[itemIndex].lastUpdated = Timestamp.now();
      lists[listIndex].lastUpdated = Timestamp.now();

      // If the item is unchecked, move it to the top of the list
      if (!lists[listIndex].items[itemIndex].checked) {
        const item = lists[listIndex].items.splice(itemIndex, 1)[0];
        lists[listIndex].items.unshift(item);
      }

      await updateDoc(userDoc, { lists });
      console.log(`Item check status toggled in list ${list_uid}`);
    } catch (e) {
      console.error("Error during database update!", e);
    }
  };

  const renameListItem = async (newName, item_uid, list_uid) => {
    try {
      const userDoc = doc(db, "users", auth.uid);
      const userSnapshot = await getDoc(userDoc);
      const userData = userSnapshot.data();
      const lists = userData.lists;
      const listIndex = lists.findIndex((list) => list.list_uid === list_uid);
      const itemIndex = lists[listIndex].items.findIndex(
        (item) => item.item_uid === item_uid,
      );

      // Update the 'name' property of the item
      lists[listIndex].items[itemIndex].name = newName;

      // Update the 'lastUpdated' property of the item and the list
      lists[listIndex].items[itemIndex].lastUpdated = Timestamp.now();
      lists[listIndex].lastUpdated = Timestamp.now();

      await updateDoc(userDoc, { lists });
      console.log(`Item name updated in list ${list_uid}`);
    } catch (e) {
      console.error("Error during database update!", e);
    }
  };

  const deleteListItem = async (item_uid, list_uid) => {
    try {
      const userDoc = doc(db, "users", auth.uid);
      const userSnapshot = await getDoc(userDoc);
      const userData = userSnapshot.data();
      const lists = userData.lists;
      const listIndex = lists.findIndex((list) => list.list_uid === list_uid);

      // Find the index of the item to be deleted
      const itemIndex = lists[listIndex].items.findIndex(
        (item) => item.item_uid === item_uid,
      );

      // Remove the item from the list
      lists[listIndex].items.splice(itemIndex, 1);

      // Update the 'lastUpdated' property of the list
      lists[listIndex].lastUpdated = Timestamp.now();

      await updateDoc(userDoc, { lists });
      console.log(`Item successfully deleted from list ${list_uid}`);
    } catch (e) {
      console.error("Error during database update!", e);
    }
  };

  return {
    database,
    createNewList,
    renameList,
    deleteList,
    createListItem,
    toggleCheckItem,
    renameListItem,
    deleteListItem,
  };
}

export default useDatabase;
