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
    Label,
} from "reactstrap"
import { Link } from "react-router-dom"
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import { get, post } from 'helpers/api_helper';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const NewUserSale = props => {
    const history = useHistory();
    const [clients, setClients] = useState([])
    const [userSale, setUserSale] = useState(null)
    const [approvingSale, setApprovingSale] = useState(false)

    const editUserSaleId = props.match.params.id ? props.match.params.id : null;
    console.log(editUserSaleId);

    const handleValidSubmit = (event, value) => {
        event.preventDefault();
        setApprovingSale(true);

        if (userSale !== null) {
            var updatedSale = {
                ...value,
                id: editUserSaleId
            }

            post("/userSales/update", updatedSale).then(response => {
                setApprovingSale(false);
                history.push("/admin-sales")
            })
            return;
        }

        console.log(value);
        post('/userSales/create', value).then((res) => {
            console.log(res);
            setApprovingSale(false);
            history.push('/admin-sales')
        })
    }

    const handleDelete = () => {
        console.log("Delete user sale...");
        console.log("Routing to homepage.")
        post('/userSales/delete', { id: userSale.id })
            .then(res => {
                console.log(res);
                history.push('/admin-sales');
            })
    }

    useEffect(async () => {
        get('users/allClients').then(clients => setClients(clients));
    }, [])

    // Fetch sale if an update.
    useEffect(async () => {
        if (editUserSaleId !== null) {
            get(`/userSales/${editUserSaleId}/userSale`).then(userSales => {
                setUserSale(userSales[0])
                console.log(userSales[0])
            })
        }
    }, [])

    let clientsValue = clients.length > 0 ? clients[0].email : "";

    if (editUserSaleId && userSale) clientsValue = userSale.client;

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Mizuho Group Ltd | Admin Sales</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Admin"}
                        breadcrumbItem={"Add New Sale"}
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
                                                    label="Amount"
                                                    className="form-control"
                                                    name="amount"
                                                    id="amount"
                                                    value={userSale && userSale.amount}
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
                                                    label="Profit/Loss"
                                                    className="form-control"
                                                    name="profitLoss"
                                                    id="profitLoss"
                                                    value={userSale && userSale.profitLoss}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                            <AvField
                                                    type="text"
                                                    label="Shares Number"
                                                    className="form-control"
                                                    name="sharesNumber"
                                                    id="sharesNumber"
                                                    value={userSale && userSale.sharesNumber}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                    <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Asset Name"
                                                    className="form-control"
                                                    name="assetName"
                                                    id="assetName"
                                                    value={userSale && userSale.assetName}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Asset Type"
                                                    className="form-control"
                                                    name="assetType"
                                                    id="assetType"
                                                    value={userSale && userSale.assetType}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvGroup>
                                                    <Label for="dateCreated">Date</Label>
                                                    <AvInput name="dateCreated" id="dateCreated" type="date" value={userSale && userSale.dateCreated} />
                                                </AvGroup>
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                                <div style={{ display: 'flex', justifyContent: "space-between", "marginTop": "10px" }}>
                                        <div>
                                            <Button type="submit" style={{ marginRight: "20px", background: 'black', color: "white", border: "none" }}>
                                                {userSale ? "Update user sale" : "Save user sale"}
                                            </Button>
                                            {userSale && (
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

export default NewUserSale;
