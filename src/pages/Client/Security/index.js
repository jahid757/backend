import React, { useState } from "react"
import MetaTags from 'react-meta-tags';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Media,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"
import classnames from "classnames"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

const PagesFaqs = () => {
  const [activeTab, setactiveTab] = useState("1")

  const highlightGold = "#D4AF37";

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Security | Example Group Ltd</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Information" breadcrumbItem="Security" />

          <div className="checkout-tabs">
            <Row>
              <Col lg="2">
                <Nav className="flex-column" pills>
                  <NavItem>
                    <NavLink
                      style={{ color: activeTab === "1" ? highlightGold : "black" }}
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        setactiveTab("1")
                      }}
                    >
                      <i className="mdi mdi-server-security d-block check-nav-icon mt-4 mb-2" />
                      <p className="font-weight-bold mb-4">Fidelity Cold Storage</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ color: activeTab === "2" ? highlightGold : "black" }}
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        setactiveTab("2")
                      }}
                    >
                      <i className="mdi mdi-security-network d-block check-nav-icon mt-4 mb-2" />
                      <p className="font-weight-bold mb-4">Military Grade Encryption</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ color: activeTab === "3" ? highlightGold : "black" }}
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        setactiveTab("3")
                      }}
                    >
                      <i className="mdi mdi-comment-question d-block check-nav-icon mt-4 mb-2" />
                      <p className="font-weight-bold mb-4">Frequently Asked Questions</p>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col lg="10">
                <Card>
                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <CardTitle className="mb-5">
                          Fidelity Cold Storage
                        </CardTitle>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              What is Fidely Cold Storage?
                            </h5>
                            <p className="text-muted">
                              New common language will be more simple and
                              regular than the existing European languages. It
                              will be as simple as occidental.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              How does it keep your crypto safe?
                            </h5>
                            <p className="text-muted">
                              Everyone realizes why a new common language would
                              be desirable one could refuse to pay expensive
                              translators.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              Who else uses Fidelity?
                            </h5>
                            <p className="text-muted">
                              If several languages coalesce, the grammar of the
                              resulting language is more simple and regular than
                              that of the individual languages.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">Why do we use it?</h5>
                            <p className="text-muted">
                              Their separate existence is a myth. For science,
                              music, sport, etc, Europe uses the same
                              vocabulary.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">What do I need to know?</h5>
                            <p className="text-muted">
                              Their money will be backed up and safe. Institutional grade custody and execution services. Some more stuff. 
                            </p>
                          </Media>
                        </Media>
                      </TabPane>
                      <TabPane tabId="2">
                        <CardTitle className="mb-5">Military Grade Encryption</CardTitle>

                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              Do you really mean military grade?
                            </h5>
                            <p className="text-muted">
                              Yes! We have access to the most cutting edge encryption through something something something something.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              How does it work?
                            </h5>
                            <p className="text-muted">
                              To an English person, it will seem like simplified
                              English, as a skeptical Cambridge friend of mine
                              told me what Occidental
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              What types of encryption are you using?
                            </h5>
                            <p className="text-muted">
                              We use the Advanced Encryption Standard (AES) symmetric algorithm, the Rivest-Shamir-Adleman (RSA) asymmetric algorithm, the Password-Based Key Derivation Function 2 (PBKDF2) hashing algorithm, some Secure Hashing Algorithm 2 (SHA-2) here and there and finally the Elliptic Curve Digital Signature Algorithm (ECDSA) asymmetric algorithm used by the cryptocurrency networks.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">Why do we use it?</h5>
                            <p className="text-muted">
                              Their separate existence is a myth. For science,
                              music, sport, etc, Europe uses the same
                              vocabulary.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              What do I need to know?
                            </h5>
                            <p className="text-muted">
                              If several languages coalesce, the grammar of the
                              resulting language is more simple and regular than
                              that of the individual languages.
                            </p>
                          </Media>
                        </Media>
                      </TabPane>
                      <TabPane tabId="3">
                        <CardTitle className="mb-5">Frequently Asked Questions</CardTitle>

                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              FAQ Question 1
                            </h5>
                            <p className="text-muted">
                              To an English person, it will seem like simplified
                              English, as a skeptical Cambridge friend of mine
                              told me what Occidental
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              FAQ Question 2
                            </h5>
                            <p className="text-muted">
                              Everyone realizes why a new common language would
                              be desirable one could refuse to pay expensive
                              translators.
                            </p>
                          </Media>
                        </Media>

                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">FAQ Question 3</h5>
                            <p className="text-muted">
                              Their separate existence is a myth. For science,
                              music, sport, etc, Europe uses the same
                              vocabulary.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              FAQ Question 4
                            </h5>
                            <p className="text-muted">
                              If several languages coalesce, the grammar of the
                              resulting language is more simple and regular than
                              that of the individual languages.
                            </p>
                          </Media>
                        </Media>

                        <Media className="faq-box">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20" style={{ color: highlightGold }} />
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              FAQ Question 5
                            </h5>
                            <p className="text-muted">
                              New common language will be more simple and
                              regular than the existing European languages. It
                              will be as simple as occidental.
                            </p>
                          </Media>
                        </Media>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default PagesFaqs
