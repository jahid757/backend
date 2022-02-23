import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"

import { moneyFormatter } from 'helpers/utils';

const TradesTable = ({ trades }) => {
  console.log(trades);
  
  // PIPER TO DO = will need to parse the transactions and add in the button here.
  const tradess = [
    {
      id: "1",
      client: "billcrosby@gmail.com",
      product: "Aviva High Yield Fixed Income ISA",
      term: "1 Year",
      amount: "40000",
      maturityDate: "07/12/2022",
      date: "03/03/2021",
      payoutFreq: "Annually",
      ISIN: "12343453",
      annualReturnRate: "4%",
      actions: <Link to={`/admin-new-trade/${2}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },
    {
        id: "2",
        client: "willsmith@gmail.com",
        product: "Aviva High Yield Fixed Income ISA",
        term: "1 Year",
        amount: "50000",
        maturityDate: "07/12/2022",
        date: "05/03/2021",
        payoutFreq: "Semesterly",
        ISIN: "12343453",
        annualReturnRate: "4%",
        actions: <Link to={`/admin-new-trade/${2}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },
  ]

  const processedTrades = trades ? trades.map((trade) => {
    return {
      ...trade,
      amount: trade.amount ? moneyFormatter(trade.amount) : null,
      actions: <Link to={`/admin-new-trade/${trade.id}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    }
  }) : [];

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
        label: "Product",
        field: "product",
        sort: "asc",
        width: 100,
      },
      {
        label: "Term",
        field: "maturityTerm",
        sort: "asc",
        width: 100,
      },
      {
        label: "Amount",
        field: "amount",
        sort: "asc",
        width: 100,
      },
      {
        label: "Payout Frequency",
        field: "payoutFreq",
        sort: "asc",
        width: 150,
      },
      {
        label: "Maturity Date",
        field: "maturityDate",
        sort: "asc",
        width: 100,
      },
      {
          label: "Purchase Date",
          field: "dateCreated",
          sort: "asc",
          width: 100,
      },
      {
        label: "Annual Return Rate",
        field: "annualReturn",
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
    rows: processedTrades
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Trades</CardTitle>
          <MDBDataTable responsive bordered data={data} />
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default TradesTable;