import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"

import { moneyFormatter } from 'helpers/utils';

const TransactionTable = ({ deposits, usersDetails }) => {

  // PIPER TO DO = will need to parse the transactions and add in the button here.
  const transactions = [
    {
      id: "1",
      client: "mickeymouse@gmail.com",
      currency: "USD",
      dateCreated: "05/03/2021",
      amount: "10000",
      status: <Badge className={"font-size-11 badge-soft-" + "warning"} pill >{"pending"}</Badge>,
      actions: <Link to={`/admin-new-deposit/${1}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },
    {
      id: "2",
      client: "mickeymouse@gmail.com",
      currency: "USD",
      dateCreated: "05/03/2021",
      amount: "10000",
      status: <Badge className={"font-size-11 badge-soft-" + "success"} pill >{"success"}</Badge>,
      actions: <Link to={`/admin-new-deposit/${2}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },
  ]

  const processedDeposits = deposits.map((deposit) => {
    const status = deposit.status !== "Pending" ? <Badge className={"font-size-11"} style={{ background : "#32CD32", padding: "5px" }} >{"success"}</Badge> :
    <Badge className={"font-size-11"} style={{ background : "#B22222", padding: "5px" }} >{"pending"}</Badge>;

    const usersDetail = usersDetails.find(user => user.email == deposit.client);
    const sortCode = usersDetail ? usersDetail.sortCode : "-";

    return {
      ...deposit,
      actions: <Link to={`/admin-new-deposit/${deposit.id}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>,
      status: status,
      amount: deposit.amount ? moneyFormatter(deposit.amount) : null,
      sortCode: sortCode
    }
  })

  const data = {
    columns: [
      {
        label: "Id",
        field: "id",
        sort: "asc",
        width: 100,
      },
      {
        label: "Client",
        field: "client",
        sort: "asc",
        width: 200,
      },
      {
        label: "Currency",
        field: "currency",
        sort: "asc",
        width: 100,
      },
      {
        label: "Transaction Date",
        field: "dateCreated",
        sort: "asc",
        width: 150,
      },
      {
        label: "Sort Code",
        field: "sortCode",
        sort: "asc",
        width: 80,
      },
      {
        label: "Amount",
        field: "amount",
        sort: "asc",
        width: 150,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 150
      }
    ],
    rows: processedDeposits
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Transactions</CardTitle>
          <MDBDataTable responsive bordered data={data} />
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default TransactionTable
