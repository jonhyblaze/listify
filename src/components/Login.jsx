import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleEmailAuth = () => {
    navigate("/login/email-auth");
  };

  const handleGoogleAuth = async () => {
    try {
      const googleAuth = googleSignIn();

      if (googleAuth === true) {
        console.log("Signed in with google succesfull");
        navigate("/listview");
      }
    } catch (e) {
      console.error("Google signing in went wrong!", e.status, e.code);
    }
  };

  return (
    <main className="m-auto flex flex-col gap-2 px-5 text-white">
      <section className="place-self-center">
        <h1 className="black place-self-center pb-2 text-3xl">
          Wellcome to Listify
        </h1>
      </section>
      <img src="/images/crypto.png" width={100} className="place-self-center" />
      <section>
        <div>
          <p className="text-center text-lg">
            Designed for diverse teams, with love and passion in Kabul,
            Afganistan.
          </p>
        </div>
      </section>
      <section className="my-6 flex flex-col gap-1 text-[18px]">
        <button
          type="button"
          onClick={handleGoogleAuth}
          className="flex items-center justify-center rounded-md bg-[#4285F4] px-5 py-2 text-center text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50 dark:focus:ring-[#4285F4]/55"
        >
          <svg
            className="me-2 h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          Continue with Google
        </button>
        <Button
          onClick={handleEmailAuth}
          className="flex justify-center bg-zinc-500 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="inline-flex h-6 w-6"
          >
            <path
              d="M4 20C3.45 20 2.979 19.804 2.587 19.412C2.195 19.02 1.99934 18.5493 2 18V6C2 5.45 2.196 4.979 2.588 4.587C2.98 4.195 3.45067 3.99934 4 4H20C20.55 4 21.021 4.196 21.413 4.588C21.805 4.98 22.0007 5.45067 22 6V18C22 18.55 21.804 19.021 21.412 19.413C21.02 19.805 20.5493 20.0007 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.354 12.7627 12.262 12.788C12.17 12.8133 12.0827 12.8257 12 12.825C11.9167 12.825 11.829 12.8127 11.737 12.788C11.645 12.7633 11.5577 12.7257 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.788V8.25Z"
              fill="#fff"
            />
          </svg>
          <span>Continue with E-mail</span>
        </Button>
      </section>
    </main>
  );
};

export default Login;
