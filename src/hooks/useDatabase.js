import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/firestore";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";

function useDatabase() {
  const [database, setDatabase] = useState({});
  const { auth } = useAuth();

  useEffect(() => {
    const fetchDatabase = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id} => ${doc.data()}`);
          if (auth && doc.data().uid === auth.uid) {
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
  }, [auth]);

  return { database };
}

export default useDatabase;
