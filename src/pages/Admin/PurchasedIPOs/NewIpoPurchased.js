import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Label,
} from "reactstrap"
import { useHistory } from "react-router-dom"
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import { post, get } from 'helpers/api_helper';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const PurchasedIpo = props => {
    const history = useHistory();
    const [purchasedIpo, setPurchasedIpo] = useState(null)

    const editPurchasedIpoId = props.match.params.id ? props.match.params.id : null;
    console.log("Props in NewIpo: ", editPurchasedIpoId);

    const handleValidSubmit = (event, value) => {
        console.log(value);
        event.preventDefault();
        if (editPurchasedIpoId !== null) {
            console.log("Updating IPO!")

            const updatedPurchasedIPO = {
                ...purchasedIpo,
                ...value,
                status: value.status == "Active" ? true : false
            }

            console.log(updatedPurchasedIPO);

            post("/userShares/update", updatedPurchasedIPO).then(response => {
                history.push("/admin-purchased-ipos")
            })

        } else {
            console.log("Creating IPO")

            const newPurchasedIPO = {
                ...value,
                sharePurchasePrice: value.sharePrice,
                status: value.status == "Active" ? true : false
            }

            console.log(newPurchasedIPO);

            post('/userShares/create', newPurchasedIPO).then((res) => {
                history.push('/admin-purchased-ipos');
            })
        }
    }

    const handleDelete = () => {
        console.log("Delete trade...");
        post('/userShares/delete', { id: purchasedIpo.id })
            .then(res => {
                console.log(res);
                history.push('/admin-purchased-ipos');
            })
    }

    // Fetch deposit if relevant
    useEffect(async () => {
        if (editPurchasedIpoId !== null) {
            get(`/userShares/${editPurchasedIpoId}/trade`).then(purchasedIpo => {
                setPurchasedIpo(purchasedIpo[0])
                console.log(purchasedIpo[0])
            })
        }
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Admin IPO Purchases | Mizuho Group Ltd</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Admin"}
                        breadcrumbItem={"Add New IPO"}
                    />

                    <Card>
                        <CardBody>
                            <AvForm
                                className="form-horizontal"
                                onValidSubmit={(e, v) => {
                                    handleValidSubmit(e, v)
                                }}
                            >
                                <div className="form-group">
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Company"
                                                    className="form-control"
                                                    name="company"
                                                    id="company"
                                                    value={purchasedIpo && purchasedIpo.company}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Client"
                                                    className="form-control"
                                                    name="client"
                                                    id="client"
                                                    disabled={purchasedIpo && purchasedIpo.client}
                                                    value={purchasedIpo && purchasedIpo.client}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Symbol"
                                                    className="form-control"
                                                    name="symbol"
                                                    id="symbol"
                                                    value={purchasedIpo && purchasedIpo.symbol}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Capital Invested"
                                                    className="form-control"
                                                    name="amount"
                                                    id="amount"
                                                    value={purchasedIpo && purchasedIpo.amount}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="No. of Shares"
                                                    className="form-control"
                                                    name="sharesNumber"
                                                    value={purchasedIpo && purchasedIpo.sharesNumber}
                                                    id="sharesNumber"
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    label="Date of Purchase"
                                                    id="dateCreated"
                                                    name="dateCreated"
                                                    type="date"
                                                    value={purchasedIpo && purchasedIpo.dateCreated}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Share Price"
                                                    className="form-control"
                                                    name="sharePrice"
                                                    id="sharePrice"
                                                    value={purchasedIpo && purchasedIpo.sharePrice}
                                                    required
                                                    disabled={purchasedIpo && purchasedIpo.sharePrice}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Profit/Loss"
                                                    className="form-control"
                                                    name="profitLoss"
                                                    id="profitLoss"
                                                    value={purchasedIpo && purchasedIpo.profitLoss}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Locked Period"
                                                    className="form-control"
                                                    name="lockedPeriod"
                                                    id="lockedPeriod"
                                                    value={purchasedIpo && purchasedIpo.lockedPeriod}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="select"
                                                    label="Status"
                                                    className="form-control"
                                                    name="status"
                                                    id="statusField"
                                                    value={purchasedIpo ? (purchasedIpo.status == true ? "Active" : "Unavailable") : "Available"}
                                                    required
                                                >
                                                    <option>Active</option>
                                                    <option>Unavailable</option>
                                                </AvField>
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                                <div className="mt-4" style={{ textAlign: "right" }}>
                                    <Button type="submit" style={{ background: "black", border: "none" }}>
                                        Save Purchased IPO
                                    </Button>
                                    {purchasedIpo && (
                                        <Button onClick={() => handleDelete()} color="danger" style={{ marginLeft: '20px' }} >
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </AvForm>
                        </CardBody>
                    </Card>

                </Container>
            </div>
        </React.Fragment>
    )
}

PurchasedIpo.propTypes = {}

export default PurchasedIpo;
