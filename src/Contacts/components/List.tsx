import React, { useMemo } from "react";
import { Message, Icon, Grid, Menu } from "semantic-ui-react";
import { useGetContactsQuery } from "../graphql/contacts.generated";
import { NavLink } from "react-router-dom";

export default function List() {
  const { data, loading } = useGetContactsQuery();
  const contacts = useMemo(() => (data && data.getContacts ? data.getContacts.items : []), [data]);
  return (
    <Grid stretched>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item active name="List" icon="list alternate outline" />
          <Menu.Item as={NavLink} to="/contacts/create" name="New Contact" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}>
        {loading ? (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Loading</Message.Header>
            </Message.Content>
          </Message>
        ) : (
          JSON.stringify(contacts)
        )}
      </Grid.Column>
    </Grid>
  );
}
