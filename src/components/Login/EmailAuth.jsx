import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const EmailAuth = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const toggleAuth = () => {
    setIsRegistered((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    // Handle sign-in logic here
    e.preventDefault();

    try {
      const login = await signIn(email, password);
      if (login) {
        navigate("/listview");
      }
    } catch (e) {
      console.error(e.message, e.code);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const userName = `${firstName} ${lastName}` || "Username";

    try {
      const registration = await signUp(email, password, userName);
      if (registration) {
        navigate("/listview");
      }
    } catch (e) {
      console.log(e.code, e.message);
    }
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
      <form
        action="submit"
        className="mx-auto flex h-screen  flex-col items-center justify-center text-white"
      >
        <h1 className="mb-4 text-2xl font-bold">{`${isRegistered ? "Login" : "Sign up"} to Listify`}</h1>
        {!isRegistered ? (
          <div className=" mx-16 inline-flex items-center gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mb-2 w-3/6 rounded border px-3 py-2 text-black"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mb-2 w-3/6  rounded border px-3 py-2 text-black"
            />
          </div>
        ) : (
          ""
        )}

        <div className="mx-16">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 w-full rounded border px-3 py-2 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded border px-3 py-2 text-black"
          />
        </div>

        {isRegistered ? (
          <>
            <Button
              onClick={handleSignIn}
              className="mb-2 w-[66%]  rounded border px-4 py-2"
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
              className="mb-2 w-[66%] rounded border px-4 py-2"
            >
              Sign Up
            </Button>
            <div onClick={toggleAuth} className="text-xs">
              Already have the account?
              <span className="text-blue-300"> Sign In</span>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default EmailAuth;
