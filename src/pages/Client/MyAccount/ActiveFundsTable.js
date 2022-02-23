import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Badge, Button, Modal, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import { random } from "lodash"
import { moneyFormatter } from "helpers/utils"
import { AvForm, AvField } from "availity-reactstrap-validation";
import SweetAlert from "react-bootstrap-sweetalert"

import { post, get } from 'helpers/api_helper';
import { useHistory } from 'react-router-dom';
import ActiveFundsTableRow from "./ActiveFundsTableRow";

const ActiveFundsTable = ({ title, availableDeposit, disablePurchase }) => {
  const [modal, setModal] = useState(false);
  const history = useHistory();
  const [success_msg, setsuccess_msg] = useState(false);
  const [products, setProducts] = useState([])

  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("authUser"));

    get('/products/all').then(products => {
      setProducts(products)
    });

  }, [])

  // PIPER TODO: badgeClass => status === "Approved" ? "success" : "warning"
  const tog_backdrop = () => {
    setModal(!modal);
  }

  const modalData = {
    title: "Make new investment",
    message: "Confirm using your deposited funds to make an investment into this fund.",
    closeModalFunc: () => {
      setModal(false);
      // Do the trade thing.

      history.push("/client-my-account");
    }
  }

  const handleModalValidSubmit = (e, v, product) => {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    console.log("Creating trade")

    const trade = {
      product: product.name,
      client: obj.email,
      dateCreated: new Date().toISOString().slice(0, 10),
      amount: v.amount,
      maturityTerm: product.maturityTerm,
      payoutFreq: product.payoutFreq,
      annualReturn: product.annualReturnRate,
      ISIN: product.ISIN
    }

    console.log(trade);

    post("/trades/create", trade).then(res => {
      console.log(res);
      setsuccess_msg(true);
    })
  }

  const activeFunds = [
    {
      logo: "https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Logo.png",
      fundName: "Bitcoin",
      leadManager: "LSE",
      fundsUnderManagement: "$242,400,000.00",
      history: "/client-fund-history"
    },
  ]

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">{title}</CardTitle>
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ textAlign: 'center' }}>Fixed-Yield Bonds</th>
                  <th style={{ textAlign: 'center' }}>Maturity Term</th>
                  <th style={{ textAlign: 'center' }}>Min. Investment</th>
                  <th style={{ textAlign: 'center' }}>Coupon Frequency</th>
                  <th style={{ textAlign: 'center' }}>APR</th>
                  <th style={{ textAlign: 'center' }}>ISIN</th>
                  {!disablePurchase ? <th style={{ textAlign: 'center' }}>Action</th> : null}
                  <th style={{ textAlign: 'center' }}>Avail.</th>
                </tr>
              </thead>
              <tbody>
                {products && products.map((product, key) => {
                  const badgeClass = "warning";

                  return (
                    <ActiveFundsTableRow product={product} availableDeposit={availableDeposit} disablePurchase={disablePurchase} />
                  )
                })}
                {activeFunds.length == 0 && (
                  <tr>
                    <p>No table entries.</p>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default ActiveFundsTable
