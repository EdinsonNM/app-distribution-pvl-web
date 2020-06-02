import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Form from './components/form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import {partnerSave} from '../../redux/actions/partners';
class PartnerNew extends PureComponent {
	state = {
		cancel: false
	}
	onSubmit = (form) => {
		const model = {
			...form,
			addresstypeId: form.addresstypeId.value,
			documenttypeId: form.documenttypeId.value,
			benefittypeId: (form.benefittypeId) ? form.benefittypeId.value : null,
			committeeId: this.props.committeeSelected
		}

		this.props.partnerSave(model);
	}
	onCancel = () => {
		this.setState({cancel: true})
	}
	render() {
		if(this.state.cancel){
			return <Redirect to={`/pages/socios/dashboard`} />
		}
		return (
		<Container>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Nuevo Socio</h3>
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
	addresstype: state.addresstype.data,
	documenttype: state.documenttype.data,
	benefittype: state.benefittype.data,
	committeeSelected: state.partners.committeeSelected
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	partnerSave
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PartnerNew)