import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"
 
const ClientsTable = ({ clients }) => {
  const users = [
    {
      id: "1",
      firstName: "Pied",
      lastName: "Piper",
      phoneNumber: "07895098345",
      email: "pipedpiper@gmail.com",
      address: "123 Mulholland Drive",
      postcode: "SW1 1AL",
      accountNumber: "",
      actions: <Link to={`/admin-new-client/${1}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },
    {
      id: "2",
      firstName: "Bill",
      lastName: "Crosby",
      phoneNumber: "07895098345",
      email: "billcrosby2344@gmail.com",
      address: "123 Mulholland Drive",
      postcode: "SW1 1AL",
      accountNumber: "",
      actions: <Link to={`/admin-new-client/${2}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },{
      id: "3",
      firstName: "Patrick",
      lastName: "Howard",
      phoneNumber: "07895098345",
      email: "patrickhoward13123@gmail.com",
      address: "123 Mulholland Drive",
      postcode: "SW1 1AL",
      accountNumber: "",
      actions: <Link to={`/admin-new-client/${3}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },
  ]

  const processedClients = clients.map((client) => {
    const status = client.verified == true ? <Badge className={"font-size-11"} pill style={{ background : "#32CD32", padding: "5px" }} >{"success"}</Badge> :
    <Badge className={"font-size-11"} pill style={{ background: "#B22222", padding: "5px" }}>{"pending"}</Badge>;

    return {
      ...client,
      actions: <Link to={`/admin-new-client/${client.id}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>,
      status: status
    }
  })

  const data = {
    columns: [
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
        label: "Email",
        field: "email",
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
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 100
      }
    ],
    rows: processedClients
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
