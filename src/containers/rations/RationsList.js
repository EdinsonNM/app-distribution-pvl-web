import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Row, Container } from 'reactstrap';
import EditTable from '../../components/table/EditableTable';
import Pagination from '../../components/Pagination';
import {Link} from 'react-router-dom';

import MagnifyIcon from 'mdi-react/MagnifyIcon';
import {rationsLoad} from '../../redux/actions/rations';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {UNIT_MEASURENMENT} from '../../contants/unit_of _measurement';
import store from '../../app/store';

const fnUnity = (value) => {
	return <div>{UNIT_MEASURENMENT[value.value]}</div>;
}
const fnProduct = (value) => {
	const products = store.getState().products.data;
	const product = products.find(p => p.id === value.value)
	return <div>{product.name}</div>
	
}
class RationsList extends PureComponent {
	constructor(props) {
		super(props);
		this.periodId = props.match.params.id
		this.heads = [
		{
			key: 'id',
			name: 'ID',
			width: 80,
			sortable: true
		},
		{
			key: 'productId',
			name: 'Producto',
			sortable: true,
			formatter: fnProduct
		},
		{
			key: 'quantity',
			name: 'Cantidad',
			sortable: true
		},
		{
			key: 'unity',
			name: 'Unidad',
			sortable: true,
			formatter: fnUnity
		},
		];
		
		this.state = {
		pageOfItems: []
		};
		this.onChangePage = this.onChangePage.bind(this);
	}
	componentDidMount() {
	this.props.rationsLoad(this.periodId);
	}
	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({pageOfItems: pageOfItems});
	}
	
	render() {
		return (
		<Container className='dashboard'>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Detalles Periodo</h3>
				<h3 className='page-subhead subhead'>
				Asignación de productos por periodo
				</h3>
			</Col>
			</Row>
			<Row>
				<Col md={12} lg={12}>
				<Card>
				<CardBody className='products-list'>
					<div className='card__title'>
					<ButtonToolbar className='products-list__btn-toolbar-top'>
						<form className='form'>
						<div className='form__form-group products-list__search'>
							<input placeholder='Search...' name='search'/>
							<MagnifyIcon/>
						</div>
						</form>
						<Link className='btn btn-primary products-list__btn-add' to={`${this.periodId}/new`}>Nueva ración</Link>
					</ButtonToolbar>
					</div>
					{ this.props.rations.length ? <EditTable heads={this.heads} rows={this.props.rations} enableRowSelect/> : ''}
					{ this.props.rations.length ? <Pagination items={this.props.rations} onChangePage={this.onChangePage}/> : ''}
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
		rations: state.rations.data,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	rationsLoad
}, dispatch);
export default (connect(mapStateToProps, mapDispatchToProps)(RationsList)); 