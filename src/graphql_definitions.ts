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

export type Contact = {
   __typename?: 'Contact',
  id: Scalars['ID'],
  name: Scalars['String'],
  street: Scalars['String'],
  postcode: Scalars['String'],
  county: Scalars['String'],
  country: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
};

export type ContactInput = {
  name: Scalars['String'],
  street: Scalars['String'],
  postcode: Scalars['String'],
  county: Scalars['String'],
  country: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
};

export type ContactsPaginated = {
   __typename?: 'ContactsPaginated',
  total: Scalars['Int'],
  items: Array<Maybe<Contact>>,
};

export type CustomerMin = {
   __typename?: 'CustomerMin',
  name: Scalars['String'],
  email: Scalars['String'],
  phone: Scalars['String'],
};

export type Invoice = {
   __typename?: 'Invoice',
  id: Scalars['ID'],
  invoiceNo: Scalars['String'],
  title: Scalars['String'],
  customer: CustomerMin,
  items: Array<Maybe<Item>>,
  labels?: Maybe<Array<Maybe<LabelMin>>>,
  currency: Scalars['String'],
  taxRate: Scalars['Int'],
  subtotal: Scalars['Float'],
  tax: Scalars['Float'],
  total: Scalars['Float'],
  createdAt: Scalars['String'],
  dueAt: Scalars['String'],
  issuedAt: Scalars['String'],
  status: InvoiceStatus,
  notes?: Maybe<Scalars['String']>,
};

export enum InvoiceDbKey {
  Id = 'id',
  Customer = 'customer',
  Total = 'total',
  CreatedAt = 'createdAt',
  Status = 'status'
}

export type InvoiceInput = {
  customerId: Scalars['ID'],
  invoiceNo: Scalars['String'],
  title: Scalars['String'],
  items: Array<Maybe<InvoiceItemInput>>,
  currency: Scalars['String'],
  taxRate: Scalars['Int'],
  subtotal: Scalars['Float'],
  tax: Scalars['Float'],
  total: Scalars['Float'],
  dueAtTimestamp: Scalars['String'],
  issuedAtTimestamp: Scalars['String'],
  status: InvoiceStatus,
  notes?: Maybe<Scalars['String']>,
};

export type InvoiceItemInput = {
  name: Scalars['String'],
  description: Scalars['String'],
  price: Scalars['Float'],
  quantity: Scalars['Int'],
};

export type InvoicesPaginated = {
   __typename?: 'InvoicesPaginated',
  total: Scalars['Int'],
  items: Array<Maybe<Invoice>>,
};

export enum InvoiceStatus {
  Draft = 'DRAFT',
  Due = 'DUE',
  PastDue = 'PAST_DUE',
  Paid = 'PAID',
  Unpaid = 'UNPAID'
}

export type Item = {
   __typename?: 'Item',
  name: Scalars['String'],
  description: Scalars['String'],
  price: Scalars['Float'],
  quantity: Scalars['Int'],
  discount?: Maybe<Scalars['Int']>,
};

export type LabelMin = {
   __typename?: 'LabelMin',
  name: Scalars['String'],
  color?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createContact: Contact,
  createInvoice: Invoice,
  _?: Maybe<Scalars['Boolean']>,
};


export type MutationCreateContactArgs = {
  input: ContactInput
};


export type MutationCreateInvoiceArgs = {
  input: InvoiceInput
};

export type Query = {
   __typename?: 'Query',
  getContacts: ContactsPaginated,
  getContact: Contact,
  getInvoices: InvoicesPaginated,
  getInvoice: Invoice,
  _?: Maybe<Scalars['Boolean']>,
};


export type QueryGetContactArgs = {
  id: Scalars['ID']
};


export type QueryGetInvoicesArgs = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  search?: Maybe<Scalars['String']>,
  searchKey?: Maybe<InvoiceDbKey>,
  sortKey?: Maybe<InvoiceDbKey>,
  isDesc?: Maybe<Scalars['Boolean']>
};


export type QueryGetInvoiceArgs = {
  id: Scalars['ID']
};
