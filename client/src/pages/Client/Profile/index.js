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

const UserProfile = props => {
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
      console.log(obj)
      console.log("User object: ", obj);
      setUser(obj)
      setVerified(obj.verified == 1)
      
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
  }

  const badgeClass = "warning";
  

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Mizuho Group Ltd</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Mizuho Group" breadcrumbItem="Profile" />

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
                      {/* <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      /> */}
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

          <h4 className="card-title mb-4">Change User Info</h4>

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
                              name="title"
                              label="Title"
                              placeholder="Placeholder"
                              value={user.title}
                            >
                              <option>------</option>
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
                              id="firstName"
                              name="firstName"
                              value={user.firstName}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <AvField
                              type="text"
                              label="Surname"
                              className="form-control"
                              name="lastName"
                              id="lastName"
                              value={user.lastName}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <AvField
                              type="email"
                              label="Email"
                              className="form-control"
                              name="email"
                              id="email"
                              disabled
                              value={user.email}
                            />
                          </div>
                        </Col>

                      </Row>

                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <AvField
                              type="text"
                              label="Telephone Number"
                              className="form-control"
                              name="phoneNumber"
                              id="phoneNumber"
                              value={user.phoneNumber}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <AvField
                              type="text"
                              label="Address"
                              className="form-control"
                              name="address"
                              id="address"
                              value={user.address}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <AvField
                              type="text"
                              label="Post Code"
                              className="form-control"
                              name="postcode"
                              id="postcode"
                              value={user.postcode}
                            />
                          </div>
                        </Col>
                      </Row>

                    </div>
                    <div className="text-center mt-4">
                      <Button type="submit" style={{ background: "black", border: "1px solid black" }}>
                        Edit User Details
                      </Button>
                      <Button style={{ marginLeft: "20px", background: "black", border: "1px solid black" }} onClick={() => setmodal_backdrop(true)}>
                        Change Password
                      </Button>
                    </div>
                  </AvForm>
            </CardBody>
          </Card>
        </Container>
      </div>

      <Modal
        isOpen={modal_backdrop}
        toggle={() => {
          tog_backdrop()
        }}
        scrollable={true}
        id="staticBackdrop"
      >
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">Change Password</h5>
          <button type="button" className="btn-close"
            onClick={() => setmodal_backdrop(false)} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <Card>
            <CardBody>
              <AvForm
                className="form-horizontal"
                onValidSubmit={(e, v) => {
                  handleModalValidSubmit(e, v)
                }}
              >
                <div className="form-group">
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <AvField
                          type="password"
                          label="Old Password*"
                          className="form-control"
                          name="oldPassword"
                          id="oldPassword"
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                  <div style={{ color: "grey", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", fontSize: "12px" }}>
                    <p style={{ width: "90%", marginBottom: "3px" }}> &#8226; Your password can’t be too similar to your other personal information.</p>
                    <p style={{ width: "90%", marginBottom: "3px" }}> &#8226; Your password must contain at least 8 characters.</p>
                    <p style={{ width: "90%", marginBottom: "3px" }}> &#8226; Your password can’t be a commonly used password.</p>
                    <p style={{ width: "90%", marginBottom: "20px" }}> &#8226; Your password can’t be entirely numeric.</p>
                  </div>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <AvField
                          type="password"
                          label="New Password*"
                          className="form-control"
                          name="password"
                          id="password"
                          validate={{
                            minLength: { value: 8, errorMessage: 'Your password must have over 8 characters.' },
                          }}
                          required
                        />
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <AvField
                          type="password"
                          label="New Password Confirmation*"
                          className="form-control"
                          name="passwordConfirmation"
                          id="passwordConfirmation"
                          validate={{
                            match: { value: 'password', errorMessage: "Doesn't match new password" },
                            minLength: { value: 8, errorMessage: 'Your password must have over 8 characters.' },
                          }}
                          required
                        />
                      </div>
                    </Col>
                  </Row>


                </div>
                <div className="mt-4" style={{ textAlign: "right" }}>
                  <Button type="submit" color="danger">
                    Change Password
                  </Button>
                </div>
              </AvForm>
            </CardBody>
          </Card>



        </div>
      </Modal>

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

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, { editProfile, resetProfileFlag })(UserProfile)
)
