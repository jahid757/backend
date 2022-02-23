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
import ClientsTable from "./ClientsTable";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const ClientTransactions = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [clients, setClients] = useState([])

  // Fetch all users on initial render
  useEffect(() => {
    get("/users/allClients")
      .then(clients => {
        setClients(clients)
      })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Mizuho Group Ltd | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Admin"}
            breadcrumbItem={"Clients"}
          />

          {/* PUT CONTENT HERE MATE */}
          <ClientsTable clients={clients} />

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientTransactions.propTypes = { }

export default ClientTransactions;
