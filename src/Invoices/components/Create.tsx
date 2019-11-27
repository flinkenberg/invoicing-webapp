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
import { InvoiceStatus, InvoiceItemInput } from "../../graphql_definitions";
import DatePicker from "react-datepicker";
import uuid from "uuid/v4";
import { invoiceCreateReducer, invoiceCreateInitState } from "../misc";

export default function Create() {
  const [decPoints, setDecPoints] = useState(3);
  const [data, dispatch] = useReducer(invoiceCreateReducer, invoiceCreateInitState);
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
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    dispatch({
      field: "title",
      value,
    });
  }
  function handleINoChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.currentTarget.value;
    dispatch({
      field: "invoiceNo",
      value,
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
  function handleDueChange(d: Date): void {
    dispatch({
      field: "dueAtTimestamp",
      value: d.getTime().toString(),
    });
  }
  function handleIssueChange(d: Date): void {
    dispatch({
      field: "issuedAtTimestamp",
      value: d.getTime().toString(),
    });
  }
  function handleTaxRateChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const rate = parseInt(e.currentTarget.value, 10);
    if (!rate) return;
    dispatch({
      field: "taxRate",
      value: rate,
      decPoints,
    });
  }
  function handleDecPointsChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const decPoints = parseInt(e.currentTarget.value, 10);
    setDecPoints(decPoints);
    dispatch({
      field: "_decPoints",
      value: decPoints,
      decPoints,
    });
  }
  function handleNotesChange(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({
      field: "notes",
      value: e.currentTarget.value,
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
      decPoints,
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
              <Grid.Column width={5}>
                <Form.Field
                  control={Input}
                  value={data.title}
                  onChange={handleTitleChange}
                  type="text"
                  label="Title"
                  placeholder="Invoice Title"
                />
                <Form.Field
                  control={Input}
                  value={data.invoiceNo}
                  onChange={handleINoChange}
                  type="text"
                  label="Invoice No."
                  placeholder="Invoice No."
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Field>
                  <label>Issue Date</label>
                  <DatePicker
                    minDate={new Date()}
                    selected={new Date(parseInt(data.issuedAtTimestamp, 10))}
                    onChange={handleIssueChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Due Date</label>
                  <DatePicker
                    minDate={new Date(parseInt(data.issuedAtTimestamp, 10))}
                    selected={new Date(parseInt(data.dueAtTimestamp, 10))}
                    onChange={handleDueChange}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column stretched width={6}>
                <Form.Field>
                  <label>Customer</label>
                  <Dropdown
                    placeholder="Search Customer Name"
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
            <Grid divided>
              <Grid.Column width={8}>
                <Statistic.Group horizontal size="tiny">
                  <Statistic>
                    <Statistic.Value>{data.subtotal.toString()}</Statistic.Value>
                    <Statistic.Label>Subtotal</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>{data.tax.toString()}</Statistic.Value>
                    <Statistic.Label>Tax</Statistic.Label>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>{data.total.toString()}</Statistic.Value>
                    <Statistic.Label>Total</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Field
                  control={Input}
                  type="number"
                  min={1}
                  max={99}
                  label="Tax rate"
                  placeholder="Enter Tax Rate ..."
                  value={data.taxRate}
                  onChange={handleTaxRateChange}
                />
                <Form.Field
                  control={Input}
                  type="number"
                  min={1}
                  max={3}
                  label="Decimal points"
                  placeholder="Number of decimal points"
                  value={decPoints}
                  onChange={handleDecPointsChange}
                />
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment>
            <Form.Field
              control={TextArea}
              onChange={handleNotesChange}
              value={data.notes}
              label="Notes"
              placeholder="Add some notes..."
            />
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
