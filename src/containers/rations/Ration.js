import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Form from './components/form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {periodLoad} from '../../redux/actions/periods';
import {rationSave} from '../../redux/actions/rations';
import { Redirect } from 'react-router-dom';

class Ration extends PureComponent {
	constructor(props){
		super(props);		
		this.state = {
			cancel: false
		}
	}
	componentDidMount(){
		this.props.periodLoad(this.periodId);
	}
	handleSubmit = (form) => {
		const model = {
			periodId: this.props.periodDefault,
			productId: form.productId.value,
			quantity: form.quantity
		}
		this.props.rationSave(model);
		this.handleCancel();
	}
	handleCancel =() => {
		this.setState({cancel: true})
	}
	handleChange = () => () => {

	}
	render() {
		const {period = {}} = this.props;
		if(this.state.cancel){
			return <Redirect to={`/pages/raciones/periodo`} />
		}
		return (
		<Container>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Nueva Ración</h3>
			</Col>
			</Row>
			<Row>
				<Form onCancel={this.handleCancel} onSubmit={this.handleSubmit} period={this.props.period} products={this.props.products}/>
			</Row>
		</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	form: state.form.ration_form,
	period: state.periods.period,
	periodDefault: state.periods.periodDefault,
	products: state.products.data
})

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	periodLoad,
	rationSave
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Ration)