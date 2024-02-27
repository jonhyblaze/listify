import { useState, useEffect } from "react";
import List from "./components/List";
import ListView from "./components/ListView";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import UserContext from "./context/UserContext";
import firebaseApp from "./firebase/firebase";
import EmailAuth from "./components/Login/EmailAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      <Router>
        <main className="mx-auto flex h-screen max-w-screen-sm flex-col bg-zinc-700">
          <Routes>
            <Route
              path="/"
              element={isFirstTimeUser === true ? <Onboarding /> : <Login />}
            />
            <Route path="/login/email-auth" element={<EmailAuth />} />
            <Route path="/list" element={<List />} />
            <Route path="/listview" element={<ListView />} />
          </Routes>
        </main>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
