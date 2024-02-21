import { useState, Fragment } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = {};

  return (
    <Fragment>
      <h1 className="max-w-[575px] self-center text-3xl font-bold underline">
        Hello world!
      </h1>
      <h2>The counter value is: {count}</h2>
      <button
        className="px-10 text-3xl"
        onClick={() => setCount((prev) => prev + 1)}
      >
        +
      </button>
      <button
        className="px-10 text-3xl"
        onClick={() => setCount((prev) => prev - 1)}
      >
        -
      </button>
    </Fragment>
  );
}

export default App;
