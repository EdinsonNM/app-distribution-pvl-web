import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Row, Container } from 'reactstrap';
import EditTable from '../../components/table/EditableTable';
import Pagination from '../../components/Pagination';
import {Link} from 'react-router-dom';

import MagnifyIcon from 'mdi-react/MagnifyIcon';
import { beneficiariesLoad, beneficiariesLoadSearch } from '../../redux/actions/beneficiaries';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class BeneficiariesList extends PureComponent {
	constructor(props) {
		super(props);
		this.committeeId = props.match.params.id
		this.heads = [
		{
			key: 'names',
			name: 'Nombres',
			sortable: true
		},
		{
			key: 'firstsurname',
			name: 'A. Paterno',
			sortable: true
		},
		{
			key: 'lastsurname',
			name: 'A. Materno',
			sortable: true
		},
		];
		
		this.state = {
		pageOfItems: []
		};
		this.onChangePage = this.onChangePage.bind(this);
	}
	componentDidMount() {
		this.props.beneficiariesLoadSearch(this.committeeId);
	}
	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({pageOfItems: pageOfItems});
	}
	filterSearch = (e) => {
		this.props.beneficiariesLoadSearch(this.committeeId, e.target.value);;
		e.preventDefault();
	}
	render() {
		return (
		<Container className='dashboard'>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Listado de beneficiarios por Comite</h3>
				<h3 className='page-subhead subhead'>
				Es la persona que recibe los beneficios del Programa de Vaso de Leche.
				</h3>
			</Col>
			</Row>
			<Row>
				<Col md={12} lg={12}>
				<Card>
				<CardBody className='products-list'>
					<div className='card__title'>
					<ButtonToolbar className='products-list__btn-toolbar-top'>
						<div className='form'>
						
						<div className='form__form-group products-list__search'>
							<input placeholder='Search...' name='search'onChange={this.filterSearch}/>
							<MagnifyIcon/>
						</div>
						</div>
						<Link className='btn btn-primary products-list__btn-add' to='/beneficiarios/new'>Nuevo Beneficiario</Link>
					</ButtonToolbar>
					</div>
					{ this.props.beneficiaries.length && <EditTable heads={this.heads} rows={this.props.beneficiaries} enableRowSelect/>}
					{ this.props.beneficiaries.length && <Pagination items={this.props.beneficiaries} onChangePage={this.onChangePage}/>}
				</CardBody>
				</Card>
			</Col>
			</Row>
		</Container>
		
		)
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		beneficiaries: state.beneficiaries.data
	}
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	beneficiariesLoad,
	beneficiariesLoadSearch
}, dispatch);
export default (connect(mapStateToProps, mapDispatchToProps)(BeneficiariesList)); 