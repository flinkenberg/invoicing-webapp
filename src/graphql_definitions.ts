// THIS IS A GENERATED FILE
// `npm run generate` to refresh it
/* eslint-disable */


export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CustomerMin = {
   __typename?: 'CustomerMin',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Invoice = {
   __typename?: 'Invoice',
  id: Scalars['ID'],
  customer: CustomerMin,
  total: Scalars['Int'],
  createdAt: Scalars['Int'],
  status: InvoiceStatus,
};

export enum InvoiceStatus {
  Due = 'DUE',
  PastDue = 'PAST_DUE',
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type Query = {
   __typename?: 'Query',
  getInvoices: Array<Maybe<Invoice>>,
  _?: Maybe<Scalars['Boolean']>,
};
