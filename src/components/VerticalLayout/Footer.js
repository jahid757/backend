import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={6}>
              {/* <div className="text-sm-end d-none d-sm-block">
                Mizuho Group Ltd
              </div> */}
            </Col>
            <Col md={6} style={{ display: "flex", justifyContent: "flex-end" }}>{new Date().getFullYear()} © Mizuho Group Ltd.</Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
