import Button from "./UI/Button";
import Sidebar from "./Sidebar";
import List from "./List";
import useDatabase from "../hooks/useDatabase";
import { useState } from "react";
import PropTypes from "prop-types";
import { useListStats } from "../hooks/hooks";

const ListView = ({ isSidebarOn, toggleSidebar }) => {
  const { database, createNewList, renameList, deleteList } = useDatabase();
  const [createModeOn, setCreateModeOn] = useState(false);

  const [currentListIndex, setCurrentListIndex] = useState(null);

  const [newListName, setNewListName] = useState("");
  const [editModeOn, setEditModeOn] = useState(false);
  const [renameModeOn, setRenameModeOn] = useState(false);
  const [isListOpened, setIsListOpened] = useState(false);
  const [openListIndex, setOpenListIndex] = useState(null);

  console.log("Edit mode is on::::::::::", editModeOn);
  console.log("Create mode is on::::::::::", createModeOn);
  console.log("Rename mode is on::::::::::", renameModeOn);
  console.log("List menu index::::::::::", currentListIndex);
  console.log("Is list opened::::::::::", isListOpened);

  const toggleCreateList = () => {
    if (editModeOn) {
      setEditModeOn(false);
    }

    setCreateModeOn((prev) => !prev);
    setTimeout(() => {
      setNewListName("");
    }, 400);
  };

  const toggleRenameList = () => {
    if (editModeOn) {
      setEditModeOn(false);
    }
    setRenameModeOn((prev) => !prev);
  };

  const toggleListMenu = (event) => {
    if (createModeOn) {
      toggleCreateList();
    }

    if (renameModeOn) {
      setRenameModeOn((prev) => !prev);
      setEditModeOn((prev) => !prev);
      return;
    }

    if (editModeOn) {
      setEditModeOn(false);
    }

    const id = event.target.id;
    if (id) {
      setCurrentListIndex(Number(event.target.id));
      setEditModeOn(true);
    } else setCurrentListIndex(null);
  };

  const handleCreateNewList = async (e) => {
    e.preventDefault();

    try {
      if (newListName) {
        await createNewList(newListName);
        setCreateModeOn(false);

        setTimeout(() => {
          setNewListName("");
        }, 400);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRenameList = async (e) => {
    e.preventDefault();

    setRenameModeOn((prev) => !prev);
    setEditModeOn(false);

    try {
      console.log("FETCHING");
      await renameList(currentListIndex, newListName);
      setCurrentListIndex(null);
    } catch (e) {
      console.error(e);
    }
    setNewListName("");
  };

  const handleDeleteList = async () => {
    await deleteList(currentListIndex);
    setEditModeOn(false);
  };

  console.log(openListIndex, "<<<<<<<<<<<<");

  const toggleIsListOpen = (e) => {
    console.log("List is opened");

    if (!isListOpened) {
      setOpenListIndex(Number(e.target.id));
      setIsListOpened(true);
    }
    if (isListOpened) {
      setOpenListIndex(null);
      setIsListOpened(false);
    }
  };

  return (
    <>
      {isSidebarOn && (
        <Sidebar toggleSidebar={toggleSidebar} isSidebarOn={isSidebarOn} />
      )}
      <List
        list={database?.lists?.[openListIndex]}
        listIndex={openListIndex}
        toggleIsListOpen={toggleIsListOpen}
        isListOpened={isListOpened}
        className={isListOpened ? "translate-x-[0%]	" : "-translate-x-[100%]	"}
      />
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
        <ul className="grid gap-2 self-start ">
          {database?.lists?.map((list, index) => (
            <ListItem
              list={list}
              index={index}
              toggleListMenu={toggleListMenu}
              toggleIsListOpen={toggleIsListOpen}
              className={currentListIndex === index ? "border-green-500" : ""}
              key={index}
            />
          ))}
        </ul>
        {!isListOpened && (
          <>
            <Button
              onClick={toggleCreateList}
              className={`black mb-6 mr-3 place-self-end rounded-md border-2 px-4 py-1 uppercase `}
            >
              <div className="flex items-center gap-2">
                <span className="text-4xl">+</span>
                <span className="pt-[4px]">Add New List</span>
              </div>
            </Button>
            <CreateList
              newListName={newListName}
              setNewListName={setNewListName}
              toggleCreateList={toggleCreateList}
              handleCreateNewList={handleCreateNewList}
              setCreateModeOn={setCreateModeOn}
              className={createModeOn ? " translate-y-0" : "translate-y-[100%]"}
            />
            <RenameList
              className={
                renameModeOn ? " translate-y-0" : " translate-y-[100%]"
              }
              toggleRenameList={toggleRenameList}
              newListName={newListName}
              setNewListName={setNewListName}
              handleRenameList={handleRenameList}
            />
            <ListMenu
              toggleListMenu={toggleListMenu}
              toggleCreateList={toggleCreateList}
              handleRenameList={handleRenameList}
              setRenameModeOn={setRenameModeOn}
              setEditModeOn={setEditModeOn}
              handleDeleteList={handleDeleteList}
              className={editModeOn ? "translate-y-0" : "translate-y-[100%]"}
            />
          </>
        )}
      </section>
    </>
  );
};

const ListItem = ({
  className,
  list,
  index,
  toggleListMenu,
  toggleIsListOpen,
}) => {
  const listStats = useListStats(list);

  return (
    <>
      <li
        className={`grid w-full cursor-pointer gap-2 rounded-lg border-2 p-2 ${className}`}
      >
        <div className="flex items-center justify-between">
          <h3 onClick={toggleIsListOpen} id={index} className="w-[80%] text-xl">
            {list?.name}
          </h3>
          <aside onClick={toggleListMenu}>
            <svg
              id={index}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="6"
                r="2"
                fill="#FFFFFF"
                pointerEvents="none"
              />
              <circle
                cx="12"
                cy="12"
                r="2"
                fill="#FFFFFF"
                pointerEvents="none"
              />
              <circle
                cx="12"
                cy="18"
                r="2"
                fill="#FFFFFF"
                pointerEvents="none"
              />
            </svg>
          </aside>
        </div>
        <div className="mb-2 flex items-end gap-4">
          <div className="w-full rounded border pr-2">
            <div
              className={`m-1 h-[12px] bg-teal-300 `}
              style={{ width: `${listStats.progress}%` }}
            ></div>
          </div>
          <div className="regular pb-[1px] text-sm">
            <span>{listStats.checkedNum}</span>
            <span>/</span>
            <span>{listStats.listLength}</span>
          </div>
        </div>
      </li>
    </>
  );
};

const RenameList = ({
  className,
  toggleRenameList,
  handleRenameList,
  newListName,
  setNewListName,
}) => {
  return (
    <div
      className={`absolute bottom-0 z-40 flex w-full max-w-screen-sm translate-y-0 flex-col rounded-md border-2 bg-zinc-700 transition duration-300 ease-in-out ${className}`}
    >
      <div className="mx-8 my-2 grid gap-4 ">
        <h3 className="bold mt-2 inline-flex justify-between self-start text-2xl text-white">
          Change list name
          <span className="text-2xl" onClick={toggleRenameList}>
            X
          </span>
        </h3>

        <form className="grid" action="/">
          <input
            className="regular mb-2 rounded border px-3 py-2 text-black"
            type="text"
            placeholder="New name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button
            onClick={handleRenameList}
            className="bold mb-2 rounded border px-4 py-2 text-center text-white"
          >
            SAVE
          </Button>
        </form>
      </div>
    </div>
  );
};

const CreateList = ({
  newListName,
  setNewListName,
  toggleCreateList,
  handleCreateNewList,
  className,
}) => {
  return (
    <div
      className={`absolute bottom-0 z-50 flex w-full max-w-screen-sm translate-y-0 flex-col rounded-md border-2 bg-zinc-700 transition duration-300 ease-in-out ${className}`}
    >
      <div className="mx-8 my-2 grid gap-4 ">
        <h3 className="bold mt-2 inline-flex justify-between self-start text-2xl text-white">
          Create new list
          <span className="text-2xl" onClick={toggleCreateList}>
            X
          </span>
        </h3>

        <form className="grid">
          <input
            className="regular mb-2 rounded border px-3 py-2 text-black"
            type="text"
            placeholder="New list"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button
            value={newListName}
            onClick={handleCreateNewList}
            className="bold mb-2 rounded border px-4 py-2 text-center text-white"
          >
            SAVE
          </Button>
        </form>
      </div>
    </div>
  );
};

const ListMenu = ({
  className,
  toggleListMenu,
  setEditModeOn,
  setRenameModeOn,
  handleDeleteList,
}) => {
  return (
    <aside
      className={`absolute bottom-0 flex w-full max-w-screen-sm flex-col rounded-md border-2 bg-zinc-100 px-6 py-4 text-black transition duration-300 ease-in-out ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-2xl">Manage List</h4>
        <div
          className="cursor-pointer rounded-full border-2 border-black"
          onClick={toggleListMenu}
        >
          <svg
            id={null}
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_16_14)" pointerEvents="none">
              <path
                d="M29.1768 10.1692C26.0338 13.3916 13.4689 26.2883 10.3259 29.5107"
                stroke="#040303"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M29.3235 29.451C26.1023 26.209 13.2174 13.2412 9.99624 9.99921"
                stroke="black"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_16_14" pointerEvents="none">
                <rect width="39.3231" height="39.5171" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <ul className="grid gap-2">
        <li
          className="inline-flex cursor-pointer gap-2"
          onClick={() => {
            setEditModeOn(false);
            setRenameModeOn(true);
          }}
        >
          <span>✏️</span>Rename
        </li>
        <li className="inline-flex cursor-pointer gap-2">
          <span>📤</span> Share
        </li>
        <li className="inline-flex cursor-pointer gap-2">
          <span>📑</span> Copy
        </li>
        <li
          className="inline-flex cursor-pointer gap-2"
          onClick={handleDeleteList}
        >
          <span>🗑️</span> Delete️
        </li>
      </ul>
    </aside>
  );
};

ListView.propTypes = {
  isSidebarOn: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
ListItem.propTypes = {
  className: PropTypes.string,
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  toggleListMenu: PropTypes.func.isRequired,
  toggleIsListOpen: PropTypes.func.isRequired,
};
ListMenu.propTypes = {
  className: PropTypes.string,
  toggleListMenu: PropTypes.func.isRequired,
  setEditModeOn: PropTypes.func.isRequired,
  setRenameModeOn: PropTypes.func.isRequired,
  handleDeleteList: PropTypes.func.isRequired,
};
CreateList.propTypes = {
  className: PropTypes.string,
  newListName: PropTypes.string.isRequired,
  setNewListName: PropTypes.func.isRequired,
  toggleCreateList: PropTypes.func.isRequired,
  handleCreateNewList: PropTypes.func.isRequired,
};

RenameList.propTypes = {
  className: PropTypes.string,
  toggleRenameList: PropTypes.func.isRequired,
  handleRenameList: PropTypes.func.isRequired,
  newListName: PropTypes.string.isRequired,
  setNewListName: PropTypes.func.isRequired,
};

export default ListView;
