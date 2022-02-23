import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"


import { moneyFormatter } from 'helpers/utils';

const IposTable = ({ ipos }) => {

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

  const processedIpos = ipos.map((ipo) => {
    const status = ipo.status  ? <Badge className={"font-size-11"} style={{ background : "#32CD32", padding: "5px" }} >{"available"}</Badge> :
    <Badge className={"font-size-11"} style={{ background : "#B22222", padding: "5px" }} >{"unavailable"}</Badge>; 

    return {
      ...ipo,
      actions: <Link to={`/admin-new-ipo/${ipo.id}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>,
      status: status,
      price: ipo.price ? moneyFormatter(ipo.price) : null,
      logo: <img src={ipo.logo} alt="L" width={60} />
    }
  })

  const data = {
    columns: [
      {
        label: "Logo",
        field: "logo",
        sort: "asc",
        width: 100,
      },
      {
        label: "Company",
        field: "company",
        sort: "asc",
        width: 200,
      },
      {
        label: "Symbol",
        field: "symbol",
        sort: "asc",
        width: 100,
      },
      {
        label: "Lead Manager",
        field: "manager",
        sort: "asc",
        width: 150,
      },
      {
        label: "Shares (mil)",
        field: "totalShares",
        sort: "asc",
        width: 150,
      },
      {
        label: "Listing Range",
        field: "listingRange",
        sort: "asc",
        width: 100,
      },
      {
        label: "Expected To Trade",
        field: "expectedToTrade",
        sort: "asc",
        width: 150
      },
      {
        label: "Share Price",
        field: "price",
        sort: "asc",
        width: 150
      },
      {
        label: "Min Shares",
        field: "minimumShares",
        sort: "asc",
        width: 100
      },
      {
        label: "Available",
        field: "available",
        sort: "asc",
        width: 150
      },
      {
        label: "Prospectus",
        field: "prospectus",
        sort: "asc",
        width: 150
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 100
      },
    ],
    rows: processedIpos
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

export default IposTable
