import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import ProductsListTable from './components/ProductsListTable';


export default class Committees extends PureComponent {
  render() {
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Comites</h3>
            <h3 className='page-subhead subhead'>
            Son organizaciones sociales de base, tienen personería jurídica y existencia legal debidamente reconocidos por la Municipalidad
            </h3>
          </Col>
        </Row>
        <Row>
          <ProductsListTable/>
      </Row>
      </Container>
    )
  }
}

