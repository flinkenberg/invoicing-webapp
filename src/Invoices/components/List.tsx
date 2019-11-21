import React, { useState, ChangeEvent, createRef, RefObject, MouseEvent } from "react";
import styles from "../../App.scss";
import { Menu, Input, Dropdown, Table, Label, Icon, Message, Grid, Statistic } from "semantic-ui-react";
import { InvoiceStatus, Invoice } from "../types/main";
import { NavLink } from "react-router-dom";
import useSort from "../../hooks/useSort";
import useGetInvoices from "../hooks/useGetInvoices";

export default function List() {
  const { currentSortMethod, sort } = useSort<keyof Invoice>((column, desc) => {
    // `Should call graphl to sort invoices by ${column}, method ${desc ? "DESC" : "ASC"}`
    return null;
  });
  const [input, setInput] = useState<string>("");
  const [ddOption, setDdOption] = useState<keyof Invoice>("customer");
  // Should be a graphl hook
  const { limit, invoices, total, changePage, currentPage, previousPage, nextPage } = useGetInvoices();
  const searchInputRef: RefObject<Input> = createRef();
  function handleDropdownChange(_, data): void {
    sort(null);
    setDdOption(data.value);
    // do graphl search for data.value which should be a column name
    // handleFilter(input, data.value);
  }
  function handleDropdownClose(): void {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }
  function handleOnInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setInput(e.currentTarget.value);
    // handleFilter(e.currentTarget.value, ddOption);
  }
  function handleStatusLabelClick(e: MouseEvent<HTMLButtonElement>): void {
    sort(null);
    setDdOption("status");
    setInput(e.currentTarget.name);
    searchInputRef.current.focus();
    // handleFilter(e.currentTarget.name, "tags");
  }
  // function handleTagClick(e: MouseEvent<HTMLButtonElement>): void {
  //   sort(null);
  //   setDdOption("tags");
  //   setInput(e.currentTarget.name);
  //   searchInputRef.current.focus();
  //   // handleFilter(e.currentTarget.name, "tags");
  // }
  function handleChangePage(e: MouseEvent<HTMLAnchorElement>): void {
    switch (e.currentTarget.title) {
      case "Page 1":
        changePage(1);
        break;
      case "Page 2":
        changePage(2);
        break;
      case "Page 3":
        changePage(3);
        break;
      case "Page 4":
        changePage(4);
        break;
      case "Previous page":
        previousPage();
        break;
      case "Next page":
        nextPage();
        break;
      default:
        break;
    }
  }
  function handleSortById(): void {
    sort("id");
  }
  function handleSortByCustomer(): void {
    sort("customer");
  }
  function handleSortByTotal(): void {
    sort("total");
  }
  function handleSortByCreatedAt(): void {
    sort("createdAt");
  }
  function handleSortByStatus(): void {
    sort("status");
  }
  function renderInvoiceStatusTag(status: InvoiceStatus): JSX.Element {
    let color;
    switch (status) {
      case InvoiceStatus.PAST_DUE:
        color = "orange";
        break;
      case InvoiceStatus.PAID:
        color = "green";
        break;
      default:
        color = "blue";
    }
    return (
      <Label
        as="button"
        style={{ cursor: "pointer" }}
        name={status}
        onClick={handleStatusLabelClick}
        size="tiny"
        circular
        color={status === InvoiceStatus.UNPAID ? "red" : null}
        basic={status !== InvoiceStatus.UNPAID}
      >
        <Icon name="circle" color={status !== InvoiceStatus.UNPAID ? color : null} />
        {status}
      </Label>
    );
  }
  // function handleFilter(val: string, ddOption: keyof Invoice): void {
  //   // Should be on the backend
  //   if (!val.length) {
  //     setInvoices(data);
  //   } else {
  //     if (ddOption === "tags") {
  //       setInvoices(
  //         data.reduce((acc, inv) => {
  //           inv.tags.forEach(tag => {
  //             if (tag.name.toLowerCase().includes(val.toLowerCase())) {
  //               acc.push(inv);
  //             }
  //           });
  //           return acc;
  //         }, []),
  //       );
  //     } else if (ddOption === "customer") {
  //       setInvoices(data.filter(inv => inv.customer.name.toLowerCase().includes(val.toLowerCase())));
  //     } else if (ddOption === "status") {
  //       setInvoices(data.filter(inv => inv.status.toLowerCase().includes(val.toLowerCase())));
  //     }
  //   }
  // }
  return (
    <Grid stretched>
      <Grid.Column width={3}>
        <Menu fluid vertical tabular>
          <Menu.Item active name="List" icon="list alternate outline" />
          <Menu.Item as={NavLink} to="/invoices/create" name="New Invoice" icon="file outline" />
        </Menu>
      </Grid.Column>
      <Grid.Column stretched width={13}>
        <div>
          <Input
            ref={searchInputRef}
            type="search"
            autoFocus
            fluid
            value={input}
            onChange={handleOnInputChange}
            icon="search"
            iconPosition="left"
            placeholder="Search..."
            action={
              <Dropdown
                button
                floating
                onClose={handleDropdownClose}
                onChange={handleDropdownChange}
                value={ddOption}
                options={[
                  { key: "id", text: "ID", value: "id", icon: "hashtag" },
                  { key: "customer", text: "Customer", value: "customer", icon: "user" },
                  { key: "total", text: "Total", value: "total", icon: "dollar sign" },
                  { key: "createdAt", text: "Created At", value: "createdAt", icon: "clock outline" },
                  // { key: "tags", text: "Tag", value: "tags", icon: "tag" },
                  { key: "status", text: "Status", value: "status", icon: "lightning" },
                ]}
              />
            }
          />
          {invoices.length ? (
            <Table basic="very" compact celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    singleLine
                    className={
                      currentSortMethod && currentSortMethod.column === "id"
                        ? styles.headerCellActive
                        : styles.headerCell
                    }
                    textAlign="center"
                    onClick={handleSortById}
                  >
                    {currentSortMethod && currentSortMethod.column === "id" ? (
                      currentSortMethod.isDesc ? (
                        <Icon aria-hidden="true" name="angle down" />
                      ) : (
                        <Icon aria-hidden="true" name="angle up" />
                      )
                    ) : null}
                    ID
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    singleLine
                    className={
                      currentSortMethod && currentSortMethod.column === "customer"
                        ? styles.headerCellActive
                        : styles.headerCell
                    }
                    onClick={handleSortByCustomer}
                  >
                    {currentSortMethod && currentSortMethod.column === "customer" ? (
                      currentSortMethod.isDesc ? (
                        <Icon aria-hidden="true" name="angle down" />
                      ) : (
                        <Icon aria-hidden="true" name="angle up" />
                      )
                    ) : null}
                    Customer
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    singleLine
                    className={
                      currentSortMethod && currentSortMethod.column === "total"
                        ? styles.headerCellActive
                        : styles.headerCell
                    }
                    onClick={handleSortByTotal}
                  >
                    {currentSortMethod && currentSortMethod.column === "total" ? (
                      currentSortMethod.isDesc ? (
                        <Icon aria-hidden="true" name="angle down" />
                      ) : (
                        <Icon aria-hidden="true" name="angle up" />
                      )
                    ) : null}
                    Total
                  </Table.HeaderCell>
                  {/* <Table.HeaderCell singleLine>Tags</Table.HeaderCell> */}
                  <Table.HeaderCell
                    singleLine
                    className={
                      currentSortMethod && currentSortMethod.column === "createdAt"
                        ? styles.headerCellActive
                        : styles.headerCell
                    }
                    onClick={handleSortByCreatedAt}
                  >
                    {currentSortMethod && currentSortMethod.column === "createdAt" ? (
                      currentSortMethod.isDesc ? (
                        <Icon aria-hidden="true" name="angle down" />
                      ) : (
                        <Icon aria-hidden="true" name="angle up" />
                      )
                    ) : null}
                    Created at
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    className={
                      currentSortMethod && currentSortMethod.column === "status"
                        ? styles.headerCellActive
                        : styles.headerCell
                    }
                    onClick={handleSortByStatus}
                  >
                    {currentSortMethod && currentSortMethod.column === "status" ? (
                      currentSortMethod.isDesc ? (
                        <Icon aria-hidden="true" name="angle down" />
                      ) : (
                        <Icon aria-hidden="true" name="angle up" />
                      )
                    ) : null}
                    Status
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {invoices.map(inv => (
                  <Table.Row key={inv.id}>
                    <Table.Cell textAlign="center">{inv.id}</Table.Cell>
                    <Table.Cell singleLine>{inv.customer.name}</Table.Cell>
                    <Table.Cell singleLine textAlign="right">
                      <Statistic size="mini">
                        <Statistic.Value>
                          <Icon name="pound" size="small" />
                          {inv.total}
                        </Statistic.Value>
                      </Statistic>
                    </Table.Cell>
                    {/* <Table.Cell>
                      {inv.tags.map(tag => (
                        <Label
                          key={tag.id}
                          as="button"
                          name={tag.name}
                          onClick={handleTagClick}
                          title={`Tag ${tag.name}`}
                          size="mini"
                          color={tag.colour}
                          basic
                        >
                          {tag.name}
                        </Label>
                      ))}
                    </Table.Cell> */}
                    <Table.Cell singleLine>
                      {`${new Date(inv.createdAt).toLocaleDateString()} - ${new Date(
                        inv.createdAt,
                      ).toLocaleTimeString()}`}
                    </Table.Cell>
                    <Table.Cell singleLine>{renderInvoiceStatusTag(inv.status)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="5">
                    <Menu pagination size="tiny">
                      <Menu.Item as="button" title="Previous page" onClick={handleChangePage} icon>
                        <Icon name="chevron left" />
                      </Menu.Item>
                      {Array(total / limit)
                        .fill(null)
                        .map((_, i) => (
                          <Menu.Item
                            key={i + 1}
                            as="button"
                            title={`Page ${i + 1}`}
                            active={currentPage === i + 1}
                            onClick={handleChangePage}
                          >
                            {i + 1}
                          </Menu.Item>
                        ))}
                      <Menu.Item as="button" title="Next page" onClick={handleChangePage} icon>
                        <Icon name="chevron right" />
                      </Menu.Item>
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          ) : (
            <Message
              info
              fluid="true"
              icon="search"
              header="Not found"
              content="There are no results matching your entry."
            />
          )}
        </div>
      </Grid.Column>
    </Grid>
  );
}
