import { useState } from "react";

export default function useSort<T>(initialSortMethod: T) {
  const [currentSortMethod, setCurrentSortMethod] = useState<{ column: T; isDesc: boolean }>({ column: initialSortMethod, isDesc: true });
  function sort(column: T): void {
    if (!column) {
      setCurrentSortMethod(null);
    } else {
      let nextSortIsDesc = true;
      if (currentSortMethod && currentSortMethod.column === column) nextSortIsDesc = !currentSortMethod.isDesc;
      setCurrentSortMethod({ column, isDesc: nextSortIsDesc });
    }
  }
  return {
    currentSortMethod,
    sort
  }
}