import React from "react";
import { RouteComponentProps } from "react-router";
import { useGetContactQuery } from "../graphql/contacts.generated";
import { Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Single({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) {
  const { data, loading } = useGetContactQuery({ variables: { id } });
  const contact = data && data.getContact ? data.getContact : null;
  if (loading)
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Loading</Message.Header>
        </Message.Content>
      </Message>
    );
  if (!contact)
    return (
      <Message
        fluid="true"
        icon="dont"
        header="Not found"
        content={<div>This item could not be found. {<Link to="/invoices/list">Go back to the list.</Link>}</div>}
      />
    );
  return <div>{JSON.stringify(contact)}</div>;
}
