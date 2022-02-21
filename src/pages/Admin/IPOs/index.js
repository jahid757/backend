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
import IposTable from "./IposTable";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const ClientTransactions = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [ipos, setIpos] = useState([])

  // Fetch all users on initial render
  useEffect(async () => {
    get('/ipos/all').then(ipos => {
      setIpos(ipos)
      setLoading(false)
    })
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Example Group Ltd | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Admin"}
            breadcrumbItem={"Transactions"}
          />

          {/* PUT CONTENT HERE MATE */}
          <IposTable ipos={ipos} />

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientTransactions.propTypes = { }

export default ClientTransactions;
