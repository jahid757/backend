import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"

import { moneyFormatter } from 'helpers/utils';

const UserSalesTable = ({ userSales }) => {

  const processedUserSales = userSales.map((userSale) => {
    return {
      ...userSale,
      actions: <Link to={`/admin-new-sale/${userSale.id}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>,
      amount: userSale.amount ? moneyFormatter(userSale.amount) : moneyFormatter(0),
      profitLoss: userSale.profitLoss ? moneyFormatter(userSale.profitLoss) : null,
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
        label: "Total Amount",
        field: "amount",
        sort: "asc",
        width: 150,
      },
      {
        label: "Profit/Loss",
        field: "profitLoss",
        sort: "asc",
        width: 150,
      },
      {
        label: "Shares Number",
        field: "sharesNumber",
        sort: "asc",
        width: 150,
      },
      {
        label: "Transaction Date",
        field: "dateCreated",
        sort: "asc",
        width: 150,
      },
      {
        label: "Asset Name",
        field: "assetName",
        sort: "asc",
        width: 150,
      },      
      {
        label: "Asset Type",
        field: "assetType",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 150
      }
    ],
    rows: processedUserSales
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">User Sales</CardTitle>
          <MDBDataTable responsive bordered data={data} />
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default UserSalesTable
