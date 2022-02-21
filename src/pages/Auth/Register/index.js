import React, { useState } from "react"
import { connect } from "react-redux"
import MetaTags from 'react-meta-tags';
import { useHistory, withRouter, Link } from 'react-router-dom';
import { AvForm, AvField, AvGroup } from "availity-reactstrap-validation"
import SweetAlert from "react-bootstrap-sweetalert";
import { Row, Col, CardBody, Card, Container, Label, Button, Input, FormFeedback, Form, FormGroup } from "reactstrap"

import { post } from 'helpers/api_helper';

import { apiError } from 'store/actions';

// import images
import id from "assets/images/id.jpg"
import passport from "assets/images/passport.jpg"

import LseEquityWhite from 'assets/images/Platform_White_Register_Page_Logo.png';

const Register = props => {
    const [loading, setLoading] = useState(false);
    const [idFile, setIdFile] = useState(null);
    const [addressFile, setAddressFile] = useState(null);
    const [success_msg, setsuccess_msg] = useState(false);
    const [termsandconditions, setTermsandconditions] = useState(false);

    const [idInputInvalid, setIdInputInvalid] = useState(false);
    const [addressInputInvalid, setAddressInputInvalid] = useState(false);

    const history = useHistory();

    const toggleTermsandconditions = () => {
        setTermsandconditions(!termsandconditions);
    }

    const handleValidSubmit = (event, values) => {
        if (idFile === null || idInputInvalid === true || addressFile === null || addressInputInvalid === true) {
            if (idFile === null || idInputInvalid === true) {
                setIdInputInvalid(true)
            }

            if (addressFile === null || addressInputInvalid === true) {
                setAddressInputInvalid(true)
            }

            console.log("KYC wasn't uploaded!");
            return null;

        } else {
            // Send the data through in this case.
            console.log("Sending data through to the server!");
            setLoading(true);

            let idFileLocation = idFile.name;
            let addressFileLocation = addressFile.name;

            const addressData = new FormData();
            addressData.append('file', addressFile);

            fetch('/api/upload', {
                        method: 'POST',
                        body: addressData,
                    }).then((response) => {
                        response.json().then((body) => {
                            console.log(`${body.file}`);
                        });
                    });

            const idData = new FormData();
            idData.append('file', idFile);
    
            fetch('/api/upload', {
                        method: 'POST',
                        body: idData,
                    }).then((response) => {
                        response.json().then((body) => {
                            console.log(`${body.file}`);
                        });
                    });

            const allValues = {
                ...values,
                address: `${values.houseNo} ${values.street}`,
                idFile: idFileLocation,
                addressFile: addressFileLocation,
                password: "CKFJVIEN3827",
                isAdmin: false,
                verified: false
            }

            console.log(allValues)

            post('/users/create', allValues)
                .then((response) => {
                    console.log(response);
                    // If response has message "User already exists":
                    // Put a pop-up with either success or negative.
                    history.push("/login?registered=success");
                    setsuccess_msg(true)
                }, (err) => {
                    props.apiError(err)
                })
        }

    }

    const handleAddressChange = (event) => {
        console.log("Change in field: ", event.target.files[0]);
        const file = event.target.files[0];

        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "application/pdf") {
            setAddressInputInvalid(false);
            setAddressFile(file);
        } else {
            console.log("Invalid!")
            setAddressInputInvalid(true);
        }
    }

    const handleIdChange = (event) => {
        console.log("Change in field: ", event.target.files[0]);
        const file = event.target.files[0];

        if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "application/pdf") {
            setIdInputInvalid(false);
            setIdFile(file);
        } else {
            console.log("Invalid!")
            setIdInputInvalid(true);
        }
    }

    return (
        <React.Fragment>
            <MetaTags>
                <title>Register | Example Group</title>
            </MetaTags>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="bx bx-home h2" />
                </Link>
            </div>
            <div className="account-pages" style={{ background: "url(https://sastra.edu/Pradipta16/Background-Web.jpg)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={12} lg={12} xl={12}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px", marginBottom: "10px" }}>
                                <img src={LseEquityWhite} height={125} />
                            </div>
                            <Card className="overflow-hidden">
                                <CardBody className="pt-0" style={{ border: "1px solid lightgrey", borderBottom: "none" }}>
                                    <div className="p-2">
                                        <AvForm className="form-horizontal"
                                            onValidSubmit={(e, v) => {
                                                handleValidSubmit(e, v)
                                            }}
                                        >
                                            <Row>
                                                <Col lg={6}>
                                                    <div className="mb-3">
                                                        <h2 style={{ marginTop: "15px" }}>Register your account</h2>
                                                    </div>
                                                    <Row style={{ marginTop: "30px" }}>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <AvField type="select" name="title" label="Title">
                                                                    <option>------</option>
                                                                    <option>Mr</option>
                                                                    <option>Mrs</option>
                                                                    <option>Miss</option>
                                                                </AvField>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="firstName"
                                                                    label="First Name"
                                                                    className="form-control"
                                                                    placeholder="First name"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="lastName"
                                                                    label="Last Name"
                                                                    className="form-control"
                                                                    placeholder="Last name"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="email"
                                                                    label="Email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    type="email"
                                                                    required
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="phoneNumber"
                                                                    label="Telephone Number"
                                                                    className="form-control"
                                                                    placeholder="Telephone number"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="dob"
                                                                    label="Date Of Birth"
                                                                    className="form-control"
                                                                    type="date"
                                                                    placeholder="1970-01-01"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col sm={12} md={6} lg={6} xl={6}>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="houseNo"
                                                                    label="House Name/Number"
                                                                    className="form-control"
                                                                    placeholder="House Name/Number"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col sm={12} md={6} lg={6} xl={6}>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="street"
                                                                    label="Street"
                                                                    className="form-control"
                                                                    placeholder="Street"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col sm={12} md={6} lg={6} xl={6}>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="county"
                                                                    label="County / State"
                                                                    className="form-control"
                                                                    placeholder="County"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col sm={12} md={6} lg={6} xl={6}>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="city"
                                                                    label="City"
                                                                    className="form-control"
                                                                    placeholder="City"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "15px" }}>
                                                        <Col sm={12} md={6} lg={6} xl={6}>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="postcode"
                                                                    label="Postcode"
                                                                    className="form-control"
                                                                    placeholder="Postcode"
                                                                    type="text"
                                                                    required
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col sm={12} md={6} lg={6} xl={6}>
                                                            <div className="mb-3">
                                                                <AvField
                                                                    name="country"
                                                                    label="Country"
                                                                    className="form-control"
                                                                    placeholder="Country"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                </Col>
                                                <Col lg={6} style={{ padding: "20px", border: "1px dotted lightgrey", marginTop: "20px" }}>
                                                    <div>
                                                        <p style={{ lineHeight: "2" }}>
                                                            Please ensure that all four corners of the documents that you upload are shown and they are clear, legible copies. Documents that do not meet those requirements will be rejected and you will be required to resubmit your application.
                                                         </p>
                                                    </div>
                                                    <Row>

                                                        <Col style={{ textAlign: 'center' }}>
                                                            <img src={passport} width={70} style={{ margin: "20px 0px" }} />
                                                            <p style={{ fontSize: "16px", marginTop: "10px" }}>Identity Document</p>

                                                            <div className="mb-3">
                                                                <FormGroup>
                                                                    <Input invalid={idInputInvalid} className="form-control form-control-sm" type="file" id="idFile" name="idFile" onChange={handleIdChange} />
                                                                    <FormFeedback>
                                                                        Field is required.
                                                                    </FormFeedback>
                                                                </FormGroup>
                                                            </div>
                                                        </Col>



                                                        <Col style={{ textAlign: 'center' }}>
                                                            <img src={id} width={70} style={{ margin: "20px 0px" }} />
                                                            <p style={{ fontSize: "16px", marginTop: "10px" }}>Proof of Address</p>

                                                            <div className="mb-3">
                                                                <FormGroup>
                                                                    <Input invalid={addressInputInvalid} className="form-control form-control-sm" type="file" id="idFile" name="idFile" onChange={handleAddressChange} />
                                                                    <FormFeedback>
                                                                        Field is required.
                                                                    </FormFeedback>
                                                                </FormGroup>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <p style={{ marginBottom: "20px", marginTop: "20px" }}>&#8226; Proof Of Address: Bank statement or utility bill dated in the last 3 months.</p>
                                                    <p style={{ marginBottom: "0px" }}>&#8226; Identity Document: Passport or Driving licence.</p>
                                                    <div className="form-check mb-3 mt-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="compoundInterest"
                                                            checked={termsandconditions}
                                                            onClick={toggleTermsandconditions}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="compoundInterest"
                                                        >
                                                            I agree to terms and conditions from Example Group. <a target="_blank" href="/gdpr" style={{ color: "blue" }}>Read Here</a>
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>


                                            <div className="mt-5 d-grid justify-content-center">
                                                <button
                                                    className="btn btn-primary btn-block waves-effect waves-light"
                                                    type="submit"
                                                    style={{ minWidth: "200px" }}
                                                    disabled={!termsandconditions}
                                                >
                                                    Register
                                                    {loading && <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>}
                                                </button>
                                            </div>
                                        </AvForm>

                                    </div>
                                </CardBody>
                                <p style={{ textAlign: 'center' }}>
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="fw-medium text-primary"
                                    >
                                        {" "}
                                        Login
                                    </Link>{" "}
                                </p>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>© {new Date().getFullYear()} Example Group Ltd</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {success_msg ? (
                <SweetAlert
                    title="Successful!"
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => {
                        setsuccess_msg(false)
                        history.push("/login");
                    }}
                >
                    Password reset has been sent to email.
                </SweetAlert>
            ) : null}
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const { error } = state.Login
    return { error }
}

export default withRouter(
    connect(mapStateToProps, { apiError })(Register)
)