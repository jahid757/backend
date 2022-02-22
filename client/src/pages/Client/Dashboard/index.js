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
import TransactionTable from "./TransactionTable";
import TickerTape from './TickerTape';
import MarketSummary from './MarketSummary';
import PrivateEquityTable from '../MyAccount/PrivateEquityTable';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

import { moneyFormatter } from 'helpers/utils';
import InvestmentTable from '../MyAccount/InvestmentTable/InvestmentTable';

const ClientDashboard = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [deposits, setDeposits] = useState([])
  const [trades, setTrades] = useState([])
  const [userShares, setUserShares] = useState([]);
  const [totalProfitLoss, setTotalProfitLoss] = useState([]);
  const [availableDeposit, setAvailableDeposit] = useState("0");
  const [totalInvestments, setTotalInvestments] = useState("0");
  const [hideOnSmall, setHiddenOnSmall] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 380) {
        setHiddenOnSmall(true)
      } else {
        setHiddenOnSmall(false)
      }
    }

    window.addEventListener('resize', handleResize)
  })

  // Fetch all users on initial render
  useEffect(async () => {
    // Pull email from localStorage.
    const user = JSON.parse(localStorage.getItem("authUser"));

    get(`/deposits/${user.email}/availableDeposit`).then(data => setAvailableDeposit(data))

    get(`/trades/${user.email}/client`).then(data => {
      setTrades(data);
      const totalInvestments = data.reduce(function (acc, obj) {
        return acc + obj.amount;
      }, 0);
      setTotalInvestments(totalInvestments)
    })

    get(`/deposits/${user.email}/client`).then(deposits => {
      setDeposits(deposits);
    });

    get(`/trades/${user.email}/client`).then(trades => {
      setTrades(trades);

      const totalTradesAmount = trades.reduce(function (acc, obj) {
          return acc + Number(obj.amount);
      }, 0);

      get(`/userShares/${user.email}/client`).then(userShares => {
        const totalSharesAmount = userShares.reduce(function (acc, obj) {
          return acc + Number(obj.amount) + Number(obj.profitLoss);
        }, 0);

        console.log(userShares);

        setUserShares(userShares);
        
        setTotalInvestments(Number(totalTradesAmount) + Number(totalSharesAmount));
        
      })
    })

  }, [])

  const balanceReport = { title: "Balance", iconClass: "bx-copy-alt", value: availableDeposit };
  const accountReport = { title: "Portfolio Balance", iconClass: "bx-archive-in", value: totalInvestments };

  const series1 = [
    { name: "BTC", data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] },
  ]
  const options1 = {
    chart: { sparkline: { enabled: !0 } },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#f1b44c"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [25, 100, 100, 100],
      },
    },
    tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Mizuho Group Ltd</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Client")}
            breadcrumbItem={props.t("Dashboard")}
          />

          <Row>
            <TickerTape />
          </Row>

          {/* RECENT DEPOSITS TABLE */}
          <Row>

            <Col lg="8">
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                {/* <Col lg={4} md="4" key={"_col_balance_report"}> */}
                <Card className="mini-stats-wid" style={{ width: "45%" }}>
                  <CardBody style={{ height: "155px" }}>
                    <Media>
                      <Media body>
                        <p className="text-muted fw-medium" style={{ fontSize: "18px" }}>
                          {balanceReport.title}
                        </p>
                        <h4 className="mb-0">{moneyFormatter(balanceReport.value)}</h4>
                      </Media>
                      <div className="avatar-sm rounded-circle bg-light align-self-center mini-stat-icon" style={{ visibility: hideOnSmall ? "hidden" : "visible" }}>
                        <span className="avatar-title rounded-circle bg-light">
                          <i
                            className={
                              "bx " + balanceReport.iconClass + " font-size-24"
                            }
                          ></i>
                        </span>
                      </div>
                    </Media>
                  </CardBody>
                </Card>
                {/* </Col> */}
                {/* <Col lg={4} md="4" key={"_col_account_report"}> */}
                <Card className="mini-stats-wid" style={{ width: "45%" }}>
                  <CardBody style={{ height: hideOnSmall ? "190px" : "155px" }}>
                    <Media>
                      <Media body>
                        <p className="text-muted fw-medium" style={{ fontSize: "16px" }}>
                          {accountReport.title}
                        </p>
                        <h4 className="mb-0">{moneyFormatter(accountReport.value)}</h4>
                      </Media>
                      <div className="avatar-sm rounded-circle bg-light align-self-center mini-stat-icon" style={{ visibility: hideOnSmall ? "hidden" : "visible" }}>
                        <span className="avatar-title rounded-circle bg-light">
                          <i
                            className={
                              "bx " + accountReport.iconClass + " font-size-24"
                            }
                          ></i>
                        </span>
                      </div>
                    </Media>
                  </CardBody>
                </Card>
                {/* </Col> */}
              </div>
              <InvestmentTable trades={trades} hideSell />
              <PrivateEquityTable userShares={userShares} />
              <TransactionTable title={"Latest Deposits / Withdrawals"} deposits={deposits} />
            </Col>
            <Col lg="4">
              <MarketSummary />
            </Col>
          </Row>
          {/* RECENT DEPOSITS TABLE */}

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientDashboard.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(ClientDashboard)
