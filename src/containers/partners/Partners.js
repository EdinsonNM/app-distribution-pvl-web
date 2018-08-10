import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Committees from './components/committees';

export default class Partners extends PureComponent {
  render() {
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Socios</h3>
            <h3 className='page-subhead subhead'>
            Es la persona padre, madre o tutor que representa a uno o más usuarios o beneficiarios del Programa del Vaso de Leche.
            </h3>
          </Col>
        </Row>
          <Committees/>
      </Container>
    )
  }
}

