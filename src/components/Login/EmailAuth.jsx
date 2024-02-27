import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const EmailAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);
  const navigate = useNavigate();

  const toggleAuth = () => {
    setIsRegistered((prev) => !prev);
  };

  const handleSignIn = (e) => {
    // Handle sign-in logic here
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log("SignIn Succesfull");
        navigate("/listview");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("SignIn went wrong", errorCode, errorMessage);
      });
  };

  const handleSignUp = (e) => {
    // Handle sign-up logic here
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("SignUp Succesfull");
        // ...

        navigate("/listview");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Signup went wrong", errorCode, errorMessage);
        // ..
      });
  };

  return (
    <>
      <div onClick={() => navigate(-1)} className="p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#FFFFFF"
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
          />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
      <div className="flex h-screen flex-col items-center justify-center text-white">
        <h1 className="mb-4 text-2xl font-bold">Login to Listify</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 w-64 rounded border px-3 py-2 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-64 rounded border px-3 py-2 text-black"
        />
        {isRegistered ? (
          <>
            <Button
              onClick={handleSignIn}
              className="mb-2 w-64 rounded border px-4 py-2"
            >
              Sign In
            </Button>
            <div onClick={toggleAuth} className="text-xs">
              Don't have an account?
              <span className="text-blue-300"> Sign Up</span>
            </div>
          </>
        ) : (
          <>
            <Button
              onClick={handleSignUp}
              className="mb-2 w-64 rounded border px-4 py-2"
            >
              Sign Up
            </Button>
            <div onClick={toggleAuth} className="text-xs">
              Already have the account?
              <span className="text-blue-300"> Sign In</span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmailAuth;
