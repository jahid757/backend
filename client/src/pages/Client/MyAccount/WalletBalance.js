import React from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import ReactApexChart from "react-apexcharts"

const series = [76, 67, 61]
const walletOptions = {
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: "25%",
        background: "transparent",
        image: void 0,
      },
      track: {
        show: !0,
        startAngle: void 0,
        endAngle: void 0,
        background: "#f2f2f2",
        strokeWidth: "97%",
        opacity: 1,
        margin: 12,
        dropShadow: {
          enabled: !1,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 0.5,
        },
      },
      dataLabels: {
        name: {
          show: !0,
          fontSize: "12px",
          fontWeight: 600,
          offsetY: -1,
        },
        value: {
          show: !0,
          fontSize: "10px",
          offsetY: 1,
          formatter: function (e) {
            return e + "%"
          },
        },
        total: {
          show: !0,
          label: "Total",
          color: "#373d3f",
          fontSize: "12px",
          fontFamily: void 0,
          fontWeight: 600,
          formatter: function (e) {
            return (
              e.globals.seriesTotals.reduce(function (e, t) {
                return e + t
              }, 0) + "%"
            )
          },
        },
      },
    },
  },
  stroke: {
    lineCap: "round",
  },
  colors: ["#3452e1", "#f1b44c", "#50a5f1"],
  labels: ["Ethereum", "Bitcoin", "Ethereum"],
  legend: { show: !1 },
}

const WalletBalance = () => {
  return (
    <React.Fragment>
      <Col xl="4" lg={4} md={12}>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <div className="">
                  <p>Available Balance</p>
                  <h4>$ 6134.39</h4>

                  <p style={{ marginTop: "20px" }}>Your Current Portfolio</p>
                  <Row>
                      <div>
                        <p className="mb-2">
                          <i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary" />{" "}Ethereum: $10000.00</p>
                      </div>

                      
                  </Row>
                </div>
              </Col>

              <Col sm="6">
                <div>
                  <div id="wallet-balance-chart">
                    <ReactApexChart
                      options={walletOptions}
                      series={series}
                      type="radialBar"
                      height={250}
                      className="apex-charts"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default WalletBalance
