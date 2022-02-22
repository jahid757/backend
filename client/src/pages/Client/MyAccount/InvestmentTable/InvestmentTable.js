import React, { useEffect, useState } from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"

import InvestmentTableRow from './InvestmentTableRow';

const InvestmentTable = ({ trades, hideSell }) => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setUser(obj);
    }
  
  }, []);

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Bonds</CardTitle>
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ textAlign: 'center' }}>Investment</th>
                  <th style={{ textAlign: 'center' }}>Transaction Date</th>
                  <th style={{ textAlign: 'center' }}>Amount</th>
                  <th style={{ textAlign: 'center' }}>Maturity</th>
                  <th style={{ textAlign: 'center' }}>Payout</th>
                  <th style={{ textAlign: 'center' }}>APR</th>
                  <th style={{ textAlign: 'center' }}>ISIN</th>
                  {!hideSell && <th style={{ textAlign: 'center' }}>Sell</th>}
                </tr>
              </thead>
              <tbody>
                {(trades && trades.length == 0) && (
                  <tr>
                    <p>No table entries.</p>
                  </tr>
                )}
                {trades.map((investment, key) => {
                  return <InvestmentTableRow investment={investment} key={key} hideSell={hideSell} user={user.email} />
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default InvestmentTable;
