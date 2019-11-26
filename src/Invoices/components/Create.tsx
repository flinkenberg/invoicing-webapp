import React, { useState, useMemo } from "react";
import { Grid, Menu, Form, Input, TextArea, Checkbox, Button, Dropdown, Message } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import uuid from "uuid/v4";
import { useGetContactsPreviewsQuery } from "../../Contacts/graphql/contacts.generated";
import { useCreateInvoiceMutation, InvoiceMinFragment } from "../graphql/invoices.generated";

export default function Create() {
  const [items, setItems] = useState<
    { id: string; name: string; description: string; price: number; quantity: number }[]
  >([]);
  const [newData, setNewData] = useState<InvoiceMinFragment>(null);
  const { data, loading: contactsLoading } = useGetContactsPreviewsQuery({ fetchPolicy: "network-only" });
  const dropdownContacts = useMemo(
    () =>
      data && data.getContacts
        ? data.getContacts.items.map(c => ({ key: c.id, value: c.id, text: `${c.name} (${c.email})` }))
        : [],
    [data],
  );
  const [submitInvoice, { loading: createLoading }] = useCreateInvoiceMutation({
    onCompleted: data => setNewData(data.createInvoice),
  });
  function handleAddItem(): void {
    const newItem = {
      id: uuid(),
      name: "",
      description: "",
      price: 0,
      quantity: 1,
    };
    setItems([...items, newItem]);
  }
  function handleFormSubmit(): void {
    submitInvoice({
      variables: {
        input: {
          customer: {
            name: "Lorem I",
          },
          items: [
            {
              name: "Test",
              description: "lorem ipsum",
              price: 10,
              quantity: 5,
            },
          ],
          total: 50,
        },
      },
    });
  }
  return (
    <Grid>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item as={NavLink} to="/invoices/list" name="List" icon="list alternate outline" />
          <Menu.Item active name="New Invoice" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}>
        <Form onSubmit={handleFormSubmit} loading={createLoading} success={newData !== null}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Customer</label>
              <Dropdown
                loading={contactsLoading}
                placeholder="Search customer"
                fluid
                search
                selection
                options={dropdownContacts}
              />
            </Form.Field>
          </Form.Group>
          <div>
            {items.map(item => (
              <Form.Group key={item.id} widths="equal">
                <Form.Field control={Input} label="Item" placeholder="Item" value={item.name} />
                <Form.Field control={Input} label="Description" placeholder="Description" value={item.description} />
                <Form.Field
                  control={Input}
                  type="number"
                  min={0}
                  label="Price"
                  placeholder="Price"
                  value={item.price}
                />
                <Form.Field
                  control={Input}
                  type="number"
                  min={1}
                  label="Quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                />
              </Form.Group>
            ))}
            <Button type="button" onClick={handleAddItem}>
              Add Item
            </Button>
          </div>
          {/* <Form.Group inline>
            <label>Radios</label>
            <Form.Field control={Radio} label="Lorem" value="1" checked={true} onChange={() => null} />
            <Form.Field control={Radio} label="Ipsum" value="2" checked={false} onChange={() => null} />
            <Form.Field control={Radio} label="Dolor" value="3" checked={false} onChange={() => null} />
          </Form.Group> */}
          <Form.Field>
            <label>Labels</label>
            <Dropdown
              placeholder="Search label"
              fluid
              multiple
              search
              selection
              options={[
                { key: "loremid", value: "lorem", text: "Lorem" },
                { key: "ipsumid", value: "ipsum", text: "Ipsum" },
              ]}
            />
          </Form.Field>
          <Form.Field control={TextArea} label="Notes" placeholder="Add some notes..." />
          <Form.Field control={Checkbox} checked={true} label="Save as a draft" />
          <Form.Field control={Button} type="submit" primary>
            Create
          </Form.Field>
          {newData && (
            <Message
              success
              icon="check"
              header="Success"
              content={
                <>
                  <p>Your new invoice has been successfuly created.</p>
                  <Button as={Link} positive to={`/invoices/${newData.id}`}>
                    Show
                  </Button>
                </>
              }
            />
          )}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
