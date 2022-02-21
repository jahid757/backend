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
    Label,
} from "reactstrap"
import { useHistory } from "react-router-dom"
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import { get, post } from 'helpers/api_helper';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { useStore } from 'react-redux';

const NewTrade = props => {
    const [clients, setClients] = useState([])
    const [products, setProducts] = useState([])
    const [availableDeposit, setAvailableDeposit] = useState(null)
    const [trade, setTrade] = useState(null)
    const history = useHistory();

    const editTradeId = props.match.params.id ? props.match.params.id : null;

    const handleValidSubmit = (event, value) => {
        event.preventDefault();
        if (editTradeId !== null) {
            console.log("Updating trade!")

            const updatedTrade = {
                ...value,
                id: editTradeId
            }
            post("/trades/update", updatedTrade).then(response => {
                history.push("/admin-trades")
            })

        } else {
            console.log("Creating trade")

            post("/trades/create", value).then(res => {
                console.log(res);
                history.push("/admin-trades")
            })
        }
    }

    const onClientChange = (event, value) => {
        get(`/deposits/${value}/availableDeposit`).then(data => setAvailableDeposit(data))
    }

    const handleDelete = () => {
        console.log("Delete trade...");
        post('/trades/delete', { id: trade.id })
            .then(res => {
                console.log(res);
                history.push('/admin-trades');
            })
    }

    // Fetch all users on initial render
    useEffect(async () => {
        get('/users/allClients').then(clients => setClients(clients));
        get('/products/all').then(products => setProducts(products));
    }, [])

    // Fetch trade if relevant
    useEffect(async () => {
        if (editTradeId !== null) {
            get(`/trades/${editTradeId}/trade`).then(trade => {
                setTrade(trade[0])
                console.log(trade[0])
            })
        }
    }, [])

    let clientsValue = clients.length > 0 ? clients[0].email : "";
    let productValue = products.length > 0 ? products[0].name : "";
    let maturityTermValue = null;
    let payoutFreqValue = null;

    if (editTradeId && trade) {
        clientsValue = trade.client;
        productValue = trade.product;
        maturityTermValue = trade.maturityTerm;
        payoutFreqValue = trade.payoutFreq;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Example Group Ltd | Admin Trades</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Admin"}
                        breadcrumbItem={"Add New Investment"}
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
                                                    type="select"
                                                    name="client"
                                                    value={clientsValue}
                                                    label="Client"
                                                    required
                                                    onChange={onClientChange}
                                                >
                                                    {clients.map(client => {
                                                        return <option>{client.email}</option>
                                                    })}
                                                </AvField>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField type="select" name="product" value={productValue} label="Product" required>
                                                    {products.map(product => {
                                                        return <option>{product.name}</option>
                                                    })}
                                                </AvField>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField type="select" name="maturityTerm" label="Term" value={maturityTermValue || "1 Year"} required>
                                                    <option>1 Year</option>
                                                    <option>2 Year</option>
                                                    <option>3 Year</option>
                                                    <option>4 Year</option>
                                                    <option>5 Year</option>
                                                    <option>6 Year</option>
                                                    <option>7 Year</option>
                                                    <option>8 Year</option>
                                                    <option>9 Year</option>
                                                    <option>10 Year</option>
                                                </AvField>
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Amount"
                                                    className="form-control"
                                                    name="amount"
                                                    id="amount"
                                                    value={trade && trade.amount}
                                                    required
                                                />
                                                <p style={{ color: "grey", fontSize: "12px", marginLeft: "10px", paddingTop: "5px" }}>{availableDeposit !== null && `Deposit available to invest: $${availableDeposit}`}</p>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField type="select" name="payoutFreq" label="Payout Frequency" value={payoutFreqValue || "Annually"} required>
                                                    <option>Annually</option>
                                                    <option>Semesterly</option>
                                                    <option>Quarterly</option>
                                                </AvField>
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvGroup>
                                                    <Label for="date">Date</Label>
                                                    <AvInput name="dateCreated" id="dateCreated" type="date" value={trade && trade.dateCreated} />
                                                </AvGroup>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvGroup>
                                                    <Label for="date">Maturity Date</Label>
                                                    <AvInput name="maturityDate" id="maturityDate" type="date" value={trade && trade.maturityDate} />
                                                </AvGroup>
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Annual Rate of Return %"
                                                    className="form-control"
                                                    name="annualReturn"
                                                    id="annualReturn"
                                                    value={trade && trade.annualReturn}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                                <div className="mt-4" style={{ textAlign: "right" }}>
                                    <Button type="submit" style={{ background: "black", border: "none" }}>
                                        Save Trade
                                    </Button>
                                    {trade && (
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

NewTrade.propTypes = {}

export default NewTrade;
