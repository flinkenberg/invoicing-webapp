import React, { lazy, Suspense } from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./App.scss";
import { Menu, Container, Image, Dropdown, Dimmer, Loader } from "semantic-ui-react";
import { Link, HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const InvoicesList = lazy(() => import("./Invoices/components/List"));
const ContactsList = lazy(() => import("./Contacts/components/List"));

export default function App() {
  return (
    <Router>
      <div className={styles.appWrap}>
        <Menu inverted>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image size="mini" src="#" style={{ marginRight: "1.5rem" }} />
              Invoicing
            </Menu.Item>
            <Menu.Item as={Link} to="/invoices">
              Invoices
            </Menu.Item>
            <Menu.Item as={Link} to="/contacts">
              Contacts
            </Menu.Item>
            <Menu.Menu position="right">
              <Dropdown item text="John Doe">
                <Dropdown.Menu>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Account</Dropdown.Item>
                  <Dropdown.Item>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
        <Container>
          <Suspense
            fallback={
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            }
          >
            <Switch>
              <Route path="/invoices" component={InvoicesList} />
              <Route path="/contacts" component={ContactsList} />
              <Redirect to="/invoices" />
            </Switch>
          </Suspense>
        </Container>
      </div>
    </Router>
  );
}
