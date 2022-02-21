import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"

import { moneyFormatter } from 'helpers/utils';

const ProductsTable = ({ products }) => {
  
  // PIPER TO DO = will need to parse the transactions and add in the button here.
  const productss = [
    {
      id: "1",
      name: "Vanguard High Yield Bond",
      minimumInvestment: 5000,
      maturityTerm: "1 Year",
      payoutFreq: "Annually",
      ISIN: 0,
      maturityDate: "05/03/2022",
      annualReturnRate: "3%",
      actions: <Link to={`/admin-new-product/${1}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },
    {
      id: "2",
      name: "Vanguard Fixed ISA",
      minimumInvestment: 10000,
      maturityTerm: "1 Year",
      payoutFreq: "Annually",
      ISIN: 0,
      maturityDate: "15/03/2022",
      annualReturnRate: "4%",
      actions: <Link to={`/admin-new-product/${2}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
    },
  ]

  const processedProducts = !products ? [] : products.map(product => {
    const available = product.available ? <Badge className={"font-size-11"} style={{ background : "#32CD32", padding: "5px" }} >{"available"}</Badge> :
    <Badge className={"font-size-11"} style={{ background : "#B22222", padding: "5px" }} >{"unavailable"}</Badge>;

    const name = product.productLink ? <a href={product.productLink} target="_blank" >{product.name}</a> : product.name;

    return {
      ...product,
      minimumInvestment: product.minimumInvestment ? moneyFormatter(product.minimumInvestment) : null,
      available: available,
      actions: <Link to={`/admin-new-product/${product.id}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>,
      name
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
        label: "Name",
        field: "name",
        sort: "asc",
        width: 200,
      },
      {
        label: "Minimum Investment",
        field: "minimumInvestment",
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
        label: "Payout Frequency",
        field: "payoutFreq",
        sort: "asc",
        width: 150,
      },
      {
        label: "ISIN",
        field: "ISIN",
        sort: "asc",
        width: 100,
      },
      {
        label: "Maturity Date",
        field: "maturityDate",
        sort: "asc",
        width: 100,
      },
      {
        label: "Annual Return Rate",
        field: "annualReturnRate",
        sort: "asc",
        width: 100,
      },
      {
        label: "Available",
        field: "available",
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
    rows: processedProducts
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Products</CardTitle>
          <MDBDataTable responsive bordered data={data} />
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ProductsTable;