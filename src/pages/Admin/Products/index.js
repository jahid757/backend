import PropTypes from 'prop-types'
import axios from 'axios';
import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"

import { get } from 'helpers/api_helper';


// Pages Components
import ProductsTable from "./ProductsTable";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

const ClientTransactions = props => {
  const [modal, setmodal] = useState(true)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  // Fetch all users on initial render
  useEffect(async () => {
    get('/products/all').then(products => setProducts(products))
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Mizuho Group Ltd | Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={"Admin"}
            breadcrumbItem={"Products"}
          />

          <ProductsTable products={products} />

        </Container>
      </div>
    </React.Fragment>
  )
}

ClientTransactions.propTypes = { }

export default ClientTransactions;
