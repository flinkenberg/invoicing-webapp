import React from "react";
import { Grid, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function Create() {
  return (
    <Grid>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item as={NavLink} to="/invoices/list" name="List" icon="list alternate outline" />
          <Menu.Item active name="New Invoice" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}></Grid.Column>
    </Grid>
  );
}
