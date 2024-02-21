import List from "./components/List";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";

function App() {
  return (
    <main className="grid min-h-screen">
      <Onboarding>
        <Login />
      </Onboarding>
    </main>
  );
}

export default App;
