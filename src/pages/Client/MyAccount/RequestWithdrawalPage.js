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
import { moneyFormatter } from 'helpers/utils';

// Pages Components
import TransactionForm from './TransactionForm';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

const ClientNewWithdrawal = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [availableDeposit, setAvailableDeposit] = useState("0");

  useEffect(async () => {
    // Pull email from localStorage.
    const user = JSON.parse(localStorage.getItem("authUser"));

    get(`/deposits/${user.email}/availableDeposit`).then(data => setAvailableDeposit(data))

  }, [])

  const reports = [
    { title: "Available Deposit", iconClass: "bx-archive-in", description: availableDeposit },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Example Group Ltd | Request Withdrawal</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title={"Client"}
            breadcrumbItem={"Request Withdrawal"}
          />

          <Row>
            <Col lg="7">
                <TransactionForm withdrawal={true} availableDeposit={availableDeposit} />
            </Col>
            <Col md="5">
                {reports.map((report, key) => (
                    <Card className="mini-stats-wid">
                    <CardBody>
                        <Media>
                        <Media body>
                            <p className="text-muted fw-medium" style={{ fontSize: "18px" }}>
                            {report.title}
                            </p>
                            <h4 className="mb-0">{moneyFormatter(report.description)}</h4>
                        </Media>
                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                            <i
                                className={
                                "bx " + report.iconClass + " font-size-24"
                                }
                            ></i>
                            </span>
                        </div>
                        </Media>
                    </CardBody>
                    </Card>
                ))}
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientNewWithdrawal.propTypes = { }

export default ClientNewWithdrawal;
