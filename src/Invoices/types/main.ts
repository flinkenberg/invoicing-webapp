import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";

export enum InvoiceStatus {
  DUE = "DUE",
  PAST_DUE = "PAST DUE",
  PAID = "PAID",
  UNPAID = "UNPAID"
}

export interface Customer {
  name: string;
}

export interface Tag {
  id: string;
  name: string;
  colour: SemanticCOLORS;
}

export interface Invoice {
  id: string;
  customer: Customer;
  total: number;
  tags: Tag[];
  createdAt: number;
  status: InvoiceStatus;
}