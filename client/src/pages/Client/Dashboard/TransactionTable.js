import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"

import { moneyFormatter } from 'helpers/utils';

const LatestTranaction = ({ title, withdrawal, deposits }) => {

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">{title}</CardTitle>
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th className="align-middle">{withdrawal ? "Withdrawal Amount" : "Deposit Amount"}</th>
                  <th className="align-middle">Currency</th>
                  <th className="align-middle">Status</th>
                  <th className="align-middle">Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {(deposits && deposits.length == 0 || withdrawal && withdrawal.length == 0) && (
                  <tr>
                    <p>No table entries.</p>
                  </tr>
                )}
                {deposits && deposits.map((transaction, key) => {
                  const badgeClass = transaction.status === "Pending" ? "warning" : "success";

                  return (
                    <tr key={"_tr_" + key}>
                      <td>{moneyFormatter(transaction.amount)}</td>
                      <td>{transaction.currency}</td>
                      <td>
                        <Badge
                          className={
                            "font-size-11 badge-soft-" + badgeClass
                          }
                          color={badgeClass}
                          pill
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                      <td>{transaction.dateCreated}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default LatestTranaction
