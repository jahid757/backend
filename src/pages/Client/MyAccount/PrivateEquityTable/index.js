import React, { useEffect, useState } from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { moneyFormatter } from 'helpers/utils';

import PrivateEquityTableRow from './PrivateEquityTableRow';

const PrivateEquityTable = ({ userShares }) => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Private Equity</CardTitle>
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ textAlign: 'center' }}>Company</th>
                  <th style={{ textAlign: 'center' }}>Symbol</th>
                  <th style={{ textAlign: 'center' }}>Capital<br /> Invested</th>
                  <th style={{ textAlign: 'center' }}>No. of<br />Shares</th>
                  <th style={{ textAlign: 'center' }}>Share<br />Price</th>
                  <th style={{ textAlign: 'center' }}>Profit/Loss</th>
                  <th style={{ textAlign: 'center' }}>Locked Period<br />(Days)</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(userShares && userShares.length == 0) && (
                  <tr>
                    <p>No table entries.</p>
                  </tr>
                )}
                {userShares.map((userShare) => {
                  return <PrivateEquityTableRow userShare={userShare} />
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default PrivateEquityTable;
