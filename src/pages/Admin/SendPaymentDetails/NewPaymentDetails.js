import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
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
import { Link } from "react-router-dom"
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import { post, get } from 'helpers/api_helper';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const NewTrade = props => {
    const [clients, setClients] = useState([])
    const [paymentDetail, setPaymentDetail] = useState(null)
    const history = useHistory();

    const handleValidSubmit = (event, value) => {
        event.preventDefault();
        console.log(value);
        post("/sentPaymentDetails/create", value).then(res => {
            console.log(res);
            history.push('/admin-send-payment-details');
        })
    }

    const editPaymentDetailsId = props.match.params.id ? props.match.params.id : null;

    // Fetch all users on initial render
    useEffect(async () => {
        // post("/sentPaymentDetails/create", )
        get('/users/allClients').then(clients => setClients(clients))
    }, [])

    // Fetch payment details if relevant
    useEffect(async () => {
        if (editPaymentDetailsId !== null) {
            get(`/sentPaymentDetails/${editPaymentDetailsId}/sentPaymentDetail`).then(sentPaymentDetail => {
                setPaymentDetail(sentPaymentDetail[0])
                console.log(sentPaymentDetail[0])
            })
        }
    }, [])

    const handleDelete = () => {
        console.log("Delete payment details...");
        post('/sentPaymentDetails/delete', { id: editPaymentDetailsId })
            .then(res => {
                console.log(res);
                history.push('/admin-send-payment-details');
            })
    }

    let clientsValue = clients.length > 0 ? clients[0].email : "";

    if (editPaymentDetailsId && paymentDetail) {
        clientsValue = paymentDetail.client;
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Mizuho Group Ltd | Admin Send Payment Details</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Admin"}
                        breadcrumbItem={"Send Payment Details"}
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
                                                <AvField type="select" name="client" value={clientsValue} label="Client" required>
                                                    {clients.map(client => {
                                                        return <option>{client.email}</option>
                                                    })}
                                                </AvField>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Amount*"
                                                    className="form-control"
                                                    name="amount"
                                                    id="amount"
                                                    value={paymentDetail && paymentDetail.amount}
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
                                                    label="Account name*"
                                                    className="form-control"
                                                    name="accountName"
                                                    id="accountName"
                                                    value={paymentDetail && paymentDetail.accountName}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Account number*"
                                                    className="form-control"
                                                    name="accountNumber"
                                                    id="accountNumber"
                                                    value={paymentDetail && paymentDetail.accountNumber}
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
                                                    label="Sort Code*"
                                                    className="form-control"
                                                    name="sortCode"
                                                    id="sortCode"
                                                    value={paymentDetail && paymentDetail.sortCode}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="IBAN"
                                                    className="form-control"
                                                    name="IBAN"
                                                    value={paymentDetail && paymentDetail.IBAN}
                                                    id="IBAN"
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="SWIFT"
                                                    className="form-control"
                                                    name="SWIFT"
                                                    value={paymentDetail && paymentDetail.SWIFT}
                                                    id="SWIFT"
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Reference"
                                                    className="form-control"
                                                    name="reference"
                                                    id="reference"
                                                    value={paymentDetail && paymentDetail.reference}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                                <div className="mt-4" style={{ textAlign: "right" }}>
                                    {!paymentDetail && (
                                        <Button type="submit" style={{ background: "black", border: "none" }}>
                                            Save Payment Details
                                        </Button>
                                    )}
                                    {paymentDetail && (
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
