import PropTypes from 'prop-types'
import axios from 'axios';
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Media,
} from "reactstrap"
import { Link } from "react-router-dom"

import { get, post } from 'helpers/api_helper';
import { moneyFormatter } from 'helpers/utils';

// Pages Components
import TransactionForm from './TransactionForm';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

const ClientNewDeposit = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [availableDeposit, setAvailableDeposit] = useState(0);

  const reports = [
    { title: "Balance", iconClass: "bx-copy-alt", description: availableDeposit },
  ]

  // Fetch all users on initial render
  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("authUser"));

    get(`/deposits/${user.email}/availableDeposit`).then(data => setAvailableDeposit(data))    

  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Mizuho Group Ltd | Request Deposit</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Client"}
            breadcrumbItem={"Request Deposit"}
          />

          {/* RECENT DEPOSITS TABLE */}
          <Row>
            <Col lg="7">
                <TransactionForm />
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
          {/* RECENT DEPOSITS TABLE */}

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientNewDeposit.propTypes = { }

export default ClientNewDeposit;
