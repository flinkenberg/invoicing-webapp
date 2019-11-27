import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router";
import { useGetInvoiceQuery } from "../graphql/invoices.generated";
import { Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Single({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) {
  const { data, loading } = useGetInvoiceQuery({ variables: { id } });
  const invoice = useMemo(() => (data && data.getInvoice ? data.getInvoice : null), [data]);
  if (loading)
    return (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Loading</Message.Header>
        </Message.Content>
      </Message>
    );
  if (!invoice)
    return (
      <Message
        fluid="true"
        icon="dont"
        header="Not found"
        content={<div>This item could not be found. {<Link to="/invoices/list">Go back to the list.</Link>}</div>}
      />
    );
  return <div>{JSON.stringify(invoice, null, " ")}</div>;
}
