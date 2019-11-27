import { InvoiceInput, InvoiceStatus, InvoiceItemInput } from "../../graphql_definitions";
import { round } from "mathjs";

export function getTaxAndTotal(subtotal: number, taxRate: number, roundDecPoints: number): [number, number] {
  const tax: any = round((subtotal / 100) * taxRate, roundDecPoints);
  const total: any = round(subtotal + tax, roundDecPoints);
  console.log(tax, total);
  return [tax, total];
}

export const invoiceCreateInitState = {
  title: "Invoice",
  invoiceNo: "",
  customerId: null,
  items: [],
  currency: "GBP",
  taxRate: 20,
  subtotal: 0,
  tax: 0,
  total: 0,
  issuedAtTimestamp: new Date().getTime().toString(),
  dueAtTimestamp: new Date(new Date().setHours(new Date().getHours() + 720)).getTime().toString(),
  status: InvoiceStatus.Draft,
  notes: "",
};

export function invoiceCreateReducer
  (
    state: InvoiceInput,
    action:
      | { field: keyof Omit<InvoiceInput, "items" | "customer" | "taxRate">; value: string | number }
      | { field: "status"; value: InvoiceStatus }
      | { field: "taxRate"; value: number; decPoints: number }
      | { field: "_decPoints"; value: number; decPoints: number }
      | { field: "items"; value: InvoiceItemInput[]; decPoints: number; },
) {
  switch (action.field) {
    case "_decPoints":
      const st = round(state.subtotal, action.value);
      return {
        ...state,
        subtotal: st,
        tax: getTaxAndTotal(state.subtotal, action.value, action.value)[0],
        total: getTaxAndTotal(state.subtotal, action.value, action.value)[1],
      };
    case "taxRate":
      return {
        ...state,
        taxRate: action.value,
        tax: getTaxAndTotal(state.subtotal, action.value, action.decPoints)[0],
        total: getTaxAndTotal(state.subtotal, action.value, action.decPoints)[1],
      };
    case "items":
      const subtotal: any = action.value.reduce(
        (acc, item) => round((acc += item.price * item.quantity), action.decPoints),
        0,
      );
      return {
        ...state,
        items: action.value,
        subtotal,
        tax: getTaxAndTotal(subtotal, state.taxRate, action.decPoints)[0],
        total: getTaxAndTotal(subtotal, state.taxRate, action.decPoints)[1],
      };
    default:
      return {
        ...state,
        [action.field]: action.value,
      };
  }
};