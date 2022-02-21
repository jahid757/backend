import React, { useState } from "react"
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import SweetAlert from "react-bootstrap-sweetalert";
import { useHistory } from 'react-router-dom';
import { Row, Col, Alert, Card, CardBody, Container } from "reactstrap"

// Redux
import { connect } from "react-redux" 
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { userForgetPassword } from "store/actions"

// import images
import profile from "assets/images/profile-img.png"
import LseSmallLogo from 'assets/images/Platform_Icon_Logo.png';
import { post } from 'helpers/api_helper';

const ForgetPasswordPage = props => {
  const [success_msg, setsuccess_msg] = useState(false)
  const history = useHistory();

  function handleValidSubmit(event, values) {
    // props.userForgetPassword(values, props.history)
    console.log(values);
    post('/users/resetPassword', { email: values.email, password: "DGFFGD7432FS" })
      .then((res) => {
        console.log(res);
        setsuccess_msg(true)
      })
  }

  return (
    <React.Fragment>
     <MetaTags>
          <title>Forget Password | Example Group Ltd</title>
        </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages " style={{ height: "100vh", paddingTop: "100px", background: "url(https://sastra.edu/Pradipta16/Background-Web.jpg)", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="p-4">
                        <h5 style={{ color: "white" }} >Forgotten password?</h5>
                        <p style={{ color: "white" }}>Enter your email and reset it.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0" style={{ border: "1px solid lightgrey" }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4" >
                        <span className="avatar-title rounded-circle bg-light">
                            <img src={LseSmallLogo} height={75} style={{ borderRadius: "50px", border: "1px solid #6e0a10" }} />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {props.forgetError && props.forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {props.forgetError}
                      </Alert>
                    ) : null}
                    {props.forgetSuccessMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {props.forgetSuccessMsg}
                      </Alert>
                    ) : null}

                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                    >
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
                      <Row className="mb-3">
                        <Col className="text-right">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>© {new Date().getFullYear()} Example Group Ltd.</p>
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

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.any,
  forgetSuccessMsg: PropTypes.any,
  history: PropTypes.object,
  userForgetPassword: PropTypes.func
}

const mapStatetoProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword
  return { forgetError, forgetSuccessMsg }
}

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ForgetPasswordPage)
)
