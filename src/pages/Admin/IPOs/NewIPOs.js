import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardBody,
    Modal,
} from "reactstrap"
import { useHistory } from "react-router-dom"
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import SweetAlert from "react-bootstrap-sweetalert"
import { post, get } from 'helpers/api_helper';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const NewIpo = props => {
    const history = useHistory();
    const [ipo, setIpo] = useState(null)
    const [modal_backdrop, setmodal_backdrop] = useState(false)
    const [success_msg, setsuccess_msg] = useState(false)
    const [updatingSharePrice, setUpdatingSharePrice] = useState(false)

    console.log(ipo);

    const editIpoId = props.match.params.id ? props.match.params.id : null;

    const handleValidSubmit = (event, value) => {
        console.log(value);
        event.preventDefault();
        if (editIpoId !== null) {
            console.log("Updating IPO!")

            const updatedIpo = {
                ...value,
                id: editIpoId,
                available: value.available == "Available" ? true : false
            }

            console.log(updatedIpo);

            post("/ipos/update", updatedIpo).then(response => {
                history.push("/admin-ipos")
            })

        } else {
            console.log("Creating IPO")

            const newIpo = {
                ...value,
                available: value.available == "Available" ? true : false
            }

            console.log(newIpo);

            post('/ipos/create', newIpo).then((res) => {
                history.push('/admin-ipos');
            })
        }
    }

    const handleDelete = () => {
        console.log("Delete trade...");
        post('/ipos/delete', { id: ipo.id })
            .then(res => {
                console.log(res);
                history.push('/admin-ipos');
            })
    }

    // Fetch deposit if relevant
    useEffect(async () => {
        if (editIpoId !== null) {
            get(`/ipos/${editIpoId}/ipo`).then(ipo => {
                setIpo(ipo[0])
                console.log(ipo[0])
            })
        }
    }, [])

    const tog_backdrop = () => {
        setmodal_backdrop(!modal_backdrop);
    }

    const handleModalValidSubmit = (event, values) => {
        // DO STUFF
        console.log(values);
        setUpdatingSharePrice(true);

        const updatedSharePrice = {
            price: values.sharePrice,
            id: editIpoId,
            shareProfitLoss: values.sharePrice - ipo.price
        }

        console.log(updatedSharePrice);

        post('/ipos/changePrice', updatedSharePrice).then((res) => {
            setUpdatingSharePrice(false);
            setmodal_backdrop(false)
            setsuccess_msg(true)
        })
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Admin IPO | Example Group Ltd</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Admin"}
                        breadcrumbItem={"Add New IPO"}
                    />

                    <Card>
                        <CardBody>
                            <AvForm
                                className="form-horizontal"
                                onValidSubmit={(e, v) => {
                                    handleValidSubmit(e, v)
                                }}
                            >
                                <div className="form-group">
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Company"
                                                    className="form-control"
                                                    name="company"
                                                    id="company"
                                                    value={ipo && ipo.company}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Symbol"
                                                    className="form-control"
                                                    name="symbol"
                                                    id="Symbol"
                                                    value={ipo && ipo.symbol}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Lead Manager"
                                                    className="form-control"
                                                    name="manager"
                                                    id="manager"
                                                    value={ipo && ipo.manager}
                                                    required
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Shares (million)"
                                                    className="form-control"
                                                    name="totalShares"
                                                    id="totalShares"
                                                    value={ipo && ipo.totalShares}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Listing Range"
                                                    className="form-control"
                                                    name="listingRange"
                                                    value={ipo && ipo.listingRange}
                                                    id="listingRange"
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    label="Expected To Trade"
                                                    id="expectedToTrade"
                                                    name="expectedToTrade"
                                                    type="text"
                                                    value={ipo && ipo.expectedToTrade}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Share Price"
                                                    className="form-control"
                                                    name="price"
                                                    id="price"
                                                    value={ipo && ipo.price}
                                                    required
                                                    disabled={ipo && ipo.price}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="select"
                                                    label="Status"
                                                    className="form-control"
                                                    name="available"
                                                    id="available"
                                                    value={ipo ? (ipo.available == true ? "Available" : "Unavailable") : "Available"}
                                                    required
                                                >
                                                    <option>Available</option>
                                                    <option>Unavailable</option>
                                                </AvField>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Prospectus"
                                                    className="form-control"
                                                    name="prospectus"
                                                    id="prospectus"
                                                    value={ipo && ipo.prospectus}
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Est. Valuation"
                                                    className="form-control"
                                                    name="valuation"
                                                    id="valuation"
                                                    value={ipo && ipo.valuation}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Minimum Shares"
                                                    className="form-control"
                                                    name="minimumShares"
                                                    id="minimumShares"
                                                    value={ipo && ipo.minimumShares}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Logo link"
                                                    className="form-control"
                                                    name="logo"
                                                    id="logo"
                                                    value={ipo && ipo.logo}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                                <div className="mt-4" style={{ textAlign: "right", display: "flex", justifyContent: 'space-between' }}>
                                    {ipo  && (
                                        <div>
                                            <Button
                                                style={{ marginRight: "20px", background: 'black', color: "white", border: "none" }}
                                                onClick={() => setmodal_backdrop(true)}
                                                disabled={updatingSharePrice}
                                            >
                                                Update Share Price
                                            </Button>
                                        </div>
                                    )}
                                   <div>
                                        <Button type="submit" style={{ background: "black", border: "none" }}>
                                            Save IPO
                                        </Button>
                                        {ipo && (
                                            <Button onClick={() => handleDelete()} color="danger" style={{ marginLeft: '20px' }} >
                                                Delete
                                            </Button>
                                        )}
                                   </div>
                                </div>
                            </AvForm>
                        </CardBody>
                    </Card>

                </Container>
            </div>


            <Modal
                isOpen={modal_backdrop}
                toggle={() => {
                    tog_backdrop()
                }}
                scrollable={true}
                id="staticBackdrop"
            >
                <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Update Share Price</h5>
                <button type="button" className="btn-close"
                    onClick={() => setmodal_backdrop(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <Card>
                        <CardBody>
                        <AvForm
                            className="form-horizontal"
                            onValidSubmit={(e, v) => {
                                handleModalValidSubmit(e, v)
                            }}
                        >
                            <div className="form-group">
                                <Row>
                                    <Col lg={12}>
                                    <div className="mb-3">
                                        <AvField
                                        type="number"
                                        label="New Share Price"
                                        className="form-control"
                                        name="sharePrice"
                                        id="sharePrice"
                                        validate={{
                                            number: true,
                                            min: { value: 0, errorMessage: "Value cannot be negative." },
                                        }}
                                        required
                                        />
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ color: "grey", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", fontSize: "12px" }}>
                                    <p>This will update the profit/loss calculations for all users who own this share.</p>
                            </div>
                            <div className="mt-4" style={{ textAlign: "right" }}>
                                <Button type="submit" color="danger">
                                    Update Share Price
                                </Button>
                            </div>
                        </AvForm>
                        </CardBody>
                    </Card>
                </div>
            </Modal>

        {
            success_msg ? (
            <SweetAlert
                title="Successful!"
                success
                confirmBtnBsStyle="success"
                onConfirm={() => {
                    setsuccess_msg(false)
                    history.push('/admin-ipos');
                }}
            >
                Share Price Updated.
            </SweetAlert>
            ) : null
        }
        </React.Fragment>
    )
}

NewIpo.propTypes = {}

export default NewIpo;
