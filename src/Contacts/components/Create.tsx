import React, { useState, useReducer } from "react";
import { Grid, Menu, Form, Input, Button, Message, Select } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { useCreateContactMutation, ContactFullFragment } from "../graphql/contacts.generated";
import { ContactInput } from "src/graphql_definitions";

export default function Create() {
  const [newData, setNewData] = useState<ContactFullFragment>(null);
  const [data, dispatch] = useReducer(
    (state: ContactInput, action: { field: keyof ContactInput; value: string }) => {
      return {
        ...state,
        [action.field]: action.value,
      };
    },
    {
      name: "",
      email: "",
      phone: "",
      street: "",
      county: "",
      postcode: "",
      country: "",
    },
  );
  const [createContact, { loading }] = useCreateContactMutation({
    onCompleted: data => setNewData(data.createContact),
  });
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const field: any = e.currentTarget.name;
    dispatch({ field, value: e.currentTarget.value });
  }
  function handleFormSubmit(): void {
    createContact({
      variables: {
        input: {
          ...data,
        },
      },
    });
  }
  return (
    <Grid>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item as={NavLink} to="/contacts/list" name="List" icon="list alternate outline" />
          <Menu.Item active name="New Contact" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}>
        <Form onSubmit={handleFormSubmit} loading={loading} success={newData !== null}>
          <Form.Field
            name="name"
            value={data.name}
            onChange={handleChangeInput}
            control={Input}
            label="Customer name"
            placeholder="Enter customer name..."
          />
          <Form.Group widths="equal">
            <Form.Field
              name="email"
              value={data.email}
              onChange={handleChangeInput}
              control={Input}
              label="E-mail"
              type="email"
              placeholder="Enter e-mail address..."
            />
            <Form.Field
              name="phone"
              value={data.phone}
              onChange={handleChangeInput}
              control={Input}
              label="Phone number"
              type="tel"
              placeholder="Enter telephone number..."
            />
          </Form.Group>
          <Form.Field
            name="street"
            value={data.street}
            onChange={handleChangeInput}
            control={Input}
            label="Street"
            placeholder="Enter house number and a street name..."
          />
          <Form.Field
            name="county"
            value={data.county}
            onChange={handleChangeInput}
            control={Input}
            label="County"
            placeholder="Enter county..."
          />
          <Form.Group widths="equal">
            <Form.Field
              name="postcode"
              value={data.postcode}
              onChange={handleChangeInput}
              control={Input}
              label="Postcode"
              placeholder="Enter postcode..."
            />
            <Form.Field
              name="country"
              value={data.country}
              onChange={handleChangeInput}
              control={Select}
              label="Country"
              placeholder="Choose a country..."
              options={[]}
            />
          </Form.Group>
          {/* <Form.Field control={TextArea} label="Notes" placeholder="Add some notes..." /> */}
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
                  <p>Your new contact has been successfuly created.</p>
                  <Button as={Link} positive to={`/contacts/${newData.id}`}>
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
