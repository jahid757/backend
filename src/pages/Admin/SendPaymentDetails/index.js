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
import PaymentDetailsTable from './PaymentDetailsTable';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const ClientTransactions = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [sentPaymentDetails, setSentPaymentDetails] = useState([])

  // Fetch all users on initial render
  useEffect(async () => {
    get('/sentPaymentDetails/all').then((paymentDetails) => setSentPaymentDetails(paymentDetails))
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Example Group Ltd | Admin Send Payment Details</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Admin"}
            breadcrumbItem={"Sent Payment Details"}
          />

            <PaymentDetailsTable sentPaymentDetails={sentPaymentDetails} />

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientTransactions.propTypes = { }

export default ClientTransactions;
