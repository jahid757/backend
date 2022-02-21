import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"

const ClientsTable = ({ clients }) => {
  // PIPER - Use this datastructure in table?
  const users = [
    {
      id: "1",
      firstName: "Pied",
      lastName: "Piper",
      phoneNumber: "0789",
      address: "123 Mulholland Drive",
      postcode: "SW1 1AL",
      accountNumber: ""
    },
    {
      id: "2",
      firstName: "Bill",
      lastName: "Crosby",
      phoneNumber: "0789",
      address: "123 Mulholland Drive",
      postcode: "SW1 1AL",
      accountNumber: ""
    },{
      id: "3",
      firstName: "Patrick",
      lastName: "Howard",
      phoneNumber: "0789",
      address: "123 Mulholland Drive",
      postcode: "SW1 1AL",
      accountNumber: ""
    },
  ]

  const data = {
    columns: [
      {
        label: "Id",
        field: "id",
        sort: "asc",
        width: 100,
      },
      {
        label: "First Name",
        field: "firstName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Last Name",
        field: "lastName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Phone Number",
        field: "phoneNumber",
        sort: "asc",
        width: 200,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 150,
      },
      {
        label: "Postcode",
        field: "postcode",
        sort: "asc",
        width: 100,
      },
      {
        label: "Account Number",
        field: "accountNumber",
        sort: "asc",
        width: 100,
      },
    ],
    rows: clients
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Clients</CardTitle>
            <MDBDataTable responsive bordered data={data} />
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ClientsTable
