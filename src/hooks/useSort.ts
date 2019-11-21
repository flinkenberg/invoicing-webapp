import { useState } from "react";

export default function useSort<T>(cb: (col: T, desc: boolean) => void) {
  const [currentSortMethod, setCurrentSortMethod] = useState<{ column: T; isDesc: boolean }>(null);
  function sort(column: T): void {
    if (!column) {
      setCurrentSortMethod(null);
      cb(null, null);
    } else {
      let nextSortIsDesc = false;
      if (currentSortMethod && currentSortMethod.column === column) nextSortIsDesc = !currentSortMethod.isDesc;
      setCurrentSortMethod({ column, isDesc: nextSortIsDesc });
      cb(column, nextSortIsDesc);
    }
  }
  return {
    currentSortMethod,
    sort
  }
}