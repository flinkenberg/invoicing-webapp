import React from "react";
import styles from "../../App.scss";
import { Menu, Input, Dropdown, Table } from "semantic-ui-react";

export default function List() {
  return (
    <div className={styles.appSidebarContentWrap}>
      <Menu fluid pointing secondary vertical>
        <Menu.Item name="home" active={false} />
        <Menu.Item name="messages" active={false} />
        <Menu.Item name="friends" active={false} />
      </Menu>
      <div className={styles.appContentWrap}>
        <div>
          <Input
            autoFocus
            fluid
            action={
              <Dropdown
                button
                basic
                floating
                options={[
                  { key: "customer", text: "Customer Name", value: "customer", icon: "user" },
                  { key: "address", text: "Address", value: "address", icon: "home" },
                ]}
                defaultValue="customer"
              />
            }
            icon="search"
            iconPosition="left"
            placeholder="Search..."
          />
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Created at</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">1</Table.Cell>
                <Table.Cell singleLine>Power Output</Table.Cell>
                <Table.Cell>123 Street, City, Country</Table.Cell>
                <Table.Cell>01/01/2019</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="center">1</Table.Cell>
                <Table.Cell singleLine>Power Output</Table.Cell>
                <Table.Cell>123 Street, City, Country</Table.Cell>
                <Table.Cell>01/01/2019</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="center">1</Table.Cell>
                <Table.Cell singleLine>Power Output</Table.Cell>
                <Table.Cell>123 Street, City, Country</Table.Cell>
                <Table.Cell>01/01/2019</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
