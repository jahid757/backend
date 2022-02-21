import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"

import { moneyFormatter } from 'helpers/utils';

const PaymentDetailsTable = ({ userShares }) => {
    console.log(userShares);

    // PIPER TO DO = will need to parse the transactions and add in the button here.

    const processedDetails = userShares.map((userShare) => {
        return {
            ...userShare,
            amount: userShare.amount ? moneyFormatter(userShare.amount) : null,
            actions: <Link to={`/admin-new-purchased-ipo/${userShare.id}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>,
            profitLoss: userShare.profitLoss ? moneyFormatter(userShare.profitLoss) : null,
            sharePrice: userShare.sharePrice ? moneyFormatter(userShare.sharePrice) : null,
        }
    })

    const data = {
        columns: [
            {
                label: "Id",
                field: "id",
                sort: "asc",
                width: 100,
            },
            {
                label: "Company",
                field: "company",
                sort: "asc",
                width: 150,
            },
            {
                label: "Client",
                field: "client",
                sort: "asc",
                width: 200,
            },
            {
                label: "Amount",
                field: "amount",
                sort: "asc",
                width: 100,
            },
            {
                label: "Shares Number",
                field: "sharesNumber",
                sort: "asc",
                width: 100,
            },
            {
                label: "Purchased",
                field: "dateCreated",
                sort: "asc",
                width: 100,
            },
            {
                label: "Share Price",
                field: "sharePrice",
                sort: "asc",
                width: 100,
            },
            {
                label: "Profit/Loss",
                field: "profitLoss",
                sort: "asc",
                width: 100,
            },
            {
                label: "Locked Period",
                field: "lockedPeriod",
                sort: "asc",
                width: 100,
            },
            {
                label: "Status",
                field: "status",
                sort: "asc",
                width: 100,
            },
            {
                label: "Actions",
                field: "actions",
                sort: "asc",
                width: 100
            }
        ],
        rows: processedDetails
    }

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <CardTitle className="mb-4">IPO Purchases</CardTitle>
                    <MDBDataTable responsive bordered data={data} />
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default PaymentDetailsTable;