import { useState, useEffect } from "react";
import List from "./components/List";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import UserContext from "./context/UserContext";
import firebaseApp from "./firebase/firebase";

function App() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
  console.log(firebaseApp);

  useEffect(() => {
    let storageItem = localStorage.getItem("firstTimeUser");

    setIsFirstTimeUser(JSON.parse(storageItem) === false ? false : true);
  }, []);

  return (
    <UserContext.Provider
      value={{ theme: "dark", isFirsTimeUser: isFirstTimeUser }}
    >
      <main className="mx-auto flex h-screen max-w-screen-sm flex-col bg-zinc-700">
        {isFirstTimeUser === true ? (
          <Onboarding setIsFirstTimeUser={setIsFirstTimeUser} />
        ) : (
          <Login />
        )}
        {false && <List />}
      </main>
    </UserContext.Provider>
  );
}

export default App;
