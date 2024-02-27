import Button from "./UI/Button";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleEmailAuth = () => {
    navigate("/login/email-auth");
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
        <Button className="bg-white text-black">
          Continue with <strong>Google</strong>
        </Button>
        <Button onClick={handleEmailAuth} className="bg-zinc-500 text-white">
          Continue with <strong>E-mail</strong>
        </Button>
      </section>
    </main>
  );
};

export default Login;
