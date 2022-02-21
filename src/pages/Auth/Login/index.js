import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React, { useState, useEffect } from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, apiError, socialLogin } from 'store/actions';

// import images
import LseSmallLogo from 'assets/images/Platform_Icon_Logo.png';
import LseEquityDark from 'assets/images/Platform_Dashbroad_Logo.png';

const Login = props => {
    const [loading, setLoading] = useState(false)
    const [registration, setRegistration] = useState(props.location.search === "?registered=success" ? true : false);

    // handleValidSubmit
    const handleValidSubmit = (event, values) => {
        props.loginUser(values, props.history)
    }

    useEffect(() => {
        if (props.error.message) {
            setRegistration(false);
            setLoading(false)
        }
    }, [props.error])
    
    return (
        <React.Fragment>
            <MetaTags>
                <title>Login | Example Group Ltd</title>
            </MetaTags>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="fas fa-home h2" />
                </Link>
            </div>
            <div className="account-pages" style={{ paddingTop: "40px", height: "110vh", background: "url(https://sastra.edu/Pradipta16/Background-Web.jpg)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-soft" style={{ background: "#1a2c8c" }}>
                                    <Row>
                                        <Col xs={7}>
                                            <div className="p-4">
                                                <h5 style={{ color: 'white' }}>Example Group Portal.</h5>
                                                <p style={{ color: 'white', margin: 0 }}>Welcome back.</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-center">
                                            <img src={LseEquityDark} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0" style={{ border: "1px solid lightgrey" }}>
                                    <div>
                                        <Link to="/" className="auth-logo-light">
                                            <div className="avatar-md profile-user-wid" style={{ width: "100%", textAlign: "center" }}>
                                                <img src={LseSmallLogo} height={75} style={{ borderRadius: "50px" }} />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        <AvForm
                                            className="form-horizontal"
                                            onValidSubmit={(e, v) => {
                                                handleValidSubmit(e, v)
                                            }}
                                        >
                                            {props.error && props.error.message ? (
                                                <Alert color="danger">{props.error.message}</Alert>
                                            ) : null}

                                            {registration ? (
                                                <Alert color="success">Thank you for signing up. Please check your email for login details.</Alert>
                                            ) : null}

                                            <div className="mb-3">
                                                <AvField
                                                    name="email"
                                                    label="Email"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    type="email"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <AvField
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    required
                                                    placeholder="Enter Password"
                                                />
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customControlInline"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="customControlInline"
                                                >
                                                    Remember me
                                                </label>
                                            </div>

                                            <div className="mt-3 d-grid">
                                                <button
                                                    className="btn btn-primary btn-block waves-effect waves-light"
                                                    type="submit"
                                                >
                                                    Log In
                                                    {loading && <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>}
                                                </button>
                                            </div>



                                            <div className="mt-4 text-center">
                                                <Link to="/forgot-password" className="text-muted">
                                                    <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                                            </div>
                                        </AvForm>
                                    </div>
                                    <p style={{ textAlign: 'center' }}>Don&#39;t have an account ?{" "}
                                        <Link
                                            to="register"
                                            className="fw-medium text-primary"
                                        >
                                            {" "}
                                            REGISTER HERE.{" "}
                                        </Link>{" "}
                                    </p>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>© {new Date().getFullYear()} Example Group Ltd</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    const { error } = state.Login
    return { error }
}

export default withRouter(
    connect(mapStateToProps, { loginUser, apiError, socialLogin })(Login)
)

Login.propTypes = {
    error: PropTypes.any,
    history: PropTypes.object,
    loginUser: PropTypes.func,
    socialLogin: PropTypes.func
}