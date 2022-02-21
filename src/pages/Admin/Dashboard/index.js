import React, { useEffect, useState } from "react"
import moment from 'moment';
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
} from "reactstrap"
import { Link } from "react-router-dom"

import { get } from 'helpers/api_helper';

// Pages Components
import ClientsTable from "./ClientsTable";
import BarChart from './AdminBarChart';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { forEach } from "lodash";
import { moneyFormatter } from "helpers/utils";

const ClientTransactions = props => {
  const [clients, setClients] = useState([])
  const [deposits, setDeposits] = useState([])
  const [depositsTotal, setDepositsTotal] = useState(0)
  const [clientsTotal, setClientsTotal] = useState(0)
  const [monthlyDeposits, setMonthlyDeposits] = useState([])
  const [monthlyClients, setMonthlyClients] = useState([])

  // Fetch all users on initial render
  useEffect(async () => {
    get('/users/allClients').then(clients => setClients(clients));
    get('/deposits/all').then(deposits => {
      const approvedDeposits = deposits.filter(deposit => deposit.status == "Successful");
      setDeposits(approvedDeposits)
    })
  }, [])

  useEffect(() => {
    if (deposits.length > 0) {
      var result = {}

      // restructuring loop
      for (var i = 0; i < deposits.length; i++) {
        var month = parseInt(deposits[i].dateCreated.substring(5, 7))
        if (!result[month]) {
          result[month] = [deposits[i].amount]
        }
        else {
          result[month].push(deposits[i].amount)
        }
      }

      let monthTotals = [];

      for (var i = 1; i < 13; i++) {
        var monthValue = result[i];
        if (!monthValue) {
          monthTotals.push(0)
        } else {
          const monthTotal = monthValue.reduce((a, b) => a + b, 0);
          monthTotals.push(monthTotal)
        }
      }

      setMonthlyDeposits(monthTotals)
      setDepositsTotal(monthTotals.reduce((a, b) => a + b, 0));
    }

    if (clients.length > 0) {
      var result = {}

      // restructuring loop
      forEach(clients, (client) => {
        var month = parseInt(client.dateCreated.substring(5, 7))
        if (!result[month]) {
          result[month] = [client.email]
        }
        else {
          result[month].push(client.email)
        }
      })

      let monthTotals = [];

      for (var i = 1; i < 13; i++) {
        var monthValue = result[i];
        if (!monthValue) {
          monthTotals.push(0)
        } else {
          monthTotals.push(monthValue.length)
        }
      }      

      setClientsTotal(monthTotals.reduce((a, b) => a + b, 0))
      setMonthlyClients(monthTotals)
    }
  }, [deposits, clients])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Example Group Ltd | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Admin"}
            breadcrumbItem={"Dashboard"}
          />

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Deposits</CardTitle>
                  <Row className="justify-content-center">
                    <Col sm={4}>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20">{moneyFormatter(depositsTotal)}</h5>
                        <p className="text-muted">Total Deposits</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                    </Col>
                  </Row>

                  <BarChart monthlyData={monthlyDeposits} label={"Total deposits"} />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Clients</CardTitle>
                  <Row className="justify-content-center">
                    <Col sm={4}>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0 font-size-20">{clientsTotal}</h5>
                        <p className="text-muted">Total Clients</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                    </Col>
                  </Row>

                  <BarChart monthlyData={monthlyClients} label={"No. of clients"} />
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* PUT CONTENT HERE MATE */}
          <Row>
            <Col lg={12}>
              <ClientsTable clients={clients} />
            </Col>
          </Row>

          <Row>
            <Col lg={12}>

            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientTransactions.propTypes = {}

export default ClientTransactions;
