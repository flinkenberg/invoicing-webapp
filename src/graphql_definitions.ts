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
  name: Scalars['String'],
};

export type Invoice = {
   __typename?: 'Invoice',
  id: Scalars['ID'],
  customer: CustomerMin,
  total: Scalars['Int'],
  createdAt: Scalars['String'],
  status: InvoiceStatus,
};

export enum InvoiceDbKey {
  Id = 'id',
  Customer = 'customer',
  Total = 'total',
  CreatedAt = 'createdAt',
  Status = 'status'
}

export type InvoicesPaginated = {
   __typename?: 'InvoicesPaginated',
  total: Scalars['Int'],
  items: Array<Maybe<Invoice>>,
};

export enum InvoiceStatus {
  Due = 'DUE',
  PastDue = 'PAST_DUE',
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type Query = {
   __typename?: 'Query',
  getInvoices: InvoicesPaginated,
  _?: Maybe<Scalars['Boolean']>,
};


export type QueryGetInvoicesArgs = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  search?: Maybe<Scalars['String']>,
  searchKey?: Maybe<InvoiceDbKey>,
  sortKey?: Maybe<InvoiceDbKey>,
  isDesc?: Maybe<Scalars['Boolean']>
};
