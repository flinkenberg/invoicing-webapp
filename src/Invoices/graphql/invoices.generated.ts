// THIS IS A GENERATED FILE
// `npm run generate` to refresh it
/* eslint-disable */


import * as Types from '../../graphql_definitions';

import * as Operations from './invoices.graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type InvoiceMinFragment = (
  { __typename?: 'Invoice' }
  & Pick<Types.Invoice, 'id' | 'total' | 'createdAt' | 'status'>
  & { customer: (
    { __typename?: 'CustomerMin' }
    & Pick<Types.CustomerMin, 'name'>
  ) }
);

export type GetInvoicesQueryVariables = {
  limit?: Types.Maybe<Types.Scalars['Int']>,
  offset?: Types.Maybe<Types.Scalars['Int']>,
  search?: Types.Maybe<Types.Scalars['String']>,
  searchKey?: Types.Maybe<Types.InvoiceDbKey>,
  sortKey?: Types.Maybe<Types.InvoiceDbKey>,
  isDesc?: Types.Maybe<Types.Scalars['Boolean']>
};


export type GetInvoicesQuery = (
  { __typename?: 'Query' }
  & { getInvoices: (
    { __typename?: 'InvoicesPaginated' }
    & Pick<Types.InvoicesPaginated, 'total'>
    & { items: Array<Types.Maybe<(
      { __typename?: 'Invoice' }
      & InvoiceMinFragment
    )>> }
  ) }
);

export type GetInvoiceQueryVariables = {
  id: Types.Scalars['ID']
};


export type GetInvoiceQuery = (
  { __typename?: 'Query' }
  & { getInvoice: (
    { __typename?: 'Invoice' }
    & InvoiceMinFragment
  ) }
);

export type CreateInvoiceMutationVariables = {
  input: Types.InvoiceInput
};


export type CreateInvoiceMutation = (
  { __typename?: 'Mutation' }
  & { createInvoice: (
    { __typename?: 'Invoice' }
    & InvoiceMinFragment
  ) }
);



/**
 * __useGetInvoicesQuery__
 *
 * To run a query within a React component, call `useGetInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      search: // value for 'search'
 *      searchKey: // value for 'searchKey'
 *      sortKey: // value for 'sortKey'
 *      isDesc: // value for 'isDesc'
 *   },
 * });
 */
export function useGetInvoicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetInvoicesQuery, GetInvoicesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetInvoicesQuery, GetInvoicesQueryVariables>(Operations.getInvoices, baseOptions);
      }
export function useGetInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetInvoicesQuery, GetInvoicesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetInvoicesQuery, GetInvoicesQueryVariables>(Operations.getInvoices, baseOptions);
        }
export type GetInvoicesQueryHookResult = ReturnType<typeof useGetInvoicesQuery>;
export type GetInvoicesLazyQueryHookResult = ReturnType<typeof useGetInvoicesLazyQuery>;
export type GetInvoicesQueryResult = ApolloReactCommon.QueryResult<GetInvoicesQuery, GetInvoicesQueryVariables>;

/**
 * __useGetInvoiceQuery__
 *
 * To run a query within a React component, call `useGetInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInvoiceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetInvoiceQuery, GetInvoiceQueryVariables>) {
        return ApolloReactHooks.useQuery<GetInvoiceQuery, GetInvoiceQueryVariables>(Operations.getInvoice, baseOptions);
      }
export function useGetInvoiceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetInvoiceQuery, GetInvoiceQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetInvoiceQuery, GetInvoiceQueryVariables>(Operations.getInvoice, baseOptions);
        }
export type GetInvoiceQueryHookResult = ReturnType<typeof useGetInvoiceQuery>;
export type GetInvoiceLazyQueryHookResult = ReturnType<typeof useGetInvoiceLazyQuery>;
export type GetInvoiceQueryResult = ApolloReactCommon.QueryResult<GetInvoiceQuery, GetInvoiceQueryVariables>;

/**
 * __useCreateInvoiceMutation__
 *
 * To run a mutation, you first call `useCreateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoiceMutation, { data, loading, error }] = useCreateInvoiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateInvoiceMutation, CreateInvoiceMutationVariables>(Operations.createInvoice, baseOptions);
      }
export type CreateInvoiceMutationHookResult = ReturnType<typeof useCreateInvoiceMutation>;
export type CreateInvoiceMutationResult = ApolloReactCommon.MutationResult<CreateInvoiceMutation>;
export type CreateInvoiceMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateInvoiceMutation, CreateInvoiceMutationVariables>;