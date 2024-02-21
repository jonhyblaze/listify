import { useState, useEffect } from "react";

const List = () => {
  const [list, setList] = useState([]);
  const listData = ["oranges", "meat", "wine", "beer", "bread", ""];

  useEffect(() => {
    setList(listData);
  }, []);

  return (
    <div>
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
