import PropTypes from 'prop-types'
import axios from 'axios';
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"

import { get } from 'helpers/api_helper';

// Pages Components
import UserSalesTable from "./UserSalesTable";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const ClientTransactions = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [userSales, setUserSales] = useState([])

  useEffect(async () => {
    get('/userSales/all').then((data) => {
      console.log("Data in new userSales: ", data);
      setUserSales(data)
    })
  }, [])

  const mockUserSales = [
    {
      id: 1,
      amount: 10000,
      client: "quincy.adams@somewhere.com",
      profitLoss: 100,
      assetType: "Bonds",
      assetName: "BARCLAYS PLC",
      dateCreated: '16-05-2021'
    },
    {
      id: 2,
      amount: 20000,
      client: "quincy.adams@somewhere.com",
      profitLoss: 2500,
      assetType: "Shares",
      assetName: "Robinhood",
      dateCreated: '18-05-2021'
    },
    {
      id: 3,
      amount: 30000,
      client: "quincy.adams@somewhere.com",
      profitLoss: 1000,
      assetType: "Shares",
      assetName: "Deliveroo",
      dateCreated: '20-05-2021'
    }
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Example Group Ltd | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title={"Admin"}
            breadcrumbItem={"User Sales"}
          />
            <UserSalesTable userSales={userSales} />
        </Container>
      </div>
    </React.Fragment>
  )
}

ClientTransactions.propTypes = { }

export default ClientTransactions;
