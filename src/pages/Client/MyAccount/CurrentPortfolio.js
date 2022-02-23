import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"

import { moneyFormatter } from 'helpers/utils';
import { get } from 'helpers/api_helper';

const MiniWidget = ({ width, totalInvestments }) => {
    const hideOnSmall = width < 500 ? true : false;

    const shouldDisplay = hideOnSmall ? "none" : "block";

    return (
        <React.Fragment>
            <Col md={6} sm={12} lg={3} xl={3}>
                <Card>
                    <CardBody>
                        <p className="text-muted" style={{ fontSize: "18px", fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                            <div className="avatar-sm rounded-circle bg-light mini-stat-icon" style={{ marginRight: '10px' }}>
                                <span className="avatar-title rounded-circle bg-light">
                                    <i className={"bx bx-copy-alt font-size-24"}></i>
                                </span>
                            </div>{" "}
                            {"Your Current Portfolio"}{" "}
                        </p>

                        <Row>
                            <Col>
                                <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                    <Col>
                                    <div>
                                        <h4 className="mb-0">{moneyFormatter(totalInvestments)}</h4>
                                            {/* <p className="text-muted text-truncate mb-0" style={{ display: "flex", alignItems: "center" }}>
                                            <div style={{ background: "green", height: "10px", width: "10px", marginRight: "5px", borderRadius: "10px" }}></div>
                                                {"Total Investments:"}{" "}
                                            </p> */}
                                    </div>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    )
}

export default MiniWidget

MiniWidget.propTypes = {
    reports: PropTypes.array
}