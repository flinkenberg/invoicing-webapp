// THIS IS A GENERATED FILE
// `npm run generate` to refresh it
/* eslint-disable */


import * as Types from '../../graphql_definitions';

import * as Operations from './invoices.graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


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
      & Pick<Types.Invoice, 'id' | 'total' | 'createdAt' | 'status'>
      & { customer: (
        { __typename?: 'CustomerMin' }
        & Pick<Types.CustomerMin, 'name'>
      ) }
    )>> }
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