import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Label
} from "reactstrap"
import { Link } from "react-router-dom"
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import { get, post } from 'helpers/api_helper';

import SweetAlert from "react-bootstrap-sweetalert";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const NewClient = props => {
    const [loading, setLoading] = useState(true)
    const [client, setClient] = useState(null)
    const [success_msg, setsuccess_msg] = useState(false)
    const [approve_success, setApprove_success] = useState(false)
    const [verified, setVerified] = useState(false)
    const history = useHistory()

    const editClientId = props.match.params.id ? props.match.params.id : null;

    var idFile = client && client.idFile ? "/documents/" + client.idFile : "/";
    var addressFile = client && client.addressFile ? "/documents/" + client.addressFile : "/";

    // IF EDIT CLIENT ID, DISABLE EMAIL.
    const handleValidSubmit = (event, values) => {
        console.log(values);

        if (editClientId !== null) {
            console.log("Updating user!")

            const updatedUser = {
                ...values,
                id: editClientId,
                idFile: client.idFile,
                addressFile: client.addressFile
            }
            post("/users/update", updatedUser).then(response => {
                history.push("/admin-clients")
            })

        } else {
            console.log("Creating user")
            const newUser = {
                ...values,
                isAdmin: false
            }

            post("/users/create", newUser).then(res => {
                history.push("/admin-clients")
            })
        }
    }

    const handleResetPassword = () => {
        console.log("reset password being triggered...")
        post('/users/resetPassword', { id: editClientId, password: 'reset123', email: client.email }).then((res) => {
            console.log("reset password returned...")
            setsuccess_msg(true);
        }, (err) => console.log(err))
    }

    const handleDelete = () => {
        console.log("Delete client details...");
        post('/users/delete', { id: editClientId })
            .then(res => {
                console.log(res);
                history.push('/admin-clients');
            })
    }

    const handleVerifyUser = () => {
        console.log("Verify client...");
        post('/users/verify', { id: editClientId, verified: true, email: client.email })
            .then(res => {
                console.log(res);
                setApprove_success(true)
                setVerified(true)
                setClient({
                    ...client,
                    verified: 1
                })
            })
    }

    // Fetch all users on initial render
    useEffect(async () => {
        if (editClientId !== null) {
            get(`/users/${editClientId}/user`).then(user => {
                setClient(user[0])
                setVerified(user[0].verified == 1)

                setLoading(false)
            })
        }

        setLoading(false)
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Mizuho Group Ltd | Admin Dashboard</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Admin"}
                        breadcrumbItem={"Client"}
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
                                                <AvField type="select" name="title" label="Title" placeholder="Placeholder" value={client && client.title}>
                                                    <option>--------</option>
                                                    <option>Mr</option>
                                                    <option>Mrs</option>
                                                    <option>Miss</option>
                                                </AvField>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="First Name"
                                                    className="form-control"
                                                    name="firstName"
                                                    id="firstName"
                                                    required
                                                    value={client && client.firstName}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Last Name"
                                                    className="form-control"
                                                    name="lastName"
                                                    id="lastName"
                                                    required
                                                    value={client && client.lastName}
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Phone Number"
                                                    className="form-control"
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    required
                                                    value={client && client.phoneNumber}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Email"
                                                    className="form-control"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    disabled={editClientId !== null}
                                                    value={client && client.email}
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="password"
                                                    label="Password"
                                                    className="form-control"
                                                    name="password"
                                                    id="password"
                                                    required
                                                    value={client && client.password}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Address"
                                                    className="form-control"
                                                    name="address"
                                                    id="address"
                                                    value={client && client.address}
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Postcode"
                                                    className="form-control"
                                                    name="postcode"
                                                    id="postcode"
                                                    value={client && client.postcode}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                {editClientId !== null && <p>Identity proof is:  <span><Link to={`${idFile}`} target="_blank">{idFile}</Link></span>. Add below to change:</p>}
                                                <AvGroup>
                                                    <Label for="idFile">Identity Proof</Label>
                                                    <AvField name="idFile" id="idFile" type="file" />
                                                </AvGroup>
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                {editClientId !== null && <p>Address proof is:  <span><Link to={`${addressFile}`} target="_blank">{addressFile}</Link></span>. Add below to change:</p>}
                                                <AvGroup>
                                                    <Label for="addressFile">Address Proof</Label>
                                                    <AvField name="addressFile" id="addressFile" type="file" />
                                                </AvGroup>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField type="select" name="verified" label="Status" placeholder="Approved" value={client && client.verified} onChange={(e) => console.log(e.target.value)}>
                                                    <option value={1}>Approved</option>
                                                    <option value={0}>Pending</option>
                                                </AvField>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Account Number"
                                                    className="form-control"
                                                    name="accountNumber"
                                                    id="accountNumber"
                                                    value={client && client.accountNumber}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                                <div className="mt-4">
                                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                        <div>
                                            {editClientId && (
                                                <>
                                                    <Button
                                                        style={{ marginRight: "20px", background: 'black', color: "white", border: "none" }}
                                                        onClick={handleResetPassword}
                                                    >
                                                        Reset Password
                                                    </Button>
                                                   {!verified && (
                                                        <Button
                                                        style={{ marginRight: "20px", background: 'black', color: "white", border: "none" }}
                                                        onClick={handleVerifyUser}
                                                    >
                                                        Approve User
                                                    </Button>
                                                   )}
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <Button type="submit" style={{ marginRight: "20px", background: 'black', color: "white", border: "none" }}>
                                                Save Client
                                            </Button>
                                            {editClientId && (
                                                <Button onClick={() => handleDelete()} color="danger" style={{ marginLeft: '20px' }} >
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </AvForm>
                        </CardBody>
                    </Card>

                </Container>
            </div>

            {success_msg ? (
                <SweetAlert
                    title="Successful!"
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => {
                        setsuccess_msg(false)
                    }}
                >
                    Reset password email has been sent. Password is: reset123
                </SweetAlert>
            ) : null}

            {approve_success ? (
                <SweetAlert
                    title="Successful!"
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => {
                        setApprove_success(false)
                    }}
                >
                    User has been approved. They will recieve an email confirming this shortly.
                </SweetAlert>
            ) : null}
        </React.Fragment>
    )
}

NewClient.propTypes = {}

export default NewClient;
