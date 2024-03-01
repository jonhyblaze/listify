import Button from "./UI/Button";
import Sidebar from "./Sidebar";
import useDatabase from "../hooks/useDatabase";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";

const ListView = ({ isSidebarOn, toggleSidebar }) => {
  const { database, createNewList } = useDatabase();
  const [createModeOn, setCreateModeOn] = useState(false);
  const [newListName, setNewListName] = useState("");

  const toggleCreateMode = () => {
    setCreateModeOn((prev) => !prev);
  };

  const handleCreateNewList = async () => {
    try {
      if (newListName) {
        await createNewList(newListName);
        setCreateModeOn(false);

        setTimeout(() => {
          setNewListName("");
        }, [400]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isSidebarOn && (
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOn={isSidebarOn} />
      )}
      <section className="bold relative grid h-full grid-rows-[20%,65%,15%] overflow-hidden px-5 text-white">
        <div className="mt-6 flex items-center gap-4 place-self-start">
          <aside className="cursor-pointer" onClick={toggleSidebar}>
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
        <div className="grid gap-2 self-start ">
          {database?.lists?.map((list, index) => {
            let items = list.items.length;
            let checkedItems = list.items.filter((item) => item.checked).length;
            let uncheckedItems = items - checkedItems;

            return (
              <Fragment key={index}>
                <ListItem
                  name={list.name}
                  activeNum={uncheckedItems}
                  resolvedNum={items}
                />
              </Fragment>
            );
          })}
        </div>
        <Button
          onClick={toggleCreateMode}
          className="black mb-4  place-self-end rounded-md border-2 px-4 py-0.5 uppercase"
        >
          <div className="flex items-center gap-2">
            <span className="text-4xl">+</span>
            <span className="pt-[4px]">Add New List</span>
          </div>
        </Button>
        <CreateMode
          newListName={newListName}
          setNewListName={setNewListName}
          toggleCreateMode={toggleCreateMode}
          handleCreateNewList={handleCreateNewList}
          className={createModeOn ? " translate-y-0" : " translate-y-[100%]"}
        />
      </section>
    </>
  );
};

const CreateMode = ({
  newListName,
  setNewListName,
  className,
  toggleCreateMode,
  handleCreateNewList,
}) => {
  return (
    <div
      className={`absolute bottom-0 flex w-full max-w-screen-sm translate-y-0 flex-col rounded-md border-2 bg-zinc-700 transition duration-300 ease-in-out ${className}`}
    >
      <div className="mx-8 my-2 grid gap-4 ">
        <h3 className="bold mt-2 inline-flex justify-between self-start text-2xl text-white">
          Create new list
          <span className="text-2xl" onClick={toggleCreateMode}>
            X
          </span>
        </h3>

        <div className="grid">
          <input
            className="mb-2 rounded border px-3 py-2  text-black"
            type="text"
            placeholder="New list"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button
            onClick={handleCreateNewList}
            className="bold mb-2 rounded border px-4 py-2 text-white"
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
};

const ListItem = ({ name, activeNum, resolvedNum }) => {
  const statusBar = Math.round((activeNum / resolvedNum) * 100);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TooltipMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="grid w-full cursor-pointer gap-2 rounded-lg border-2 p-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl">{name}</h3>
          <aside onClick={() => setIsOpen(!isOpen)}>
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
              className={`mx-1 my-1 h-[12px]  bg-teal-300 `}
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
    </>
  );
};

function TooltipMenu({ isOpen, setIsOpen }) {
  return (
    <div className="relative inline-block  text-left">
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              className="flex w-full items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Manage list
              <span className="text-xl" onClick={() => setIsOpen(false)}>
                X
              </span>
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Rename
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Share
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Copy
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  activeNum: PropTypes.number.isRequired,
  resolvedNum: PropTypes.number.isRequired,
};
ListView.propTypes = {
  isSidebarOn: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
CreateMode.propTypes = {
  newListName: PropTypes.string.isRequired,
  setNewListName: PropTypes.func.isRequired,
  className: PropTypes.string,
  toggleCreateMode: PropTypes.func.isRequired,
  handleCreateNewList: PropTypes.func.isRequired,
};
TooltipMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ListView;
