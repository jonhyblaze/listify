import Button from "./UI/Button";

const Login = () => {
  return (
    <main>
      <section>
        <h1>Wellcome to Listify</h1>
      </section>
      <section>
        <p>Made for big tits</p>
        <p>Made for big ass bitches</p>
      </section>
      <section className="mx-12 my-24 flex flex-col">
        <Button className="bg-white">
          Continue with <strong>Google</strong>
        </Button>
        <Button className="bg-zinc-500 text-white">
          Continue with <strong>e-mail</strong>
        </Button>
      </section>
    </main>
  );
};

export default Login;
