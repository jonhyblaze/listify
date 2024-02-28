import Button from "./UI/Button";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <main className="grid h-full gap-y-0 bg-zinc-700 text-white">
      <section className="flex flex-col gap-3 self-center px-10">
        <h1 className="gradient-text text-2xl font-bold">
          Wellcome to listify, we are trilled to have you onboard!
        </h1>
        <Button
          onClick={() => navigate("/login")}
          className="bg-white text-black"
        >
          Continue
        </Button>
      </section>
    </main>
  );
};

export default Onboarding;
