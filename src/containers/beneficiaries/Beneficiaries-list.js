import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Row , Container} from 'reactstrap';
import EditTable from '../../components/table/EditableTable';
import Pagination from '../../components/Pagination';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import MagnifyIcon from 'mdi-react/MagnifyIcon';


class PhotoFormatter extends PureComponent {
	static propTypes = {
		value: PropTypes.string.isRequired
	};
	
	render() {
		return (
		<div className='products-list__img-wrap'>
			<img src={this.props.value} alt=''/>
		</div>
		)
	}
}

class StatusFormatter extends PureComponent {
	static propTypes = {
		value: PropTypes.string.isRequired
	};
	
	render() {
		return (
		this.props.value === 'Enabled' ? <span className='badge badge-success'>Enabled</span> :
			<span className='badge badge-disabled'>Disabled</span>
		)
	}
}

export default class BeneficiariesList extends PureComponent {
	constructor(props) {
		super(props);
		this.heads = [
		{
			key: 'id',
			name: 'ID',
			width: 80,
			sortable: true
		},
		{
			key: 'name',
			name: 'Nombres',
			sortable: true
		},
		{
			key: 'category',
			name: 'Apellido Paterno',
			sortable: true
		},
		{
			key: 'quantity',
			name: 'Apellido Materno',
			sortable: true
		},
		{
			key: 'articul',
			name: 'Articul',
			sortable: true
		},
		{
			key: 'price',
			name: 'Price, $',
			sortable: true,
		},
		{
			key: 'status',
			name: 'Status',
			sortable: true,
			formatter: StatusFormatter,
			width: 110
		},
		];
		
		this.state = {
		rows: this.createRows(17),
		pageOfItems: []
		};
		this.createRows = this.createRows.bind(this);
		this.getRandomDate = this.getRandomDate.bind(this);
		this.onChangePage = this.onChangePage.bind(this);
	}
	
	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({pageOfItems: pageOfItems});
	}
	
	getRandomDate = (start, end) => {
		return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
	};
	
	createRows = (numberOfRows) => {
		let rows = [];
		
		for (let i = 1; i < numberOfRows + 1; i++) {
		rows.push({
			id: Math.min(99999, Math.round(Math.random() * 99999 + 1000)),
			name: ['Glass Vase', 'Pillow'][Math.floor((Math.random() * 2))],
			category: 'Home accessories',
			quantity: Math.min(400, Math.round(Math.random() * 400)),
			articul: 'art' + Math.min(99999, Math.round(Math.random() * 99999 + 1)),
			price: Math.min(1000, Math.random() * 1000 + 20).toFixed(2),
			status: ['Enabled', 'Disabled'][Math.floor((Math.random() * 2))],
		});
		}
		return rows;
	};
	
	render() {
		return (
			<Container className='dashboard'>
				<Row>
				<Col md={12}>
					<h3 className='page-title'>Beneficiarios</h3>
					<h3 className='page-subhead subhead'>
					Es la persona padre, madre o tutor que representa a uno o más usuarios o beneficiarios del Programa del Vaso de Leche.
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
								<Link className='btn btn-primary products-list__btn-add' to='new'>Nuevo Beneficiario</Link>
							</ButtonToolbar>
							</div>
							<EditTable heads={this.heads} rows={this.state.rows} enableRowSelect/>
							<Pagination items={this.state.rows} onChangePage={this.onChangePage}/>
						</CardBody>
						</Card>
					</Col>
				</Row>
      		</Container>
		)
	}
}
