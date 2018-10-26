import React, {PureComponent} from 'react';
import { Col, Container, Row, CardBody, Card, ButtonToolbar, Button } from 'reactstrap';
import Committees from './components/committees';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { committeesBeneficiariesLoad, committeesBeneficiariesLoadSearch, committeesBeneficiariesLoadPageback, committeesBeneficiariesLoadPagenext } from '../../redux/actions/beneficiaries';
import FilterSearch from '../../components/filterSearch';
import { KeyboardArrowLeftIcon, KeyboardArrowRightIcon } from 'mdi-react';


class Beneficiaries extends PureComponent {
	componentDidMount(){
		this.props.committeesBeneficiariesLoad();
	}
	filterSubmit = (e) => {
		this.props.committeesBeneficiariesLoadSearch(e.target.value);
		
	}
	getPager = () => {
		let total = Math.floor(this.props.totalCommittees / 10);
		return {
			total
		}
	}
	render() {
		let pager = this.getPager();
    	const {totalCommittees, pageCommittees} = this.props
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
				<Row>
				<Col xs="2">
				{pageCommittees > 0 && <Button size="sm" color='primary' outline onClick={this.props.committeesBeneficiariesLoadPageback}><KeyboardArrowLeftIcon /> Atras</Button>}
				</Col>
				<Col xs="8" className="text-center">Del {pageCommittees*10 + 1} al {pageCommittees*10 +10} de {totalCommittees} registros</Col>
				<Col xs="2" className="text-right">
				{(pageCommittees < pager.total) &&<Button size="sm" color='primary' outline onClick={this.props.committeesBeneficiariesLoadPagenext}>Siguiente <KeyboardArrowRightIcon /></Button>}
				</Col>
			</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	committees: state.beneficiaries.committees,
	pageCommittees:state.beneficiaries.pageCommittees,
	totalCommittees:state.beneficiaries.totalCommittees,
});
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	committeesBeneficiariesLoad,
	committeesBeneficiariesLoadSearch,
	committeesBeneficiariesLoadPageback,
	committeesBeneficiariesLoadPagenext
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Beneficiaries);