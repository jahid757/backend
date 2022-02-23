import React from "react"
import { Card, CardBody, CardTitle, Badge, Button } from "reactstrap"
import { Link } from "react-router-dom"
import { MDBDataTable } from "mdbreact"

import { moneyFormatter } from 'helpers/utils';

const PaymentDetailsTable = ({ sentPaymentDetails }) => {

    // PIPER TO DO = will need to parse the transactions and add in the button here.
    const paymentDetails = [
        {
            id: "1",
            client: "something23@gmail.com",
            accountName: "Big Company Holdings",
            accountNumber: 12345678,
            amount: 5000.00,
            sortCode: "30-12-32",
            IBAN: "",
            SWIFT: "",
            reference: "REF123",
            actions: <Link to={`/admin-send-payment-details/${1}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
        },
        {
            id: "2",
            client: "anotherthing@gmail.com",
            accountName: "Bigger Compamy Holdings",
            accountNumber: 12345678,
            amount: 10000.00,
            sortCode: "30-12-32",
            IBAN: "",
            SWIFT: "",
            reference: "REF123",
            actions: <Link to={`/admin-send-payment-details/${2}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
        },
    ]

    const processedDetails = sentPaymentDetails.map((paymentDetail) => {
        return {
            ...paymentDetail,
            amount: paymentDetail.amount ? moneyFormatter(paymentDetail.amount) : null,
            actions: <Link to={`/admin-send-payment-details/${paymentDetail.id}`}><Button type="button" color="primary" size="sm" className="btn-rounded waves-effect waves-light">Edit</Button></Link>
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
                label: "Client",
                field: "client",
                sort: "asc",
                width: 200,
            },
            {
                label: "Account Name",
                field: "accountName",
                sort: "asc",
                width: 200,
            },
            {
                label: "Account Number",
                field: "accountNumber",
                sort: "asc",
                width: 100,
            },
            {
                label: "Amount",
                field: "amount",
                sort: "asc",
                width: 100,
            },
            {
                label: "Sort Code",
                field: "sortCode",
                sort: "asc",
                width: 100,
            },
            {
                label: "IBAN",
                field: "IBAN",
                sort: "asc",
                width: 100,
            },
            {
                label: "SWIFT",
                field: "SWIFT",
                sort: "asc",
                width: 100,
            },
            {
                label: "Reference",
                field: "reference",
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
                    <CardTitle className="mb-4">Payment Details</CardTitle>
                    <MDBDataTable responsive bordered data={data} />
                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default PaymentDetailsTable;