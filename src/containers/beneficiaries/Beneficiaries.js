import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Dashboard from './components/dashboard';

export default class Beneficiaries extends PureComponent {
	render() {
		return (
		<Container className='dashboard'>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Beneficiarios</h3>
				<h3 className='page-subhead subhead'>
				Es la persona quien recibe directamente el beneficio del Programa del Vaso de Leche.
				</h3>
			</Col>
			</Row>
			<Dashboard/>
		</Container>
		)
	}
}

