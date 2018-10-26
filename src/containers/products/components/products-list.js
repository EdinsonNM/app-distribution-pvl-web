import React, {PureComponent} from 'react';
import {
    ButtonToolbar,
    Card,
    CardBody,
    Col,
    Row,
    Container,
} from 'reactstrap';
import EditTable from '../../../components/table/EditableTable';
import Pagination from '../../../components/Pagination';
import {Link} from 'react-router-dom';
import { MagnifyIcon, DeleteIcon } from 'mdi-react';
import {UNIT_MEASURENMENT} from '../../../contants/unit_of _measurement';
import { productDelete } from '../../../redux/actions/products';
import store from '../../../app/store';
import { Button } from '@material-ui/core';



const renderUnit = (value) => {
	return <div>{UNIT_MEASURENMENT[value.value]}</div>
}
const renderOptions = (value) => {
	return <Link to={`productos/edit/${value.value}`}>Editar</Link>
}

const fnRemove = (value) => {
	const deleteItem = () => store.dispatch(productDelete(value.value));
	return <Button size="small" style={{color: 'gray'}} onClick={deleteItem}><DeleteIcon/></Button>
}
export default class ProductsList extends PureComponent {

	constructor(props) {
		super(props);
		this.heads = [
		{
			key: 'id',
			name: 'Quitar',
			width: 80,
			formatter: fnRemove
		},
		{
			key: 'name',
			name: 'Name',
			sortable: true
		},
		{
			key: 'unitOfMeasure',
			name: 'Unidad',
			sortable: true,
			formatter: renderUnit
		},
		{
			key: 'unitOfMeasureConversion',
			name: 'Unidad Ración',
			sortable: true,
			formatter: renderUnit
		},
		{
			key: 'quantityConversion',
			name: 'Equivalencia',
			sortable: true,
		},
		{
			key: 'id',
			name: 'options',
			formatter: renderOptions
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
					{this.props.rows.length && <EditTable heads={this.heads} rows={this.props.rows} />}
					{this.props.rows.length && <Pagination items={this.props.rows} onChangePage={this.onChangePage}/>}
				</CardBody>
				</Card>
			</Col>
			</Row>
		</Container>
		
		)
	}
}
