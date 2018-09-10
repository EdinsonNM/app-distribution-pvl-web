import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Form from './components/form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {productsLoad} from '../../redux/actions/products';
import {incomeSave} from '../../redux/actions/incomes';
class Committee extends PureComponent {
	componentDidMount(){
		this.props.productsLoad();
	}
	onSubmit = (form) => {
		debugger;
		console.log(form);
		this.props.incomeSave({
			productId: form.product.value,
			unityId: form.unity.value,
			quantity: form.quantity,
			inputCode: form.inputCode,
			entryDate: form.entryDate.toDate()
		})
	}
	render() {
		return (
		<Container>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Nuevo Ingreso</h3>
				<h3 className='page-subhead subhead'>Use este formulario para actualizar o registrar un nuevo comité</h3>
			</Col>
			</Row>
			<Row>
				<Form onSubmit={this.onSubmit} products={this.props.products}/>
			</Row>
		</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	products: state.products.data
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	productsLoad,
	incomeSave
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Committee)