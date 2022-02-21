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

// Pages Components
import TransactionTable from "./TransactionTable";

import { get, post } from 'helpers/api_helper';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const NewDeposit = props => {
    const history = useHistory();
    const [loading, setLoading] = useState(true)
    const [clients, setClients] = useState([])
    const [deposit, setDeposit] = useState(null)
    const [approveDepositLoading, setApproveDepositLoading] = useState(false)

    const editDepositId = props.match.params.id ? props.match.params.id : null;
    console.log(editDepositId);

    const handleValidSubmit = (event, value) => {
        if (deposit !== null) {
            var updatedDeposit = {
                ...value,
                id: editDepositId
            }

            post("/deposits/update", updatedDeposit).then(response => {
                history.push("/admin-deposits")
            })
            return;
        }

        event.preventDefault();
        console.log(value);
        post('/deposits/create', value).then((res) => {
            console.log(res);
            history.push('/admin-deposits')
        })
    }

    const handleDelete = () => {
        console.log("Delete deposit...");
        console.log("Routing to homepage.")
        post('/deposits/delete', { id: deposit.id })
            .then(res => {
                console.log(res);
                history.push('/admin-deposits');
            })
    }

    const approveDeposit = () => {
        setApproveDepositLoading(true);

        const update = {
            status: "Successful",
            id: deposit.id,
            client: deposit.client
        }

        console.log(deposit.id)

        post("/deposits/approve", update).then(response => {
            setApproveDepositLoading(false);
            history.push("/admin-deposits")
        })
    }

    useEffect(async () => {
        get('users/allClients').then(clients => setClients(clients));
    }, [])

    // Fetch deposit if relevant
    useEffect(async () => {
        if (editDepositId !== null) {
            get(`/deposits/${editDepositId}/deposit`).then(deposit => {
                setDeposit(deposit[0])
                console.log(deposit[0])
            })
        }
    }, [])

    let clientsValue = clients.length > 0 ? clients[0].email : "";

    if (editDepositId && deposit) clientsValue = deposit.client;

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Example Group Ltd | Admin Deposits</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Admin"}
                        breadcrumbItem={"Add New Deposit"}
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
                                                <AvField type="select" name="currency" label="Currency" value="GBP" required>
                                                    <option>GBP</option>
                                                    <option>EUR</option>
                                                    <option>USD</option>
                                                    <option>AUD</option>
                                                    <option>YEN</option>
                                                    <option>BTC</option>
                                                    <option>USDT</option>
                                                </AvField>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Amount"
                                                    className="form-control"
                                                    name="amount"
                                                    id="amount"
                                                    value={deposit && deposit.amount}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvGroup>
                                                    <Label for="dateCreated">Date</Label>
                                                    <AvInput name="dateCreated" id="dateCreated" type="date" value={deposit && deposit.dateCreated} />
                                                </AvGroup>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField type="select" name="status" label="Status" required id="Someting else" value={deposit ? deposit.status : "Successful"}>
                                                    <option>Successful</option>
                                                    <option>Pending</option>
                                                </AvField>
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                                <div style={{ display: 'flex', justifyContent: "space-between", "marginTop": "10px" }}>
                                        <div>
                                            {deposit && deposit.status == "Pending" && (
                                                <Button
                                                    style={{ marginRight: "20px", background: 'black', color: "white", border: "none" }}
                                                    onClick={approveDeposit}
                                                    disabled={approveDepositLoading}
                                                    // PUT UPDATE DEPOSIT HERE
                                                >
                                                    Approve Deposit
                                                    {approveDepositLoading && <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>}
                                                </Button>
                                            )}
                                        </div>
                                        <div>
                                            <Button type="submit" style={{ marginRight: "20px", background: 'black', color: "white", border: "none" }}>
                                            {deposit ? "Update deposit" : "Save deposit"}
                                            </Button>
                                            {deposit && (
                                                <Button onClick={() => handleDelete()} color="danger" style={{ marginLeft: '20px' }} >
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                            </AvForm>
                        </CardBody>
                    </Card>

                </Container>
            </div>
        </React.Fragment>
    )
}

NewDeposit.propTypes = {}

export default NewDeposit;
