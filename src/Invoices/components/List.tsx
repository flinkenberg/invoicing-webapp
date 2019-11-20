import React from "react";
import styles from "../../App.scss";
import { Menu, Input, Dropdown, Table, Label, Icon } from "semantic-ui-react";

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
                  { key: "tag", text: "Tag", value: "tag", icon: "tag" },
                  { key: "status", text: "Status", value: "status", icon: "lightning" },
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
                <Table.HeaderCell>Customer</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell>Tags</Table.HeaderCell>
                <Table.HeaderCell>Created at</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">1</Table.Cell>
                <Table.Cell singleLine>Power Output</Table.Cell>
                <Table.Cell>
                  <Label size="tiny" circular>
                    GBP 1290
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  <Label as="button" title="Tag Lorem" size="mini" color="red" basic>
                    Lorem
                  </Label>
                  <Label as="button" title="Tag Ipsum" size="mini" color="green" basic>
                    Ipsum
                  </Label>
                  <Label as="button" title="Tag Dolor" size="mini" color="blue" basic>
                    Dolor
                  </Label>
                  <Label as="button" title="Tag Sit" size="mini" color="red" basic>
                    Sit
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  80% <br />
                  <a href="#">18 studies</a>
                </Table.Cell>
                <Table.Cell>
                  <Label size="tiny" circular basic>
                    <Icon name="circle" color="blue" />
                    DUE
                  </Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="center">2</Table.Cell>
                <Table.Cell singleLine>Weight</Table.Cell>
                <Table.Cell>
                  <Label size="tiny" circular>
                    GBP 1290
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  <Label as="button" title="Tag Amet" size="mini" color="blue" basic>
                    Amet
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  100% <br />
                  <a href="#">65 studies</a>
                </Table.Cell>
                <Table.Cell>
                  <Label size="tiny" circular basic>
                    <Icon name="circle" color="orange" />
                    PAST DUE
                  </Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="center">3</Table.Cell>
                <Table.Cell singleLine>Weight</Table.Cell>
                <Table.Cell>
                  <Label size="tiny" circular>
                    GBP 1290
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  <Label as="button" title="Tag Lorem" size="mini" color="black" basic>
                    Lorem
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  100% <br />
                  <a href="#">65 studies</a>
                </Table.Cell>
                <Table.Cell>
                  <Label size="tiny" circular basic>
                    <Icon name="circle" color="green" />
                    PAID
                  </Label>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="center">3</Table.Cell>
                <Table.Cell singleLine>Weight</Table.Cell>
                <Table.Cell>
                  <Label size="tiny" circular>
                    GBP 1290
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  <Label as="button" title="Tag Lorem" size="mini" color="red" basic>
                    Lorem
                  </Label>
                  <Label as="button" title="Tag Dolor" size="mini" color="black" basic>
                    Dolor
                  </Label>
                </Table.Cell>
                <Table.Cell>
                  100% <br />
                  <a href="#">65 studies</a>
                </Table.Cell>
                <Table.Cell>
                  <Label size="tiny" circular color="red">
                    <Icon name="circle" />
                    UNPAID
                  </Label>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
