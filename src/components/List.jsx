//import { useEffect } from "react";
import BackButton from "./UI/BackButton";
//import useDatabase from "../hooks/useDatabase";
import OptionsButton from "./UI/OptionsButton";
import PropTypes from "prop-types";
import { capitalize, getEmoji } from "../functions/utils";

const List = ({ list, listIndex, className, toggleIsListOpen }) => {
  console.log("Current list index >>>>>>>", listIndex, list);
  //const { database } = useDatabase();

  let listItems = list?.items || [
    { name: "Item 01" },
    { name: "Item 02" },
    { name: "Item 03" },
  ];
  let listName = list?.name || "Unnamed List";

  //console.log(list);
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
            ?.map((el, i) => (
              <>
                <li
                  key={i}
                  className={`flex h-fit w-full items-center justify-between ${el.checked ? "opacity-40" : "opacity-100"}`}
                >
                  <ListElement name={el.name} checked={el.checked} emoji="🥑" />
                </li>
                <div className="h-[1px] w-full bg-zinc-500"></div>
              </>
            ))}
      </ul>
    </div>
  );
};

export default List;

const ListElement = ({ name, checked }) => {
  return (
    <>
      <div className="inline-flex items-center">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <div
            className={checked ? "h-4 w-4 rounded-full bg-zinc-700" : ""}
          ></div>
        </div>
        <input
          type="text"
          className="bg-transparent pl-2 text-xl outline-none "
          value={capitalize(name)}
        />
      </div>

      <div className={`text-4xl`}>{getEmoji(name)}</div>
    </>
  );
};

List.propTypes = {
  list: PropTypes.array,
  listIndex: PropTypes.number,
  toggleIsListOpen: PropTypes.func,
  className: PropTypes.string,
};
ListElement.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  emoji: PropTypes.string,
};
