import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Row, Container } from 'reactstrap';
import EditTable from '../../../components/table/EditableTable';
import Pagination from '../../../components/Pagination';
import {Link} from 'react-router-dom';

import MagnifyIcon from 'mdi-react/MagnifyIcon';
export default class ProductsList extends PureComponent {

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
			name: 'Name',
			sortable: true
		},
		];
		
		this.state = {
		pageOfItems: []
		};

		this.onChangePage = this.onChangePage.bind(this);
	}
	
	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({pageOfItems: pageOfItems});
	}
	
	render() {
		return (
		<Container className='dashboard'>
			
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
						<Link className='btn btn-primary products-list__btn-add' to='productos/new'>Nuevo Producto</Link>
					</ButtonToolbar>
					</div>
					{this.props.rows.length && <EditTable heads={this.heads} rows={this.props.rows} enableRowSelect/>}
					{this.props.rows.length && <Pagination items={this.props.rows} onChangePage={this.onChangePage}/>}
				</CardBody>
				</Card>
			</Col>
			</Row>
		</Container>
		
		)
	}
}
