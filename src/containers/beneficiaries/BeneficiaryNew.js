import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Form from './components/form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Redirect } from 'react-router';
import { beneficiarySave } from '../../redux/actions/beneficiaries';
class BeneficiaryNew extends PureComponent {
	state = {
		cancel: false
	}
	onSubmit = (form) => {
		const model = {
			...form,
			addresstypeId: form.addresstypeId.value,
			documenttypeId: form.documenttypeId.value,
            benefittypeId: (form.benefittypeId) ? form.benefittypeId.value : null,
            relationshipId: (form.relationshipId) ? form.relationshipId.value : null,
			committeeId: this.props.committeeSelected
		}

		this.props.beneficiarySave(model);
	}
	onCancel = () => {
		this.setState({cancel: true})
	}
	render() {
		if(this.state.cancel){
			return <Redirect to={`/pages/socios/list`} />
		}
		return (
		<Container>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Nuevo Beneficiario</h3>
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
    committeeSelected: state.beneficiaries.committeeSelected,
    relationships: state.relationships.data
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	beneficiarySave
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BeneficiaryNew)