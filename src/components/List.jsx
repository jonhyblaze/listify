import { useState, useEffect } from "react";

const List = () => {
  const [list, setList] = useState([]);
  const listData = ["oranges", "meat", "wine", "beer", "bread", "pasta"];

  useEffect(() => {
    setList(listData);
  }, []);

  return (
    <div className="p-4 text-white">
      <ul>
        {list.map((e, i) => (
          <li key={i}>
            <p>{e}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
