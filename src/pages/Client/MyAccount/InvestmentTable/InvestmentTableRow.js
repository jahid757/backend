import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Badge, Button, Modal, Row, Col } from "reactstrap"
import { moneyFormatter } from 'helpers/utils';

import { AvForm, AvField } from "availity-reactstrap-validation";
import SweetAlert from "react-bootstrap-sweetalert"
import { post, get } from 'helpers/api_helper';
import { useHistory } from 'react-router-dom';

const InvestmentTableRow = ({ investment, key, hideSell, user }) => {
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const [success_msg, setsuccess_msg] = useState(false);

    console.log(investment);

    console.log(Number(investment.amount) == 0)

    const tog_backdrop = () => {
        setModal(!modal);
    }

    const handleModalValidSubmit = (e, v) => {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        console.log("Editing trade")

        console.log("Editing trade for: ", investment.name);
    
        const saleTrade = {
            id: investment.id,
            amount: investment.amount - v.amount,
            saleAmount: v.amount,
            client: investment.client,
            saleProfitLoss: 0,
            saleDate: new Date().toISOString().slice(0, 10),
            assetType: "Shares",
            assetName: investment.product,
            soldSharesNumber: 0,
            clientName: obj.firstName + " " + obj.lastName,
            clientNumber: obj.phoneNumber
        }

        setsuccess_msg(true);
    
        post("/trades/sale", saleTrade).then(res => {
          console.log(res);
          setsuccess_msg(true);
        })
      }


    return (
        <>
            <tr key={"_tr_" + key}>
                <td style={{ textAlign: 'center' }}>{investment.product}</td>
                <td style={{ textAlign: 'center' }}>{investment.dateCreated}</td>
                <td style={{ textAlign: 'center' }}>{moneyFormatter(investment.amount)}</td>
                <td style={{ textAlign: 'center' }}>{investment.maturityTerm}</td>
                <td style={{ textAlign: 'center' }}>{investment.payoutFreq}</td>
                <td style={{ textAlign: 'center' }}>{investment.annualReturn}</td>
                <td style={{ textAlign: 'center' }}>{investment.ISIN}</td>
                {!hideSell && (
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
                )}
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
                                    <p>Confirm that you intend to sell this portion of your bond allocation?</p>
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
                                                    max: { value: investment.amount, errorMessage: "Insufficient bond alloction to sell the requested amount." },
                                                    min: { value: 0, errorMessage: "Cannot sell into negative figures." },
                                                }}
                                                required
                                            />
                                        </div>
                                        <p style={{ color: "grey", fontSize: "12px", marginLeft: "10px", paddingTop: "5px" }}>{investment !== null && `Bond allocation available to sell: ${moneyFormatter(investment.amount)}`}</p>
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
                    history.push("/client-dashboard")
                }}
            >
                Your sale has been successful! You can see the changes reflected in your account summary.
            </SweetAlert>
        ) : null
      }
        </>
    );
}

export default InvestmentTableRow;