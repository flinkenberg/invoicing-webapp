import { useState, useEffect, useCallback } from "react";
import { Invoice } from "../types/main";

/**
 * TEMPORARY FETCH
 */

export default function useGetInvoices(pageLimit?: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(pageLimit || 25);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [total, setTotal] = useState(0);
  async function changePage(page: number) {
    const res = await fetch(`http://localhost:4000/invoices?_page=${page}&_limit=${limit}`, { method: "GET" });
    if (res.status === 200) {
      const total = res.headers.get("X-Total-Count");
      if (total) setTotal(parseInt(total));
      setInvoices(await res.json());
      setCurrentPage(page);
    }
  }
  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      changePage(currentPage - 1);
    }
  }
  function nextPage() {
    if ((currentPage + 1) * limit <= total) {
      setCurrentPage(currentPage + 1);
      changePage(currentPage + 1);
    }
  }
  const getDataCb = useCallback(changePage, []);
  useEffect(() => {
    getDataCb(1);
  }, [getDataCb])
  return {
    total,
    limit,
    invoices,
    currentPage,
    previousPage,
    nextPage,
    changePage
  }
}