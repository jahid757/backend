import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Badge, Button, Modal, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import { moneyFormatter, moneyNoFormat } from "helpers/utils"
import { AvForm, AvField } from "availity-reactstrap-validation";
import SweetAlert from "react-bootstrap-sweetalert"

import { post, get } from 'helpers/api_helper';
import { useHistory } from 'react-router-dom';

const IpoTableRow = ({ ipo, availableDeposit, key }) => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [success_msg, setsuccess_msg] = useState(false);
    const [sharesNumber, setSharesNumber] = useState(0);
    const [termsandconditions, setTermsandconditions] = useState(false);

    const handleModalValidSubmit = (e, v, ipo) => {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        console.log("Creating user share allocation for: ", ipo.company);
    
        const userShare = {
            company: ipo.company,
            shareId: ipo.id,
            client: obj.email,
            dateCreated: new Date().toISOString().slice(0, 10),
            symbol: ipo.symbol,
            amount: sharesNumber * ipo.price,
            sharesNumber: sharesNumber,
            sharePrice: ipo.price,
            profitLoss: 0,
            lockedPeriod: 0,
            status: true,
            shareId: ipo.id,
            logo: ipo.logo
        }
    
        console.log(userShare);
    
        post("/userShares/create", userShare).then(res => {
          console.log(res);
          setsuccess_msg(true);
        })
    }

    const tog_backdrop = () => {
        setModal(!modal);
    }

    const toggleTermsandconditions = () => {
        setTermsandconditions(!termsandconditions);
    }

    return (
        <>
            <tr key={"_tr_" + key}>
                <td style={{ textAlign: "center" }}><img src={ipo.logo} alt="L" width={60} /></td>
                <td style={{ textAlign: "center" }}>{ipo.company}</td>
                <td style={{ textAlign: "center" }}>{ipo.symbol}</td>
                <td style={{ textAlign: "center" }}>{ipo.manager}</td>
                <td style={{ textAlign: "center" }}>{moneyNoFormat(ipo.totalShares)}</td>
                <td style={{ textAlign: "center" }}>{ipo.listingRange}</td>
                <td style={{ textAlign: "center" }}>{ipo.valuation}</td>
                <td style={{ textAlign: "center" }}>{ipo.expectedToTrade}</td>
                <td style={{ textAlign: "center" }}>{moneyFormatter(ipo.price)}</td>
                <td style={{ textAlign: 'center' }}>
                    <Button onClick={() => setModal(true)} style={{ backgroundColor: ipo.available ?  "#03c04a" : "#B22222", border: "none" }} disabled={!ipo.available}>
                        {ipo.available ? "BUY" : "LISTED"}
                    </Button>
                </td>
                <td style={{ textAlign: "center" }}><a href={ipo.prospectus} target="_blank" >Download</a></td>
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
                                handleModalValidSubmit(e, v, ipo)
                            }}
                        >
                            <div className="form-group">
                                <Row>
                                    <p>Confirm that you intend to allocate funds from your current balance to invest in {ipo.company}?</p>
                                </Row>

                                <Row>
                                    <Col lg={12}>
                                        <div className="mb-3">
                                            <AvField
                                                type="number"
                                                label="Number of Shares"
                                                className="form-control"
                                                name="sharesNumber"
                                                id="sharesNumber"
                                                value={sharesNumber}
                                                onChange={(e) => setSharesNumber(e.target.value)}
                                                validate={{
                                                    number: true,
                                                    max: { value: (availableDeposit / ipo.price), errorMessage: "Insufficient funds to invest the requested amount." },
                                                    min: { value: ipo.minimumShares, errorMessage: `Order doesn't satisfy minimum share amount: ${ipo.minimumShares} shares.` },
                                                }}
                                                required
                                            />
                                        </div>
                                        <p style={{ color: "grey", fontSize: "12px", marginLeft: "10px", paddingTop: "5px" }}>{availableDeposit !== null && `Deposit available to invest: ${moneyFormatter(availableDeposit)}`}</p>
                                        <p style={{ color: "grey", fontSize: "12px", marginLeft: "10px" }}>{`Cost of shares: ${moneyFormatter(sharesNumber * ipo.price)}`}</p>
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
                                            I agree to the Terms and Conditions.<Link to={'/documents/LSE-Equity-SPA.pdf'} target="_blank"><span style={{ color: 'blue' }}> Please click here to read.</span></Link>
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

export default IpoTableRow;