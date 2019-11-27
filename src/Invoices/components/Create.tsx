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
  Card,
  Icon,
  List,
} from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { useGetContactsPreviewsQuery, ContactMinFragment } from "../../Contacts/graphql/contacts.generated";
import { useCreateInvoiceMutation, InvoiceMinFragment } from "../graphql/invoices.generated";
import { InvoiceInput, InvoiceStatus, InvoiceItemInput } from "../../graphql_definitions";
import DatePicker from "react-datepicker";
import uuid from "uuid/v4";

export default function Create() {
  const [data, dispatch] = useReducer(
    (
      state: InvoiceInput,
      action:
        | { field: keyof Omit<InvoiceInput, "items" | "customer">; value: string | number }
        | { field: "status"; value: InvoiceStatus }
        | { field: "items"; value: InvoiceItemInput[] },
    ) => {
      switch (action.field) {
        case "items":
          const total = action.value.reduce((acc, item) => (acc += item.price * item.quantity), 0);
          return {
            ...state,
            items: action.value,
            subtotal: total - (total / 100) * state.tax,
            total,
          };
        default:
          return {
            ...state,
            [action.field]: action.value,
          };
      }
    },
    {
      customerId: null,
      items: [],
      currency: "",
      tax: 21,
      subtotal: 0,
      total: 0,
      dueAtTimestamp: new Date(new Date().setHours(new Date().getHours() + 24)).getTime().toString(),
      status: InvoiceStatus.Draft,
    },
  );
  const [invoiceItems, setInvoiceItems] = useState<(InvoiceItemInput & { id: string })[]>([]);
  const [newData, setNewData] = useState<InvoiceMinFragment>(null);
  const { data: contacts, loading: contactsLoading } = useGetContactsPreviewsQuery({ fetchPolicy: "network-only" });
  const [submitInvoice, { loading: createLoading }] = useCreateInvoiceMutation({
    onCompleted: data => setNewData(data.createInvoice),
    optimisticResponse: {
      __typename: "Mutation",
      createInvoice: newData,
    },
  });
  const dropdownContacts = useMemo(
    () =>
      contacts && contacts.getContacts
        ? contacts.getContacts.items.map(c => ({ key: c.id, value: c.name, text: `${c.name} (${c.email})` }))
        : [],
    [contacts],
  );
  const [selectedCustomer, selectCustomer] = useState<ContactMinFragment>(null);
  function handleAddItem(): void {
    setInvoiceItems([...invoiceItems, { id: uuid(), name: "", description: "", price: 0, quantity: 1 }]);
  }
  function handleDueChange(d: Date): void {
    dispatch({
      field: "dueAtTimestamp",
      value: d.getTime().toString(),
    });
  }
  function handleItemNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const matchingItem = invoiceItems.find(it => it.id === e.currentTarget.name);
    if (!matchingItem) return;
    setInvoiceItems(
      invoiceItems.map(it => {
        if (it.id === matchingItem.id) {
          return {
            ...it,
            name: e.currentTarget.value.trim(),
          };
        } else return it;
      }),
    );
  }
  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const matchingItem = invoiceItems.find(it => it.id === e.currentTarget.name);
    if (!matchingItem) return;
    setInvoiceItems(
      invoiceItems.map(it => {
        if (it.id === matchingItem.id) {
          return {
            ...it,
            description: e.currentTarget.value.trim(),
          };
        } else return it;
      }),
    );
  }
  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const matchingItem = invoiceItems.find(it => it.id === e.currentTarget.name);
    if (!matchingItem) return;
    setInvoiceItems(
      invoiceItems.map(it => {
        if (it.id === matchingItem.id) {
          return {
            ...it,
            price: parseFloat(e.currentTarget.value),
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
    const fullCustomer = contacts && contacts.getContacts.items.find(c => c.id === matchingCustomer.key);
    if (!matchingCustomer || !fullCustomer) return;
    selectCustomer(fullCustomer);
    dispatch({
      field: "customerId",
      value: matchingCustomer.key,
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
        input: data,
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
  useEffect(() => {
    if (dropdownContacts.length) {
      const cust = dropdownContacts[0];
      const custFull = contacts && contacts.getContacts.items.find(c => c.id === cust.key);
      selectCustomer(custFull);
      dispatch({ field: "customerId", value: cust.key });
    }
  }, [dropdownContacts]);
  return (
    <Grid>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item as={NavLink} to="/invoices/list" name="List" icon="list alternate outline" />
          <Menu.Item active name="New Invoice" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}>
        {/* <code>
          invoice items w ids:
          {JSON.stringify(invoiceItems)}
        </code> */}
        {/* <code>
          data state:
          {JSON.stringify(data)}
        </code> */}
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
        <Form onSubmit={handleFormSubmit} loading={createLoading} success={newData !== null}>
          <Segment loading={contactsLoading}>
            <Grid divided>
              <Grid.Column stretched width={6}>
                <Form.Field>
                  <label>Customer</label>
                  <Dropdown
                    placeholder="Search customer"
                    fluid
                    search
                    selection
                    onChange={handleChangeCustomer}
                    options={dropdownContacts}
                  />
                </Form.Field>
                {selectedCustomer && (
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>{selectedCustomer.name}</Card.Header>
                      <Card.Description>
                        <List>
                          <List.Item>
                            <List.Icon name="mail" />
                            <List.Content>{selectedCustomer.email}</List.Content>
                          </List.Item>
                        </List>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name="hashtag" />
                      {selectedCustomer.id}
                    </Card.Content>
                  </Card>
                )}
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Field>
                  <label>Due Date</label>
                  <DatePicker
                    minDate={new Date()}
                    selected={new Date(parseInt(data.dueAtTimestamp, 10))}
                    onChange={handleDueChange}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={5}></Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            {invoiceItems.map(item => {
              return (
                <Form.Group key={item.id} widths="equal">
                  <Form.Field
                    control={Input}
                    label="Item"
                    placeholder="Item"
                    name={item.id}
                    onChange={handleItemNameChange}
                    value={item.name}
                  />
                  <Form.Field
                    control={Input}
                    label="Description"
                    placeholder="Description"
                    name={item.id}
                    onChange={handleDescriptionChange}
                    value={item.description}
                  />
                  <Form.Field
                    control={Input}
                    type="number"
                    min={0}
                    label="Price"
                    placeholder="Price"
                    name={item.id}
                    step="0.01"
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
            {(!data.items.length || data.items[data.items.length - 1].price > 0) && (
              <Button type="button" onClick={handleAddItem}>
                Add Item
              </Button>
            )}
          </Segment>
          <Segment>
            <Statistic.Group>
              <Statistic>
                <Statistic.Label>Tax</Statistic.Label>
                <Statistic.Value>{data.tax}%</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Subotal</Statistic.Label>
                <Statistic.Value>{data.subtotal}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Total</Statistic.Label>
                <Statistic.Value>{data.total}</Statistic.Value>
              </Statistic>
            </Statistic.Group>
          </Segment>
          <Segment>
            <Form.Field control={TextArea} label="Notes" placeholder="Add some notes..." />
            <Form.Field
              control={Checkbox}
              onChange={handleStatusChange}
              checked={data.status === InvoiceStatus.Draft}
              label="Save as a draft"
            />
          </Segment>
          <Form.Field control={Button} type="submit" primary>
            Create
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
