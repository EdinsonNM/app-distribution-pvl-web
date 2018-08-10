import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import DistributionList from './components/distribution-list';

export default class Distribution extends PureComponent {
	render() {
		return (
		<Container className='dashboard'>
			<Row>
				<Col md={12}>
					<h3 className='page-title'>Distribución PVL <span style={{color: 'orange'}}>PROGRAMACION</span></h3>
					<h3 className='page-subhead subhead'>
					Consiste en la programación y asignación mensual de productos a los diferentes comites.
					</h3>
				</Col>
			</Row>
			<DistributionList />
		</Container>
		)
	}
}

