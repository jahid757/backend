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

import { get, post } from 'helpers/api_helper';

// Pages Components
import IpoTable from './IpoTable';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const ClientDeposits = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [ipos, setIpos] = useState([])
  const [availableDeposit, setAvailableDeposit] = useState([])

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("authUser"));

    get(`/ipos/all`).then(ipos => {
      setIpos(ipos)
    });

    get(`/deposits/${user.email}/availableDeposit`).then(data => setAvailableDeposit(data));

  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Example Group Ltd | Private Equity</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Client"}
            breadcrumbItem={"Private Equity"}
          />

          <Row>
            <Col lg="12">
              <IpoTable ipos={ipos} availableDeposit={availableDeposit} />
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientDeposits.propTypes = {}

export default ClientDeposits;
