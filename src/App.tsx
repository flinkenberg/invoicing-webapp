import React, { lazy, Suspense } from "react";
import "semantic-ui-css/semantic.min.css";
import styles from "./App.scss";
import { Menu, Container, Image, Dropdown, Dimmer, Loader } from "semantic-ui-react";
import { HashRouter as Router, Route, Switch, Redirect, NavLink, Link } from "react-router-dom";

const InvoicesList = lazy(() => import("./Invoices/components/List"));
const InvoicesCreate = lazy(() => import("./Invoices/components/Create"));
const InvoicesSingle = lazy(() => import("./Invoices/components/Single"));
const ContactsList = lazy(() => import("./Contacts/components/List"));

export default function App() {
  return (
    <Router>
      <div className={styles.appWrap}>
        <Menu fixed="top" inverted style={{ height: "3rem" }}>
          <Container>
            <Menu.Item as={Link} to="/" header>
              <Image size="mini" src="#" style={{ marginRight: "1.5rem" }} />
              Invoice Manager
            </Menu.Item>
            <Menu.Item as={NavLink} to="/invoices">
              Invoices
            </Menu.Item>
            <Menu.Item as={NavLink} to="/contacts">
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
        <div className={styles.mainContentWrap}>
          <Container>
            <Suspense
              fallback={
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              }
            >
              <Switch>
                <Route path="/invoices/list" component={InvoicesList} />
                <Route path="/invoices/create" component={InvoicesCreate} />
                <Route path="/invoices/:id" component={InvoicesSingle} />
                <Route path="/contacts" component={ContactsList} />
                <Redirect to="/invoices/list" />
              </Switch>
            </Suspense>
          </Container>
        </div>
      </div>
    </Router>
  );
}
