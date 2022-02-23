import React, { useState, useEffect } from 'react';
import {
    Card,
    Col,
    Container,
    Row,
    CardBody,
    CardTitle,
    Label,
    Button,
    Form,
    Input,
    InputGroup,
    Modal
} from "reactstrap";
import { useHistory } from 'react-router-dom';
import { AvForm, AvField, AvRadio, AvRadioGroup } from "availity-reactstrap-validation";

import { post } from 'helpers/api_helper';

const TransactionForm = ({ withdrawal, availableDeposit }) => {
    // PUT THE STATE FIELDS HERE.
    const [formValues, setFormValues] = useState({});
    const [modal_backdrop, setmodal_backdrop] = useState(false)
    const [verified, setVerified] = useState(null);

    useEffect(async () => {
        if (localStorage.getItem("authUser")) {
            const obj = JSON.parse(localStorage.getItem("authUser"))

            console.log(obj);

            setVerified(obj.verified);
        }
    }, [])

    const withdrawalModal = {
        title: "Withdrawal request successful",
        message: "Your withdrawal request has been received and will be processed shortly.",
        closeModalFunc: () => {
            setmodal_backdrop(false)
            history.push("/client-dashboard");
        }
    }

    const depositModal = {
        title: "Deposit request successful",
        message: "Your deposit request has been received and will be processed shortly.",
        closeModalFunc: () => {
            setmodal_backdrop(false);
            history.push("/client-dashboard");
        }
    }

    const modalData = withdrawal ? withdrawalModal : depositModal;

    const history = useHistory();

    const handleOnChange = (event, name) => {
        setFormValues({
            ...formValues,
            [name]: event.target.value
        });
    }

    const tog_backdrop = () => {
        setmodal_backdrop(!modal_backdrop);
        if (!withdrawal) {
            history.push("/client-my-account");
        }
    }

    const validation = !withdrawal ? {
        number: { value: true, errorMessage: 'Value must be a number!' },
        required: { value: true, errorMessage: 'Please enter a value' },
        min: { value: 0, errorMessage: "Deposit does not meet the minimum requirements." },
    } : {
        number: { value: true, errorMessage: 'Value must be a number!' },
        required: { value: true, errorMessage: 'Please enter a value' },
        min: { value: 0, errorMessage: "Withdrawal does not meet the minimum requirements." },
        max: { value: availableDeposit, errorMessage: "Withdrawal cannot be higher than available deposit." },
    }

    const handleSubmit = (event, values) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("authUser"));

        const amount = withdrawal ? -(values.amount) : values.amount;

        const deposit = {
            amount: amount,
            client: user.email,
            currency: values.currency,
            name: `${user.firstName} ${user.lastName}`,
            phoneNumber: user.phoneNumber,
            status: "Pending",
            dateCreated: new Date().toISOString().slice(0, 10)
        }

        console.log("Deposit to send", deposit);

        post('/deposits/create', deposit).then((res) => {
            console.log(res);
        })

        console.log("Handle submit!");
        setmodal_backdrop(true);
    }

    return (
        <>
            {!withdrawal && <p>Please proceed to submit your deposit request, you will receive an email notification containing the account details and your unique client reference if your request is successful.</p>}
            <AvForm onValidSubmit={handleSubmit} >
                <div className="mb-3">
                    <Label htmlFor="amount">Amount ($, $, €, ¥)</Label>
                    <AvField
                        type="text"
                        className="form-control"
                        id="amount"
                        name="amount"
                        onChange={e => handleOnChange(e, "amount")}
                        validate={validation}
                    />
                </div>
                <div className="mb-3">
                    <Label htmlFor="currency">Currency:</Label>
                    <AvField
                        type="select"
                        className="form-control"
                        id="currency"
                        name="currency"
                        onChange={e => handleOnChange(e, "currency")}
                    >
                        <option>GBP</option>
                        <option>EUR</option>
                        <option>USD</option>
                        <option>AUD</option>
                        <option>YEN</option>
                        <option>BTC</option>
                        <option>USDT</option>
                    </AvField>
                    <p>Your deposit will be made through bank transfer:</p>
                    {!withdrawal && (
                        <AvRadioGroup name="paymentMethod" inline required errorMessage="Please select a payment method!" style={{ background: "#f1f1f1" }}>
                            <AvRadio label="Chaps" value="chaps" />
                            <AvRadio label="Faster Payment Service" value="fasterPaymentService" />
                            <AvRadio label="SWIFT" value="swift" />
                            <AvRadio label="OSKO" value="osko" />
                        </AvRadioGroup>
                    )}
                </div>

                <div>
                    <button type="submit" className="btn btn-primary w-md" disabled={verified && verified == "0"}>
                        Submit
                    </button>
                    {verified && verified == "0" && <p style={{ margin: "10px", color: "red" }}>You cannot do this action until your account has been verified!</p>}
                </div>
            </AvForm>


            <Modal
                isOpen={modal_backdrop}
                toggle={() => {
                    tog_backdrop()
                }}
                scrollable={true}
                id="staticBackdrop"
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">{modalData.title}</h5>
                    <button type="button" className="btn-close"
                        onClick={modalData.closeModalFunc} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>{modalData.message}</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={modalData.closeModalFunc}>Close</button>
                </div>
            </Modal>
        </>
    )
}

export default TransactionForm;