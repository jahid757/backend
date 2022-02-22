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
import MiniWidget from './mini-widget';
import { useHistory } from 'react-router-dom';
import { get } from 'helpers/api_helper';
import { moneyFormatter } from 'helpers/utils';

import { AvForm, AvField } from "availity-reactstrap-validation";

// Pages Components
import ActiveFundsTable from "./ActiveFundsTable";
import CurrentPortfolio from './CurrentPortfolio';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const AvailableInvestments = props => {
  const [modal, setmodal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deposits, setDeposits] = useState([])
  const [viewWidth, setViewWidth] = useState(window.innerWidth)
  const [availableDeposit, setAvailableDeposit] = useState(0);
  const [trades, setTrades] = useState([])

  const history = useHistory();

  // Fetch all users on initial render
  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("authUser"));

    get(`/deposits/${user.email}/client`).then(deposits => {
      setDeposits(deposits);
    });

    get(`/deposits/${user.email}/availableDeposit`).then(data => setAvailableDeposit(data));

    get(`/trades/${user.email}/client`).then(trades => setTrades(trades))

  }, [])

  useEffect(() => {
    function handleResize() {
        setViewWidth(window.innerWidth)
    };

    window.addEventListener('resize', handleResize)
  })

  const reports = [
    { title: "Deposits", iconClass: "bx-copy-alt", value: availableDeposit },
    // { title: "Cold Store Wallet", iconClass: "bx-archive-in", value: 0.00 },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Mizuho Group Ltd | Transactions</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title={"Client"}
            breadcrumbItem={"My Account"}
          />

          <Row>
            <Col lg="12">
              <ActiveFundsTable title={"Available Investments"} deposits={deposits} availableDeposit={availableDeposit} />
            </Col>
          </Row>
         
        </Container>
      </div>
    </React.Fragment>
  )
}

AvailableInvestments.propTypes = { }

export default AvailableInvestments;
