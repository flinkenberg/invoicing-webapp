// THIS IS A GENERATED FILE
// `npm run generate` to refresh it
/* eslint-disable */


import * as Types from '../../graphql_definitions';

import * as Operations from './contacts.graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type ContactMinFragment = (
  { __typename?: 'Contact' }
  & Pick<Types.Contact, 'id' | 'name' | 'email'>
);

export type ContactFullFragment = (
  { __typename?: 'Contact' }
  & Pick<Types.Contact, 'id' | 'name' | 'street' | 'postcode' | 'county' | 'country' | 'email' | 'phone'>
);

export type GetContactsPreviewsQueryVariables = {};


export type GetContactsPreviewsQuery = (
  { __typename?: 'Query' }
  & { getContacts: (
    { __typename?: 'ContactsPaginated' }
    & Pick<Types.ContactsPaginated, 'total'>
    & { items: Array<Types.Maybe<(
      { __typename?: 'Contact' }
      & ContactMinFragment
    )>> }
  ) }
);

export type GetContactsQueryVariables = {};


export type GetContactsQuery = (
  { __typename?: 'Query' }
  & { getContacts: (
    { __typename?: 'ContactsPaginated' }
    & Pick<Types.ContactsPaginated, 'total'>
    & { items: Array<Types.Maybe<(
      { __typename?: 'Contact' }
      & ContactFullFragment
    )>> }
  ) }
);

export type CreateContactMutationVariables = {
  input: Types.ContactInput
};


export type CreateContactMutation = (
  { __typename?: 'Mutation' }
  & { createContact: (
    { __typename?: 'Contact' }
    & ContactFullFragment
  ) }
);



/**
 * __useGetContactsPreviewsQuery__
 *
 * To run a query within a React component, call `useGetContactsPreviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactsPreviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactsPreviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContactsPreviewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetContactsPreviewsQuery, GetContactsPreviewsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetContactsPreviewsQuery, GetContactsPreviewsQueryVariables>(Operations.getContactsPreviews, baseOptions);
      }
export function useGetContactsPreviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetContactsPreviewsQuery, GetContactsPreviewsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetContactsPreviewsQuery, GetContactsPreviewsQueryVariables>(Operations.getContactsPreviews, baseOptions);
        }
export type GetContactsPreviewsQueryHookResult = ReturnType<typeof useGetContactsPreviewsQuery>;
export type GetContactsPreviewsLazyQueryHookResult = ReturnType<typeof useGetContactsPreviewsLazyQuery>;
export type GetContactsPreviewsQueryResult = ApolloReactCommon.QueryResult<GetContactsPreviewsQuery, GetContactsPreviewsQueryVariables>;

/**
 * __useGetContactsQuery__
 *
 * To run a query within a React component, call `useGetContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContactsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetContactsQuery, GetContactsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetContactsQuery, GetContactsQueryVariables>(Operations.getContacts, baseOptions);
      }
export function useGetContactsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetContactsQuery, GetContactsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetContactsQuery, GetContactsQueryVariables>(Operations.getContacts, baseOptions);
        }
export type GetContactsQueryHookResult = ReturnType<typeof useGetContactsQuery>;
export type GetContactsLazyQueryHookResult = ReturnType<typeof useGetContactsLazyQuery>;
export type GetContactsQueryResult = ApolloReactCommon.QueryResult<GetContactsQuery, GetContactsQueryVariables>;

/**
 * __useCreateContactMutation__
 *
 * To run a mutation, you first call `useCreateContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactMutation, { data, loading, error }] = useCreateContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateContactMutation, CreateContactMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateContactMutation, CreateContactMutationVariables>(Operations.createContact, baseOptions);
      }
export type CreateContactMutationHookResult = ReturnType<typeof useCreateContactMutation>;
export type CreateContactMutationResult = ApolloReactCommon.MutationResult<CreateContactMutation>;
export type CreateContactMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateContactMutation, CreateContactMutationVariables>;