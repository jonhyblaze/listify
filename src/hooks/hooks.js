import { useEffect, useState } from "react";

// Custom hook for list stats
const useListStats = (list) => {
  const [listStats, setListStats] = useState({
    checkedNum: null,
    listLength: null,
    progress: null,
  });

  useEffect(() => {
    if (list?.items) {
      const listLength = Number(list.items.length);
      const checkedNum = Number(
        list.items.filter((item) => item.checked).length,
      );
      const progress =
        list.items.length === 0 ? 0 : Number((checkedNum / listLength) * 100);

      setListStats({ checkedNum, listLength, progress });
    }
  }, [list]);

  return listStats;
};

export { useListStats };
