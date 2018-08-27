import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Form from './components/form';
import { connect } from 'react-redux';

class Committee extends PureComponent {
	render() {
		return (
		<Container>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Comité</h3>
				<h3 className='page-subhead subhead'>Use este formulario para actualizar o registrar un nuevo comité</h3>
			</Col>
			</Row>
			<Row>
				<Form onSubmit={() => {}} {...this.props}/>
			</Row>
		</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	urbancore: state.urbancore.data,
	products: state.products.data
})

export default connect(mapStateToProps)(Committee)