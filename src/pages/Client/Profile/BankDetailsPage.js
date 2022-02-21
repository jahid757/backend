import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import {
    Container,
    Row,
    Col,
    Card,
    Alert,
    CardBody,
    Media,
    Button,
    Modal,
    Badge,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    FormGroup,
    Input,
    FormFeedback,
    Form,
    Label
} from "reactstrap"

import classnames from "classnames"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"
import SweetAlert from "react-bootstrap-sweetalert"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "components/Common/Breadcrumb"

// actions
import { editProfile, resetProfileFlag } from "store/actions"
import { post, get } from 'helpers/api_helper';

const BankDetails = props => {
    const [email, setemail] = useState("")
    const [modal_backdrop, setmodal_backdrop] = useState(false)
    const [success_msg, setsuccess_msg] = useState(false)
    const [user, setUser] = useState({})
    const [userDetails, setUserDetails] = useState({})
    const [updatedUserDetails, setUpdatedUserDetails] = useState({ currency: "USD" })
    const history = useHistory();
    const [activeTab, setActiveTab] = useState("1");
    const [smallScreen, setSmallScreen] = useState(window.innerWidth < 600)
    const [hadUserDetails, setHadUserDetails] = useState(false)
    const [verified, setVerified] = useState(true);

    // Account Detail state stuff.
    const [accountNameInvalid, setAccountNameInvalid] = useState(false);
    const [accountNumberInvalid, setAccountNumberInvalid] = useState(false);
    const [sortCodeInvalid, setSortCodeInvalid] = useState(false);

    console.log("User in bank detail page: ", user);

    window.addEventListener("resize", function () {
        if (window.innerWidth < 600) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    })

    useEffect(() => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"))
            if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
                setname(obj.displayName)
                setemail(obj.email)
                setidx(obj.uid)
            } else if (
                process.env.REACT_APP_DEFAULTAUTH === "fake" ||
                process.env.REACT_APP_DEFAULTAUTH === "jwt"
            ) {
                console.log("User object in bank details useEffect: ", obj);
                setUser(obj)
                setVerified(obj.verified == 1)
            }
            setTimeout(() => {
                props.resetProfileFlag();
            }, 3000);
        }


    }, [props.success])

    useEffect(async () => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"))
            get(`/users/userDetails/${obj.email}`).then(userDetails => {
                setUserDetails(userDetails[0])
                setUpdatedUserDetails(userDetails[0])

                if (userDetails[0] != null) {
                    setHadUserDetails(true)
                }

                console.log(userDetails[0])
            })
        }
    }, [])

    function handleValidSubmit(event, values) {
        const updatedUser = {
            ...values,
            id: user.id
        }

        console.log(updatedUser);
        post('/users/update', updatedUser).then(data => {
            get(`/users/${user.id}/user`).then(user => {
                console.log(user);
                localStorage.setItem("authUser", JSON.stringify(user[0]))
            })

            location.reload();
        })
    }

    function handleModalValidSubmit(event, values) {
        const password = {
            password: values.password,
            id: user.id
        };

        post('/users/update', password).then(data => {
            console.log(data)
            setmodal_backdrop(false)
            setsuccess_msg(true)
        })
    }

    const tog_backdrop = () => {
        setmodal_backdrop(!modal_backdrop);
    }

    const handleValidAccountDetailsSubmit = (e) => {
        e.preventDefault()
        if (updatedUserDetails.accountName == null || updatedUserDetails.accountNumber == null || updatedUserDetails.sortCode == null) {
            if (updatedUserDetails.accountName == null) setAccountNameInvalid(true)
            if (updatedUserDetails.accountNumber == null) setAccountNumberInvalid(true)
            if (updatedUserDetails.sortCode == null) setSortCodeInvalid(true)
        } else {
            console.log(updatedUserDetails);
            setAccountNumberInvalid(false)
            setAccountNameInvalid(false)
            setSortCodeInvalid(false)

            const updatedDetails = {
                ...updatedUserDetails,
                email: user.email
            }

            const endpoint = hadUserDetails ? "/users/userDetails/update" : "/users/userDetails/create";

            post(endpoint, updatedDetails).then(data => {
                location.reload();
            })
        }
    }

    const handleAccountDetailsChange = (accountInfo, value) => {
        setUpdatedUserDetails({
            ...updatedUserDetails,
            [accountInfo]: value
        })

        setUserDetails({
            ...userDetails,
            [accountInfo]: value
        })
    }

    const badgeClass = "warning";


    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Bank Details | Example Group Ltd</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumb title="Example Group" breadcrumbItem="Profile" />

                    <Row>
                        <Col lg="12">
                            {props.error && props.error ? (
                                <Alert color="danger">{props.error}</Alert>
                            ) : null}
                            {props.success ? (
                                <Alert color="success">{props.success}</Alert>
                            ) : null}

                            <Card>
                                <CardBody>
                                    <Media>
                                        <div className="ms-3">
                                            <i className="bx bx-user" style={{ fontSize: "38px", background: "grey", padding: "5px", borderRadius: "50%", color: "white", marginRight: '15px' }}></i>
                                        </div>
                                        <Media body className="align-self-center" style={{ display: !smallScreen ? 'flex' : 'block', justifyContent: 'space-between' }}>
                                            <div className="text-muted">
                                                <h5>{user.firstName + " " + user.lastName}</h5>
                                                <p className="mb-1">{user.email}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Badge
                                                    className={
                                                        "font-size-11 badge-soft-" + badgeClass
                                                    }
                                                    // color={badgeClass}
                                                    style={{ background: verified ? "green" : "#B22222", color: "white", padding: "10px" }}
                                                    pill
                                                >
                                                    {verified ? "VERIFIED" : "PENDING VERIFICATION"}
                                                </Badge>
                                            </div>
                                        </Media>
                                    </Media>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <h4 className="card-title mb-4">Bank Details</h4>

                    <Card>
                        <CardBody>

                            <Form>
                                <Row>
                                    <Col lg={6} md={6}>
                                        <div className="mb-3">
                                            <FormGroup>
                                                <Label for="name">Account Holder's Name: </Label>
                                                <Input
                                                    invalid={accountNameInvalid}
                                                    className="form-control form-control-sm"
                                                    type="text"
                                                    id="accountName"
                                                    name="accountName"
                                                    value={userDetails && userDetails.accountName}
                                                    onChange={(e) => handleAccountDetailsChange("accountName", e.target.value)}
                                                />
                                                <FormFeedback>
                                                    Field is required.
                                                </FormFeedback>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6}>
                                        <div className="mb-3">
                                            <FormGroup>
                                                <Label for="accountNumber">Account Number: </Label>
                                                <Input
                                                    invalid={accountNumberInvalid}
                                                    className="form-control form-control-sm"
                                                    type="text"
                                                    id="accountNumber"
                                                    name="accountNumber"
                                                    value={userDetails && userDetails.accountNumber}
                                                    onChange={(e) => handleAccountDetailsChange("accountNumber", e.target.value)}
                                                />
                                                <FormFeedback>
                                                    Field is required.
                                                </FormFeedback>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <div className="mb-3">
                                            <FormGroup>
                                                <Label for="sortCode">Sort Code/BSB Code: </Label>
                                                <Input
                                                    invalid={sortCodeInvalid}
                                                    className="form-control form-control-sm"
                                                    type="text"
                                                    id="sortCode"
                                                    name="sortCode"
                                                    value={userDetails && userDetails.sortCode}
                                                    onChange={(e) => handleAccountDetailsChange("sortCode", e.target.value)}
                                                />
                                                <FormFeedback>
                                                    Field is required.
                                                </FormFeedback>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={6}>
                                        <div className="mb-3">
                                            <FormGroup>
                                                <Label for="currency">Currency: </Label>
                                                <Input
                                                    invalid={false}
                                                    className="form-control form-control-sm"
                                                    type="select"
                                                    id="currency"
                                                    name="currency"
                                                    value={userDetails && userDetails.currency}
                                                    onChange={(e) => handleAccountDetailsChange("currency", e.target.value)}
                                                >
                                                    <option>GBP</option>
                                                    <option>EUR</option>
                                                    <option>USD</option>
                                                    <option>AUD</option>
                                                    <option>YEN</option>
                                                    <option>BTC</option>
                                                    <option>USDT</option>
                                                </Input>
                                                <FormFeedback>
                                                    Field is required.
                                                </FormFeedback>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="mb-3">
                                            <p style={{ fontStyle: "italic" }}>Your bank details will not be shared with any third party they will be kept securely on our servers incase we need to manually process a large withdrawal and for anti-money laundering purposes.</p>
                                        </div>
                                    </Col>
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button type="submit" style={{ background: "black", border: "1px solid black" }} onClick={handleValidAccountDetailsSubmit}>
                                            {hadUserDetails ? " Update Account Details" : "Add Account Details"}
                                        </Button>
                                    </div>
                                </Row>
                            </Form>

                        </CardBody>
                    </Card>
                </Container>
            </div>

            {
                success_msg ? (
                    <SweetAlert
                        title="Successful!"
                        success
                        confirmBtnBsStyle="success"
                        onConfirm={() => {
                            setsuccess_msg(false)
                        }}
                    >
                        Password has been changed.
                    </SweetAlert>
                ) : null
            }

        </React.Fragment >
    )
}

BankDetails.propTypes = {
    editProfile: PropTypes.func,
    error: PropTypes.any,
    success: PropTypes.any
}

const mapStatetoProps = state => {
    const { error, success } = state.Profile
    return { error, success }
}

export default withRouter(
    connect(mapStatetoProps, { editProfile, resetProfileFlag })(BankDetails)
)
