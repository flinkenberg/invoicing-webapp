import React from "react";
import { Menu, Grid } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function List() {
  return (
    <Grid stretched>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item active name="List" icon="list alternate outline" />
          <Menu.Item as={NavLink} to="/contacts/create" name="New Contact" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}></Grid.Column>
    </Grid>
  );
}
