import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Form from './components/form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {productSave} from '../../redux/actions/products';
import { Redirect } from 'react-router';
class ProductNew extends PureComponent {
	state = {
		cancel: false
	}
	onSubmit = (form) => {
		const model = {
			name: form.name,
			unitOfMeasure: form.unitOfMeasure.value,
			unitOfMeasureConversion: form.unitOfMeasureConversion.value,
			quantityConversion: form.quantityConversion,
			price: form.price
		}

		this.props.productSave(model);
	}
	onCancel = () => {
		this.setState({cancel: true})
	}
	render() {
		if(this.state.cancel){
			return <Redirect to={`/pages/productos`} />
		}
		return (
		<Container>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Nuevo Producto</h3>
				<h3 className='page-subhead subhead'>Use este formulario para actualizar o registrar un nuevo comité</h3>
			</Col>
			</Row>
			<Row>
				<Form {...this.props} onSubmit={this.onSubmit} handleCancel={this.onCancel}/>
			</Row>
		</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	productSave
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProductNew)