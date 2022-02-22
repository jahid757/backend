import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Badge, Button, Modal, Row, Col } from "reactstrap"
import { moneyFormatter } from 'helpers/utils';

import { AvForm, AvField } from "availity-reactstrap-validation";
import SweetAlert from "react-bootstrap-sweetalert"
import { post, get } from 'helpers/api_helper';
import { useHistory } from 'react-router-dom';

const PrivateEquityTableRow = ({ userShare }) => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [sharesNumber, setSharesNumber] = useState(0);
    const [success_msg, setsuccess_msg] = useState(false);

    const tog_backdrop = () => {
        setModal(!modal);
    }

    const handleModalValidSubmit = (e, v) => {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        console.log("Creating userShare sale allocation for: something");

        var overallProfitLoss = parseFloat(userShare.profitLoss.replace(/$/g, ""));
        var profitLoss = (overallProfitLoss / userShare.sharesNumber) * v.sharesNumber
    
        const shareSale = {
            id: userShare.id,
            amount: (userShare.sharesNumber - v.sharesNumber) * userShare.sharePrice,
            sharesNumber: userShare.sharesNumber - v.sharesNumber,
            profitLoss: overallProfitLoss - profitLoss,
            saleProfitLoss: profitLoss,
            client: userShare.client,
            saleDate: new Date().toISOString().slice(0, 10),
            assetName: userShare.company,
            assetType: "Shares",
            saleAmount: (v.sharesNumber * userShare.sharePrice) + profitLoss,
            soldSharesNumber: v.sharesNumber 
        }

        setsuccess_msg(true);
    
        post("/userShares/sale", shareSale).then(res => {
          console.log(res);
          setsuccess_msg(true);
        })
    }


    return (
        <>
            <tr>
                <td style={{ textAlign: 'center' }}>{userShare.company}</td>
                <td style={{ textAlign: 'center' }}>{userShare.symbol}</td>
                <td style={{ textAlign: 'center' }}>{moneyFormatter(userShare.amount)}</td>
                <td style={{ textAlign: 'center' }}>{userShare.sharesNumber}</td>
                <td style={{ textAlign: 'center' }}>{moneyFormatter(userShare.sharePrice)}</td>
                <td style={{ textAlign: 'center' }}>{userShare.profitLoss ? moneyFormatter(userShare.profitLoss) : moneyFormatter(0)}</td>
                <td style={{ textAlign: 'center' }}>{`${userShare.lockedPeriod} days`}</td>
                <td style={{ textAlign: 'center' }}>{"Active"}</td>
                <td style={{ textAlign: 'center' }}>
                    <Button
                        type="button"
                        color="primary"
                        size="sm"
                        className="btn-rounded waves-effect waves-light"
                        style={{ background: "#B22222", border: "1px solid #B22222" }}
                        onClick={() => setModal(true)}
                    >
                        SELL
            </Button>
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
                                handleModalValidSubmit(e, v)
                            }}
                        >
                            <div className="form-group">
                                <Row>
                                    <p>Confirm that you intend to sell your shares in {userShare.company}?</p>
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
                                                    max: { value: userShare.sharesNumber, errorMessage: "Insufficient share amount to sell the requested amount." },
                                                    min: { value: 0, errorMessage: `Cannot sell negative amount of shares.` },
                                                }}
                                                required
                                            />
                                        </div>
                                        <p style={{ color: "grey", fontSize: "12px", marginLeft: "10px" }}>{`Value of shares: ${moneyFormatter(sharesNumber * userShare.sharePrice)}`}</p>
                                    </Col>
                                </Row>

                            </div>
                            <div className="mt-4" style={{ textAlign: "right" }}>
                                <Button type="submit" style={{ background: "#03c04a", border: "none" }} >
                                    Sell Now
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
                            setModal(false);
                            history.push("/client-dashboard")
                        }}
                    >
                        Your sale has been successful! You can see the changes reflected in your account summary.
                    </SweetAlert>
                ) : null
            }
        </>
    )
}

export default PrivateEquityTableRow;