import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Form from './components/form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {committeesSave} from '../../redux/actions/committees';
import { Redirect } from 'react-router';
import {periodsLoad}	from '../../redux/actions/periods';


class CommitteeNew extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			cancel: false
		}
	}

	onSubmit = (form) => {		
		
		debugger;
		const model = {
			name:form.name,
			populatedCenter:form.populatedCenter,
			populatedCenterName:form.populatedCenterName,
			urbancoreId:form.urbancore.value,
			urbancoreName:form.urbancoreName,
			addresstypeId:form.addresstypeId.value,
			addressName:form.addresstypeName,
			number:form.number,
			letter:form.letter,
			block:form.block,
			manzana:form.manzana,
			periodId:this.props.periodDefault,
			lote:form.lote,
			floor:form.floor,
			representative_names:form.names,
			representative_firstsurname:form.firstsurname,
			representative_lastsurname:form.lastsurname,
			reprentative_documenttypeId:form.documenttypeId.value,
			reprentative_documentId:form.documentId 
		}
		this.props.committeesSave(model);	
		//alert('Ak estamos');
	}
	onCancel = () => {
		this.setState({cancel: true})
	}
	render() {
		if(this.state.cancel){
			return <Redirect to={`/pages/comites`} />
		}
		return (
			<Container>
				<Row>
				<Col md={12}>
					<h3 className='page-title'>Comité</h3>
					<h3 className='page-subhead subhead'>Use este formulario para actualizar o registrar un nuevo comité</h3>
				</Col>
				</Row>
				<Row>
					<Form {...this.props} periods={this.props.periods} onSubmit={this.onSubmit} handleCancel={this.onCancel}/>					
				</Row>
			</Container>
		)
	}
}
const mapStateToProps = (state, ownProps) => ({
	periods: state.periods.data,	
	urbancore: state.urbancore.data,
	products: state.products.data,
	periodDefault: state.periods.periodDefault,
	addresstype: state.addresstype.data,
	documenttype: state.documenttype.data
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	committeesSave,periodsLoad
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CommitteeNew)