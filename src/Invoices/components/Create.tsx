import React, { useState } from "react";
import { Grid, Menu, Form, Input, TextArea, Checkbox, Button, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import uuid from "uuid/v4";

export default function Create() {
  const [items, setItems] = useState<
    { id: string; name: string; description: string; price: number; quantity: number }[]
  >([]);
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
  return (
    <Grid>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item as={NavLink} to="/invoices/list" name="List" icon="list alternate outline" />
          <Menu.Item active name="New Invoice" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Customer</label>
              <Dropdown
                placeholder="Search customer"
                fluid
                search
                selection
                options={[{ key: "id", value: "Lorem ipsum", text: "Lorem Ipsum" }]}
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
          <Form.Field control={Button} primary>
            Create
          </Form.Field>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
