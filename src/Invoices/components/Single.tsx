import React from "react";
import { RouteComponentProps } from "react-router";
import { useGetInvoiceQuery } from "../graphql/invoices.generated";
import { Message, Icon, Card, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function Single({
  match: {
    params: { id },
  },
}: RouteComponentProps<{ id: string }>) {
  const { data, loading } = useGetInvoiceQuery({ variables: { id } });
  const invoice = data && data.getInvoice ? data.getInvoice : null;
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
  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header>{invoice.customer.name}</Card.Header>
          <Card.Meta>
            <Icon name="hashtag" />
            F1234567890
          </Card.Meta>
          <Card.Description>
            <List>
              <List.Item>
                <List.Icon name="mail" />
                <List.Content>
                  <a href="#">email@domain.com</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="home" />
                <List.Content>
                  <ul>
                    <li>123 Street</li>
                    <li>POSTCODE</li>
                    <li>City</li>
                    <li>Country</li>
                  </ul>
                </List.Content>
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="hashtag" />
          F1234567890
        </Card.Content>
      </Card>
    </div>
  );
}
