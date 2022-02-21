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
    Label,
} from "reactstrap"
import { useHistory } from "react-router-dom"
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import { post, get } from 'helpers/api_helper';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const NewProduct = props => {
    const history = useHistory();
    const [product, setProduct] = useState(null)

    const editProductId = props.match.params.id ? props.match.params.id : null;

    const handleValidSubmit = (event, value) => {
        console.log(value);
        event.preventDefault();
        if (editProductId !== null) {
            console.log("Updating product!")

            const updatedProduct = {
                ...value,
                id: editProductId,
                available: value.available == "Available" ? true : false
            }

            console.log(updatedProduct);

            post("/products/update", updatedProduct).then(response => {
                history.push("/admin-products")
            })

        } else {
            console.log("Creating trade")

            const newProduct = {
                ...value,
                available: value.available == "Available" ? true : false
            }

            console.log(newProduct);

            post('/products/create', newProduct).then((res) => {
                history.push('/admin-products');
            })
        }
    }

    const handleDelete = () => {
        console.log("Delete trade...");
        post('/products/delete', { id: product.id })
            .then(res => {
                console.log(res);
                history.push('/admin-products');
            })
    }

    // Fetch deposit if relevant
    useEffect(async () => {
        if (editProductId !== null) {
            get(`/products/${editProductId}/product`).then(product => {
                setProduct(product[0])
                console.log(product[0])
            })
        }
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Admin Product | Example Group Ltd</title>
                </MetaTags>
                <Container fluid>
                    {/* Render Breadcrumb */}
                    <Breadcrumbs
                        title={"Admin"}
                        breadcrumbItem={"Add New Product"}
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
                                                    label="Name"
                                                    className="form-control"
                                                    name="name"
                                                    id="name"
                                                    value={product && product.name}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="number"
                                                    label="Minimum Investment Amount"
                                                    className="form-control"
                                                    name="minimumInvestment"
                                                    id="minimumInvestment"
                                                    value={product && product.minimumInvestment}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField type="select" name="maturityTerm" label="Term" required value={product ? product.maturityTerm : "1 Year"}>
                                                    <option>1 Year</option>
                                                    <option>2 Year</option>
                                                    <option>3 Year</option>
                                                    <option>4 Year</option>
                                                    <option>5 Year</option>
                                                    <option>6 Year</option>
                                                    <option>7 Year</option>
                                                    <option>8 Year</option>
                                                    <option>9 Year</option>
                                                    <option>10 Year</option>
                                                </AvField>
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField type="select" name="payoutFreq" label="Payout Frequency" value={product ? product.payoutFreq : "Annually"} required>
                                                    <option>Annually</option>
                                                    <option>Semesterly</option>
                                                    <option>Quarterly</option>
                                                </AvField>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="ISIN"
                                                    className="form-control"
                                                    name="ISIN"
                                                    value={product && product.ISIN}
                                                    id="ISIN"
                                                />
                                            </div>
                                        </Col>

                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvGroup>
                                                    <Label for="date">Date</Label>
                                                    <AvInput
                                                        name="maturityDate"
                                                        id="maturityDate"
                                                        type="date"
                                                        value={product && product.maturityDate}
                                                    />
                                                </AvGroup>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="text"
                                                    label="Annual Rate of Return %"
                                                    className="form-control"
                                                    name="annualReturnRate"
                                                    id="annualReturnRate"
                                                    value={product && product.annualReturnRate}
                                                    required
                                                />
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="mb-3">
                                                <AvField
                                                    type="select"
                                                    label="Available"
                                                    className="form-control"
                                                    name="available"
                                                    id="available"
                                                    value={product ? (product.available == true ? "Available" : "Unavailable") : "Available"}
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
                                                    label="Product URL"
                                                    className="form-control"
                                                    name="productLink"
                                                    id="productLink"
                                                    value={product && product.productLink}
                                                />
                                            </div>
                                        </Col>
                                    </Row>

                                </div>
                                <div className="mt-4" style={{ textAlign: "right" }}>
                                    <Button type="submit" style={{ background: "black", border: "none" }}>
                                        Save Product
                                    </Button>
                                    {product && (
                                        <Button onClick={() => handleDelete()} color="danger" style={{ marginLeft: '20px' }} >
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </AvForm>
                        </CardBody>
                    </Card>

                </Container>
            </div>
        </React.Fragment>
    )
}

NewProduct.propTypes = {}

export default NewProduct;
