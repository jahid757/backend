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

const TermsAndConditions = () => {
  const [activeTab, setactiveTab] = useState("1")

  const highlightGold = "#D4AF37";

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Bond Purchase Agreement | Example Group Ltd</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Terms &amp; Conditions" breadcrumbItem="Bond Purchase Agreement" />

          <div className="checkout-tabs">
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-3">
                        Terms &amp; Conditions
                    </CardTitle>

                    <h5 className="font-size-15">
                        TERMS &amp; CONDITIONS FOR INVESTORS
                    </h5>
                    <p>"Example Group Ltd" is referred to as the "Company". It is essential that you read and understand these terms and conditions prior to purchasing these debenture bonds. The terms and conditions for the Example Group Ltd Fixed Rate Bonds account are set out further on. Additional Terms and Conditions may apply to specific services provided. This contract will be governed by and construed in accordance with the laws of the United Kingdom and shall be subject to the non-exclusive jurisdiction of the court of Great Britain.</p>
                    
                    <h5 className="font-size-15">
                        DOCUMENTATION
                    </h5>
                    <p>All investments will be registered in the client’s name unless otherwise agreed in writing. Contract notes in respect of investments will be forwarded to the client within 24 hours of the transaction. All new clients will be required to provide two forms of identification to open an account.</p>

                    <h5 className="font-size-15">
                        DUE DILIGENCE
                    </h5>
                    <p>The company will exercise due care and diligence in conducting their business, but will not be liable for any depreciation of investments arranged by them.</p>

                    <h5 className="font-size-15">
                        RIGHT TO AMEND
                    </h5>
                    <p>We reserve the right to amend these terms and will give you 30 days notice in advance before making material changes.</p>

                    <h5 className="font-size-15">
                        DATA PROTECTION
                    </h5>
                    <p>We reserve the right to amend these terms and will give you 30 days notice in advance before making material changes.</p>

                    <h5 className="font-size-15">
                        TERMS, FEES AND CHARGES
                    </h5>
                    <p>Example Group Ltd charges 0.5% brokerage fee to arrange and secure the bond as listed above, this is the only fee payable by the client in regards to the bond purchase and no other fees or charges are due throughout the term or upon exiting the investment. This fee is calculated from the total amount invested into the bond. If the client requests to be liquidated out from the bond earlier than the specified term as shown on the agreement, and an additional 0.5% fee would be due upon the request being made.</p>

                    <h5 className="font-size-15">
                        END OF TERM AGREEMENT
                    </h5>
                    <p>At the end of the agreed term as shown here on the agreement, the total capital invested into the bond will be paid back to the client in full, along with any outstanding interest payments, within no later than 5 working days after the bond term has ended. The bonds shall then be transferred back to Example Group Ltd. The term of the bond will begin on the date payment is made and will be clearly shown on the contract note, provided no later than 24 hours after full payment has been received.</p>

                    <h5 className="font-size-15">
                        BUY BACK GUARANTEE
                    </h5>
                    <p>Example Group initiated the fixed income bond buy back scheme to give private investors security on large capital deposits. The ethos and guiding principles of Example Group and its subsidiaries has always been to achieve above market returns while achieving the capital preservation as the cornerstone of our firm's ethics and credibility. Since the inception of the buy back scheme, Example Group subsidiaries and affiliate brokerages have operated a bond buy back scheme up to £1,000,000 GBP per client per institution. </p>

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

export default TermsAndConditions;
