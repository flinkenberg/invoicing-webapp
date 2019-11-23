import React, { useState, ChangeEvent, createRef, RefObject, MouseEvent, useMemo, useEffect } from "react";
import styles from "../../App.scss";
import { Menu, Input, Dropdown, Table, Label, Icon, Message, Grid, Statistic } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import useSort from "../../Common/hooks/useSort";
import { useGetInvoicesQuery } from "../graphql/invoices.generated";
import { InvoiceStatus, InvoiceDbKey } from "../../graphql_definitions";

export default function List() {
  const defaultSortMethod = useMemo(() => InvoiceDbKey.Customer, []);
  const { currentSortMethod, sort } = useSort<InvoiceDbKey>(defaultSortMethod);
  const [input, setInput] = useState<string>("");
  const [ddOption, setDdOption] = useState<InvoiceDbKey>(defaultSortMethod);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, loading } = useGetInvoicesQuery({
    variables: {
      limit,
      offset: page * limit - limit,
      search: input,
      searchKey: ddOption,
      sortKey: currentSortMethod.column,
      isDesc: currentSortMethod.isDesc,
    },
  });
  useEffect(() => {
    handleDropdownClose();
  }, []);
  const invoices = useMemo(() => (data && data.getInvoices ? data.getInvoices.items : []), [data]);
  const total = useMemo(() => (data && data.getInvoices ? data.getInvoices.total : 0), [data]);
  const pages = useMemo(
    () =>
      total < limit
        ? 1
        : total < invoices.length
        ? Math.floor(invoices.length / limit) + 1
        : Math.floor(total / limit) + 1,
    [total, limit, invoices],
  );
  const searchInputRef: RefObject<Input> = createRef();
  function handleDropdownChange(_, data): void {
    // sort(defaultSortMethod);
    setPage(1);
    setDdOption(data.value);
  }
  function handleLimitChange(_, data): void {
    setPage(1);
    setLimit(data.value);
  }
  function handleDropdownClose(): void {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }
  function handleOnInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setInput(e.currentTarget.value);
  }
  // function handleStatusLabelClick(e: MouseEvent<HTMLButtonElement>): void {
  //   sort(defaultSortMethod);
  //   setPage(1);
  //   setDdOption(InvoiceDbKey.Status);
  //   setInput(e.currentTarget.name);
  //   searchInputRef.current.focus();
  // }
  // function handleTagClick(e: MouseEvent<HTMLButtonElement>): void {
  //   sort(null);
  //   setDdOption("tags");
  //   setInput(e.currentTarget.name);
  //   searchInputRef.current.focus();
  //   // handleFilter(e.currentTarget.name, "tags");
  // }
  function previousPage(): void {
    if (page > 1) setPage(page - 1);
  }
  function nextPage(): void {
    if (total > page * limit) setPage(page + 1);
  }
  function handleChangePage(e: MouseEvent<HTMLAnchorElement>): void {
    if (e.currentTarget.title === "Previous page") previousPage();
    if (e.currentTarget.title === "Next page") nextPage();
    const page = parseInt(e.currentTarget.title);
    if (total > (page - 1) * limit) setPage(page);
  }
  function handleSortById(): void {
    sort(InvoiceDbKey.Id);
    setPage(1);
  }
  function handleSortByCustomer(): void {
    sort(InvoiceDbKey.Customer);
    setPage(1);
  }
  function handleSortByTotal(): void {
    sort(InvoiceDbKey.Total);
    setPage(1);
  }
  function handleSortByCreatedAt(): void {
    sort(InvoiceDbKey.CreatedAt);
    setPage(1);
  }
  function handleSortByStatus(): void {
    sort(InvoiceDbKey.Status);
    setPage(1);
  }
  function renderInvoiceStatusTag(status: InvoiceStatus): JSX.Element {
    let color;
    switch (status) {
      case InvoiceStatus.PastDue:
        color = "orange";
        break;
      case InvoiceStatus.Paid:
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
        // onClick={handleStatusLabelClick}
        size="tiny"
        circular
        color={status === InvoiceStatus.Unpaid ? "red" : null}
        basic={status !== InvoiceStatus.Unpaid}
      >
        <Icon name="circle" color={status !== InvoiceStatus.Unpaid ? color : null} />
        {status}
      </Label>
    );
  }
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
              <>
                <Dropdown
                  basic
                  button
                  floating
                  onClose={handleDropdownClose}
                  onChange={handleDropdownChange}
                  value={ddOption}
                  options={[
                    { key: InvoiceDbKey.Id, text: "ID", value: InvoiceDbKey.Id, icon: "hashtag" },
                    { key: InvoiceDbKey.Customer, text: "Customer", value: InvoiceDbKey.Customer, icon: "user" },
                    { key: InvoiceDbKey.Total, text: "Total", value: InvoiceDbKey.Total, icon: "dollar sign" },
                    {
                      key: InvoiceDbKey.CreatedAt,
                      text: "Created At",
                      value: InvoiceDbKey.CreatedAt,
                      icon: "clock outline",
                    },
                    // { key: "tags", text: "Tag", value: "tags", icon: "tag" },
                    { key: InvoiceDbKey.Status, text: "Status", value: InvoiceDbKey.Status, icon: "lightning" },
                  ]}
                />
                <Dropdown
                  basic
                  button
                  floating
                  onChange={handleLimitChange}
                  value={limit}
                  options={[
                    { key: "5", text: "5 per page", value: 5 },
                    { key: "10", text: "10 per page", value: 10 },
                    { key: "25", text: "25 per page", value: 25 },
                  ]}
                />
              </>
            }
          />
          {loading ? (
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Loading</Message.Header>
              </Message.Content>
            </Message>
          ) : invoices.length ? (
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
                      {`${new Date(parseInt(inv.createdAt)).toLocaleDateString()} - ${new Date(
                        parseInt(inv.createdAt),
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
                      {Array(pages)
                        .fill(null)
                        .map((_, i) => (
                          <Menu.Item
                            key={i + 1}
                            as="button"
                            title={i + 1}
                            active={page === i + 1}
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
