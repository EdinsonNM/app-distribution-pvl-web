import React, {PureComponent} from 'react';
import { Col, Container, Row, CardBody, Card, ButtonToolbar } from 'reactstrap';
import Committees from './components/committees';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { committeesBeneficiariesLoad, committeesBeneficiariesLoadSearch } from '../../redux/actions/beneficiaries';
import FilterSearch from '../../components/filterSearch';


class Beneficiaries extends PureComponent {
	componentDidMount(){
		this.props.committeesBeneficiariesLoad();
	}
	filterSubmit = (e) => {
		this.props.committeesBeneficiariesLoadSearch(e.target.value);
		
	}
	render() {
		return (
			<Container className='dashboard'>
				<Row>
				<Col md={12}>
					<h3 className='page-title'>Dashboard Beneficiarios</h3>
					<h3 className='page-subhead subhead'>
					Listado de socios por comite
					</h3>
				</Col>
				</Row>
				<Card>
				<CardBody className='products-list'>
				<div className='card__title'>
					<ButtonToolbar className='products-list__btn-toolbar-top'>
						<FilterSearch onSubmit={this.filterSubmit} />
					</ButtonToolbar>
					</div>
				<Row>
					<Col md={12}>
					&nbsp;
					</Col>
				</Row>
				<Committees committees={this.props.committees}/>
				</CardBody>
				</Card>
			</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
    committees: state.beneficiaries.committees
});
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	committeesBeneficiariesLoad,
	committeesBeneficiariesLoadSearch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Beneficiaries);