import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Form from './components/form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {productsLoad} from '../../redux/actions/products';
import {incomeSave} from '../../redux/actions/incomes';
import { Redirect } from 'react-router-dom';
class Committee extends PureComponent {
	state = {
		canel: false,
		unity: null
	}
	componentDidMount(){
		this.props.productsLoad();
	}
	handleChangeUnity = (unity) => this.setState({unity})
	onSubmit = (form) => {
		this.props.incomeSave({
			productId: form.product.value,
			unityId: this.state.unity,
			quantity: form.quantity,
			inputCode: form.inputCode,
			entryDate: form.entryDate.toDate()
		});
		this.setState({cancel: true});
	}
	onCancel = () => {
		this.setState({cancel: true})
	}
	render() {
		if(this.state.cancel){
			return <Redirect to={`/pages/ingresos`} />
		}
		return (
		<Container>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Nuevo Ingreso</h3>
				<h3 className='page-subhead subhead'>Use este formulario para actualizar o registrar un nuevo comité</h3>
			</Col>
			</Row>
			<Row>
				<Form onSubmit={this.onSubmit} products={this.props.products} handleCancel={this.onCancel} handleChangeUnity={this.handleChangeUnity}/>
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