import Button from "./UI/Button";

const ListView = () => {
  return (
    <section className="bold grid h-full grid-rows-[20%,65%,15%] px-5 text-white">
      <div className="mt-6 flex items-center gap-4 place-self-start">
        <aside>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
          >
            <path fill="#FFFFFF" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </aside>
        <h1 className="text-3xl ">My lists</h1>
      </div>
      <div className="grid gap-4 self-start ">
        <ListItem name="Foods" activeNum={5} resolvedNum={8} />
        <ListItem name="Goods" activeNum={3} resolvedNum={12} />
      </div>
      <Button className="black mb-4  place-self-end rounded-md border-2 px-4 py-0.5 uppercase">
        <div className="flex items-center gap-2">
          <span className="text-4xl">+</span>
          <span className="pt-[2px]">Add New List</span>
        </div>
      </Button>
    </section>
  );
};

const ListItem = ({ name, activeNum, resolvedNum }) => {
  const statusBar = Math.round((activeNum / resolvedNum) * 100);

  return (
    <div className="grid w-full gap-2 rounded-lg border-2 p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xl">{name}</h3>
        <aside>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="6" r="2" fill="#FFFFFF" />
            <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
            <circle cx="12" cy="18" r="2" fill="#FFFFFF" />
          </svg>
        </aside>
      </div>
      <div className="mb-2 flex items-end gap-4">
        <div className="w-full rounded border">
          <div
            className={`my-1 ml-1 h-[16px]  bg-teal-300 `}
            style={{ width: `${statusBar}%` }}
          ></div>
        </div>
        <div className="regular pb-[1px] text-sm">
          <span>{activeNum}</span>
          <span>/</span>
          <span>{resolvedNum}</span>
        </div>
      </div>
    </div>
  );
};

export default ListView;
