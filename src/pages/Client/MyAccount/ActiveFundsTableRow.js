import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Badge, Button, Modal, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import { random } from "lodash"
import { moneyFormatter } from "helpers/utils"
import { AvForm, AvField } from "availity-reactstrap-validation";
import SweetAlert from "react-bootstrap-sweetalert"

import { post, get } from 'helpers/api_helper';
import { useHistory } from 'react-router-dom';

const ActiveFundsTableRow = ({ product, availableDeposit, disablePurchase }) => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [success_msg, setsuccess_msg] = useState(false);
    const [termsandconditions, setTermsandconditions] = useState(false);

    const handleModalValidSubmit = (e, v, product) => {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        console.log("Creating trade")

        console.log("Creating trade for: ", product.name);
    
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

    const badgeClass = "warning";

    const toggleTermsandconditions = () => {
        setTermsandconditions(!termsandconditions);
    }

    const tog_backdrop = () => {
        setModal(!modal);
      }

    const name = product.productLink ? <a style={{ color: "blue" }} href={product.productLink} target="_blank" >{product.name}</a> : product.name;

    return (
        <>
            <tr key={"_tr_" + product.name}>
                <td style={{ textAlign: 'center' }}>{name}</td>
                <td style={{ textAlign: 'center' }}>{product.maturityTerm}</td>
                <td style={{ textAlign: 'center' }}>{moneyFormatter(product.minimumInvestment)}</td>
                <td style={{ textAlign: 'center' }}>{product.payoutFreq}</td>
                <td style={{ textAlign: 'center' }}>{product.annualReturnRate}</td>
                <td style={{ textAlign: 'center' }}>{product.ISIN}</td>
                {!disablePurchase ? (
                    <td style={{ textAlign: 'center' }}>
                        <Button onClick={() => setModal(true)} style={{ backgroundColor: product.available ?  "#03c04a" : "#B22222", border: "none" }} disabled={!product.available}>
                            {product.available ? "BUY" : "LISTED"}
                        </Button>
                    </td>
                ) : null}
                <td style={{ textAlign: 'center' }}>
                    <Badge
                        className={
                            "font-size-11 badge-soft-" + badgeClass
                        }
                        color={badgeClass}
                        style={{ backgroundColor: product.available ?  "#03c04a" : "#B22222", color: "white", padding: "10px" }}
                        pill
                    >
                        {product.available ? "AVAILABLE" : "UNAVAILABLE"}
                    </Badge>
                </td>
            </tr>
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
                                handleModalValidSubmit(e, v, product)
                            }}
                        >
                            {console.log(product)}
                            <div className="form-group">
                                <Row>
                                    <p>Confirm that you intend to allocate funds from your current balance to invest in {product.name}</p>
                                </Row>

                                <Row>
                                    <Col lg={12}>
                                        <div className="mb-3">
                                            <AvField
                                                type="text"
                                                label="Amount (GBP)"
                                                className="form-control"
                                                name="amount"
                                                id="amount"
                                                validate={{
                                                    number: true,
                                                    max: { value: availableDeposit, errorMessage: "Insufficient funds to invest the requested amount." },
                                                    min: { value: product.minimumInvestment, errorMessage: "Investment does not meet the minimum requirements." },
                                                }}
                                                required
                                            />
                                        </div>
                                        <p style={{ color: "grey", fontSize: "12px", marginLeft: "10px", paddingTop: "5px" }}>{availableDeposit !== null && `Deposit available to invest: ${moneyFormatter(availableDeposit)}`}</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="compoundInterest"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="compoundInterest"
                                        >
                                            Compound interest annually
                                        </label>
                                    </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                    <div className="form-check mb-3">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="defaultCheck1"
                                            onClick={toggleTermsandconditions}
                                            checked={termsandconditions}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="defaultCheck1"
                                        >
                                            I agree to the Terms and Conditions. <a href="/bond-terms-conditions" target="_blank" style={{ color: "blue" }}>Please click here to read.</a>
                                        </label>
                                    </div>
                                    </Col>
                                </Row>

                            </div>
                            <div className="mt-4" style={{ textAlign: "right" }}>
                                <Button type="submit" style={{ background: "#03c04a", border: "none" }} disabled={!termsandconditions}>
                                    Buy Now
                                </Button>
                                <Button style={{ background: "black", border: "none", marginLeft: "10px" }} onClick={() => setModal(false)}>
                                    Close
                                </Button>
                            </div>
                        </AvForm>
                    </CardBody>
                </Card>
            </Modal>
            {
            success_msg ? (
            <SweetAlert
                title="Successful!"
                success
                confirmBtnBsStyle="success"
                onConfirm={() => {
                    setsuccess_msg(false);
                    history.push("/client-my-account")
                }}
            >
                Your investment has been successful! You can see the changes reflected in your account summary.
            </SweetAlert>
        ) : null
      }
        </>
    )
}

export default ActiveFundsTableRow;