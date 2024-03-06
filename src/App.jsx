import { useState } from "react";
import List from "./components/List";
import ListView from "./components/ListView";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import UserContext from "./context/UserContext";
import EmailAuth from "./components/Login/EmailAuth";
import Sidebar from "./components/Sidebar";
import StartUpHandler from "./components/StartUpHandler";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Loading from "./components/UI/Loading";

function App() {
  const [isSidebarOn, setIsSidebarOn] = useState(false);
  const { loading } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOn((prev) => !prev);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ theme: "dark" }}>
      <Router>
        <main className="mx-auto flex h-screen max-w-screen-sm flex-col overflow-y-hidden bg-zinc-700">
          {isSidebarOn ? (
            <Sidebar toggleSidebar={toggleSidebar} isSidebarOn />
          ) : (
            ""
          )}
          <StartUpHandler />
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/email-auth" element={<EmailAuth />} />
            <Route
              path="/list"
              element={
                <List toogleSidebar={toggleSidebar} isSidebarOn={isSidebarOn} />
              }
            />
            <Route
              path="/listview"
              element={
                <ListView
                  toggleSidebar={toggleSidebar}
                  isSidebarOn={isSidebarOn}
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
