import React, { useState, useMemo, useReducer, useEffect } from "react";
import {
  Grid,
  Menu,
  Form,
  Input,
  TextArea,
  Checkbox,
  Button,
  Dropdown,
  Message,
  DropdownProps,
  Statistic,
  Segment,
  CheckboxProps,
} from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { useGetContactsPreviewsQuery } from "../../Contacts/graphql/contacts.generated";
import { useCreateInvoiceMutation, InvoiceMinFragment } from "../graphql/invoices.generated";
import { InvoiceInput, InvoiceStatus, InvoiceItemInput, InvoiceCustomerInput } from "../../graphql_definitions";
import uuid from "uuid/v4";

export default function Create() {
  const [data, dispatch] = useReducer(
    (
      state: InvoiceInput,
      action:
        | { field: keyof Omit<InvoiceInput, "items" | "customer">; value: string | number }
        | { field: "customer"; value: InvoiceCustomerInput }
        | { field: "status"; value: InvoiceStatus }
        | { field: "items"; value: InvoiceItemInput[] },
    ) => {
      switch (action.field) {
        case "items":
          return {
            ...state,
            items: action.value,
            total: action.value.reduce((acc, item) => (acc += item.price * item.quantity), 0),
          };
        case "customer":
          return {
            ...state,
            customer: action.value,
          };
        default:
          return {
            ...state,
            [action.field]: action.value,
          };
      }
    },
    {
      customer: {
        name: "",
      },
      items: [],
      total: 0,
      status: InvoiceStatus.Draft,
    },
  );
  const [invoiceItems, setInvoiceItems] = useState<(InvoiceItemInput & { id: string })[]>([
    { id: uuid(), name: "", description: "", price: 0, quantity: 1 },
  ]);
  const [newData, setNewData] = useState<InvoiceMinFragment>(null);
  const { data: contacts, loading: contactsLoading } = useGetContactsPreviewsQuery({ fetchPolicy: "network-only" });
  const [submitInvoice, { loading: createLoading }] = useCreateInvoiceMutation({
    onCompleted: data => setNewData(data.createInvoice),
  });
  const dropdownContacts = useMemo(
    () =>
      contacts && contacts.getContacts
        ? contacts.getContacts.items.map(c => ({ key: c.id, value: c.name, text: `${c.name} (${c.email})` }))
        : [],
    [contacts],
  );
  function handleAddItem(): void {
    setInvoiceItems([...invoiceItems, { id: uuid(), name: "", description: "", price: 0, quantity: 1 }]);
  }
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const matchingItem = invoiceItems.find(it => it.id === e.currentTarget.name);
    if (!matchingItem) return;
    setInvoiceItems(
      invoiceItems.map(it => {
        if (it.id === matchingItem.id) {
          return {
            ...it,
            price: parseInt(e.currentTarget.value, 10),
          };
        } else return it;
      }),
    );
  }
  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const matchingItem = invoiceItems.find(it => it.id === e.currentTarget.name);
    if (!matchingItem) return;
    setInvoiceItems(
      invoiceItems.map(it => {
        if (it.id === matchingItem.id) {
          return {
            ...it,
            quantity: parseInt(e.currentTarget.value, 10),
          };
        } else return it;
      }),
    );
  }
  function handleChangeCustomer(_e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps): void {
    const matchingCustomer = dropdownContacts.find(c => c.value === data.value);
    if (!matchingCustomer) return;
    dispatch({
      field: "customer",
      value: {
        name: matchingCustomer.value,
      },
    });
  }
  function handleStatusChange(e: React.ChangeEvent<HTMLInputElement>, data: CheckboxProps): void {
    if (!data) return;
    dispatch({
      field: "status",
      value: data.checked ? InvoiceStatus.Draft : InvoiceStatus.Due,
    });
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
  useEffect(() => {
    dispatch({
      field: "items",
      value: invoiceItems.map(item => {
        const { id, ...it } = item;
        return it;
      }),
    });
  }, [invoiceItems]);
  return (
    <Grid>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item as={NavLink} to="/invoices/list" name="List" icon="list alternate outline" />
          <Menu.Item active name="New Invoice" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}>
        <code>
          invoice items w ids:
          {JSON.stringify(invoiceItems)}
        </code>
        <code>
          data state:
          {JSON.stringify(data)}
        </code>
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
                onChange={handleChangeCustomer}
                value={data.customer.name}
                options={dropdownContacts}
              />
            </Form.Field>
          </Form.Group>
          <div>
            {invoiceItems.map(item => {
              return (
                <Form.Group key={item.id} widths="equal">
                  <Form.Field control={Input} label="Item" placeholder="Item" value={item.name} />
                  <Form.Field control={Input} label="Description" placeholder="Description" value={item.description} />
                  <Form.Field
                    control={Input}
                    type="number"
                    min={0}
                    label="Price"
                    placeholder="Price"
                    name={item.id}
                    onChange={handlePriceChange}
                    value={item.price}
                  />
                  <Form.Field
                    control={Input}
                    type="number"
                    min={1}
                    label="Quantity"
                    placeholder="Quantity"
                    name={item.id}
                    onChange={handleQuantityChange}
                    value={item.quantity}
                  />
                </Form.Group>
              );
            })}
            {data.total > 0 && (
              <Button type="button" onClick={handleAddItem}>
                Add Item
              </Button>
            )}
          </div>
          <Segment>
            <Statistic>
              <Statistic.Label>Total</Statistic.Label>
              <Statistic.Value>{data.total}</Statistic.Value>
            </Statistic>
          </Segment>
          <Form.Field control={TextArea} label="Notes" placeholder="Add some notes..." />
          <Form.Field
            control={Checkbox}
            onChange={handleStatusChange}
            checked={data.status === InvoiceStatus.Draft}
            label="Save as a draft"
          />
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
