import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Modal,
  Media,
} from "reactstrap"
import { useHistory } from 'react-router-dom';
import { get } from 'helpers/api_helper';
import { moneyFormatter } from 'helpers/utils';

import { AvForm, AvField } from "availity-reactstrap-validation";

// Pages Components
import PrivateEquityTable from "./PrivateEquityTable/index";
import CurrentPortfolio from './CurrentPortfolio';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import InvestmentTable from './InvestmentTable/InvestmentTable';

const ClientTransactions = props => {
  const [modal, setmodal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [deposits, setDeposits] = useState([])
  const [viewWidth, setViewWidth] = useState(window.innerWidth)
  const [availableDeposit, setAvailableDeposit] = useState(0);
  const [trades, setTrades] = useState([])
  const [userShares, setUserShares] = useState([])
  const [totalSharesAmount, setTotalSharesAmount] = useState(0);
  const [totalTradesAmount, setTotalTradesAmount] = useState(0);
  const [totalInvestments, setTotalInvestments] = useState(0);

  const history = useHistory();

  // Fetch all users on initial render
  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("authUser"));

    get(`/deposits/${user.email}/client`).then(deposits => {
      setDeposits(deposits);
    });

    get(`/deposits/${user.email}/availableDeposit`).then(data => setAvailableDeposit(data));

    get(`/trades/${user.email}/client`).then(trades => {
      setTrades(trades);

      const totalTradesAmount = trades.reduce(function (acc, obj) {
          return acc + Number(obj.amount);
      }, 0);

      setTotalTradesAmount(totalTradesAmount);

      get(`/userShares/${user.email}/client`).then(userShares => {
        const totalSharesAmount = userShares.reduce(function (acc, obj) {
          return acc + Number(obj.amount) + Number(obj.profitLoss);
        }, 0);

        setUserShares(userShares);

        setTotalSharesAmount(totalSharesAmount);

        setTotalInvestments(Number(totalTradesAmount) + Number(totalSharesAmount));
      })
    })

  }, [])

  const tog_backdrop = () => {
    setModal(!modal);
  }

  const modalData = {
    title: "Make new investment",
    message: `Confirm using your deposited funds to make an investment into this fund. Invest £10,000 from deposits into Bitcoin Fund.`,
    closeModalFunc: () => {
        setModal(false);
        // Do the trade thing.
        history.push("/client-my-account");
    }
}

  useEffect(() => {
    function handleResize() {
        setViewWidth(window.innerWidth)
    };

    window.addEventListener('resize', handleResize)
  })

  let reports = [
    { title: "Balance", iconClass: "bx-copy-alt", value: availableDeposit },
    { title: "Total Bond Investment", iconClass: "bx-archive-in", value: totalTradesAmount },
    { title: "Total Private Equity", iconClass: "bx-archive-in", value: totalSharesAmount },
  ]

  // if (userShares && userShares.length > 0) {
  //   reports = [
  //     { title: "Balance", iconClass: "bx-copy-alt", value: availableDeposit },
  //     { title: "Total Bond Investment", iconClass: "bx-archive-in", value: totalTradesAmount },
  //     { title: "Total Private Equity", iconClass: "bx-archive-in", value: totalSharesAmount },
  //   ]
  // }

  const smallTabSize = viewWidth < 575 && viewWidth > 420 ? 6 : 12;

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Example Group Ltd | Transactions</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs
            title={"Client"}
            breadcrumbItem={"My Account"}
          />

          {/* USER DEPOSIT BALANCE CARDS  */}
          <Row>
            <CurrentPortfolio width={viewWidth} totalInvestments={totalInvestments} />
            {reports.map((report, key) => (
              <Col lg={3} xl={3} md={6} sm={12} xs={12} key={"_col_" + key}>
                <Card className="mini-stats-wid">
                  <CardBody style={{ height: "143px"}}>
                    <Media style={{ height: "100%" }}>
                      <Media body style={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <p className="text-muted fw-medium" style={{ fontSize: viewWidth < 500 && viewWidth > 420 ? "14px" : "18px" }}>
                          {report.title}
                        </p>
                        <h4 className="mb-0">{moneyFormatter(report.value)}</h4>
                      </Media>
                      <div className="avatar-sm rounded-circle bg-light mini-stat-icon">
                        <span className="avatar-title rounded-circle bg-light">
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
              </Col>
            ))}
          </Row>
          {/* USER DEPOSIT BALANCE CARDS  */}

          <Row>
            <Col lg="12">
              <InvestmentTable trades={trades} />
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <PrivateEquityTable userShares={userShares} />
            </Col>
          </Row>

          <Modal
                isOpen={modal}
                toggle={() => {
                    tog_backdrop()
                }}
                scrollable={true}
                id="staticBackdrop"
            >
               <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleModalValidSubmit(e, v)
                }}
              >
                <div className="form-group">
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <AvField
                          type="password"
                          label="Old Password*"
                          className="form-control"
                          name="oldPassword"
                          id="oldPassword"
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                  <div style={{ color: "grey", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", fontSize: "12px" }}>
                    <p style={{ width: "90%", marginBottom: "3px" }}> &#8226; Your password can’t be too similar to your other personal information.</p>
                    <p style={{ width: "90%", marginBottom: "3px" }}> &#8226; Your password must contain at least 8 characters.</p>
                    <p style={{ width: "90%", marginBottom: "3px" }}> &#8226; Your password can’t be a commonly used password.</p>
                    <p style={{ width: "90%", marginBottom: "20px" }}> &#8226; Your password can’t be entirely numeric.</p>
                  </div>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <AvField
                          type="password"
                          label="New Password*"
                          className="form-control"
                          name="password"
                          id="password"
                          validate={{
                            minLength: { value: 8, errorMessage: 'Your password must have over 8 characters.' },
                          }}
                          required
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <AvField
                          type="password"
                          label="New Password Confirmation*"
                          className="form-control"
                          name="passwordConfirmation"
                          id="passwordConfirmation"
                          validate={{
                            match: { value: 'password', errorMessage: "Doesn't match new password" },
                            minLength: { value: 8, errorMessage: 'Your password must have over 8 characters.' },
                          }}
                          required
                        />
                      </div>
                    </Col>
                  </Row>


                </div>
                <div className="mt-4" style={{ textAlign: "right" }}>
                  <Button type="submit" color="danger">
                    Change Password
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={modalData.closeModalFunc}>Close</button>
                </div>
            </Modal>
         
        </Container>
      </div>
    </React.Fragment>
  )
}

ClientTransactions.propTypes = { }

export default ClientTransactions;
