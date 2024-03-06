import { useEffect, useState, useRef } from "react";
import BackButton from "./UI/BackButton";
import useDatabase from "../hooks/useDatabase";
import OptionsButton from "./UI/OptionsButton";
import PropTypes from "prop-types";
import {
  capitalize,
  generateUID,
  getEmoji,
  debounce,
} from "../functions/utils";
import Button from "./UI/Button";

const List = ({
  list,
  listIndex,
  className,
  toggleIsListOpen,
  isListOpened,
}) => {
  console.log("Current list index >>>>>>>", listIndex, list);
  const [loading, setLoading] = useState(true);
  const { createListItem, toggleCheckItem, renameListItem, deleteListItem } =
    useDatabase();

  useEffect(() => {
    if (list) {
      setLoading(false);
    }
  }, [list]);

  let listItems = list?.items || [
    { name: "Item 01" },
    { name: "Item 02" },
    { name: "Item 03" },
  ];
  let listName = list?.name || "Unnamed List";

  //console.log(list);
  const handleCreateItem = async () => {
    await createListItem("", list?.list_uid);
  };

  const handleToggleCheckItem = async (e) => {
    await toggleCheckItem(e.currentTarget.id, list?.list_uid);
  };

  if (loading === false)
    return (
      <div
        className={`absolute z-50 grid h-full w-full bg-zinc-700 p-4 text-white transition duration-300 ease-in-out ${className}`}
      >
        <header className="w-full self-start">
          <nav className="inline-flex h-12 w-full items-center justify-between">
            <div className="inline-flex items-center">
              <BackButton toggler={toggleIsListOpen} className="!px-0" />
              <h5 className="text-xl">{listName}</h5>
            </div>
            <OptionsButton
              toggle={() => console.log("Toggle manage list")}
              className=""
            />
          </nav>

          <div className="mt-2 flex items-end gap-4">
            <div className="w-full rounded border">
              <div
                className={`mx-1 my-1 h-[10px]  bg-teal-300 `}
                style={{ width: `50%` }}
              ></div>
            </div>
          </div>
        </header>

        <ul className="flex flex-col gap-3">
          {listItems &&
            listItems
              ?.sort(
                (el1, el2) => (el1.checked ? 1 : -1) - (el2.checked ? 1 : -1),
              )
              ?.map((el) => (
                <ListElement
                  name={el.name}
                  checked={el.checked}
                  id={el.item_uid}
                  toggleCheck={handleToggleCheckItem}
                  renameListItem={renameListItem}
                  deleteListItem={deleteListItem}
                  isListOpened={isListOpened}
                  listId={list?.list_uid}
                  listIndex={listIndex}
                  key={el.item_uid}
                />
              ))}
        </ul>
        <Button
          onClick={handleCreateItem}
          className="black mb-4 place-self-end rounded-md border-2 px-4 py-0.5 uppercase"
        >
          <div className="flex items-center gap-2">
            <span className="text-4xl">+</span>
            <span className="pt-[4px]">Add</span>
          </div>
        </Button>
      </div>
    );
};

export default List;

const ListElement = ({
  name,
  checked,
  toggleCheck,
  id,
  renameListItem,
  deleteListItem,
  listId,
  listIndex,
  isListOpened,
}) => {
  const [itemName, setItemName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [sideMenuOn, setSideMenuOn] = useState(false);

  const handleRenameItem = (e) => {
    const newName = e.target.value;
    setItemName(newName);
  };

  const handleBlur = (e) => {
    const itemId = e.target.id;

    setIsEditing(false);
    renameListItem(itemName, itemId, listId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault;
      handleBlur(e);
    }
  };

  const toggleSideMenu = () => {
    setSideMenuOn((prev) => !prev);
  };

  const handleDeleteItem = () => {
    deleteListItem(id, listId);
  };

  return (
    <li
      className={`flex h-fit w-full items-center justify-between ${checked ? "opacity-40" : "opacity-100"}`}
    >
      <aside
        className={`absolute right-0 inline-flex bg-zinc-200 text-[18px] text-black duration-300 ease-in-out ${sideMenuOn ? "translate-x-[0%]" : "translate-x-[600%]"}`}
      >
        <span
          onClick={() => {
            toggleSideMenu();
            setIsEditing(true);
          }}
          className="bg-teal-500 p-2"
        >
          RENAME
        </span>
        <span
          onClick={handleDeleteItem}
          className="bg-orange-600 p-2 text-white"
        >
          DELETE
        </span>
      </aside>
      <div className="inline-flex items-center">
        <div
          onClick={toggleCheck}
          id={id}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white"
        >
          <div
            className={checked ? "h-4 w-4 rounded-full bg-zinc-700" : ""}
          ></div>
        </div>
        {isEditing ? (
          <input
            type="text"
            disabled={checked && true}
            className="bg-transparent pl-2 text-xl outline-none "
            value={itemName}
            onChange={handleRenameItem}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            id={id}
            autoFocus
            autoComplete="off"
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            className=" h-7 w-24 pl-2 text-xl"
          >
            {capitalize(name)}
          </div>
        )}
      </div>
      <div onClick={toggleSideMenu} className={`text-4xl`}>
        {getEmoji(name)}
      </div>
    </li>
  );
};

List.propTypes = {
  list: PropTypes.object,
  listIndex: PropTypes.number,
  toggleIsListOpen: PropTypes.func,
  className: PropTypes.string,
};
ListElement.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  emoji: PropTypes.string,
};
