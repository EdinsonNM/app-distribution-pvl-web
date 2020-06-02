import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Row, Container } from 'reactstrap';
import EditTable from '../../components/table/EditableTable';
import Pagination from '../../components/Pagination';
import {Link} from 'react-router-dom';
import store from '../../app/store';
import CustomArray from '../../lib/custom-array';
//import MagnifyIcon from 'mdi-react/MagnifyIcon';
import {
    beneficiariesLoad,
    beneficiariesLoadSearch,
	committeeSelected,
	beneficiaryDelete
} from '../../redux/actions/beneficiaries';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {MagnifyIcon,DeleteIcon,EditIcon} from 'mdi-react';
import { Button } from '@material-ui/core';

const fnRemove = (value) => {
	const editItem = () => store.dispatch(beneficiaryDelete(value.value))
	return <Button size="small" style={{color: 'gray'}} onClick={editItem}><DeleteIcon/></Button>
}
const fnEdit = (value) => {
	const deleteItem = () => alert('Vamos bien');//store.dispatch(productDelete(value.value))
	return <Button size="small" style={{color: 'gray'}} onClick={deleteItem}><DeleteIcon/></Button>
}
class BeneficiariesList extends PureComponent {
	constructor(props) {
		super(props);
		this.committeeId = props.match.params.id;
		this.props.committeeSelected(this.committeeId)
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
		/*{
			key: 'id',
			name: 'Editar',
			width: 80,
			formatter: fnEdit
		  },*/
		  {
			key: 'id',
			name: 'Quitar',
			width: 80,
			formatter: fnRemove
		  },
		];
		this.state = {
					pageOfItems: []
		  };
		this.limit = 10;
		this.onChangePage = this.onChangePage.bind(this);
	}
	componentDidMount() {
			
		this.props.beneficiariesLoadSearch(this.committeeId);
	}
	componentDidUpdate(prevProps, prevState, snapshot){
		if(!CustomArray.equals(this.props.beneficiaries, prevProps.beneficiaries)){
		  let rows = this.props.beneficiaries.slice(0, 10);
		  this.setState({rows});
		}
	  }
	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({rows: pageOfItems});
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
						<Link className='btn btn-primary products-list__btn-add' to='/pages/beneficiarios/new'>Nuevo Beneficiario</Link>
					</ButtonToolbar>
					</div>					
					{ this.props.beneficiaries.length && <EditTable heads={this.heads}  rows={this.state.rows}  enableRowSelect/>}
					{ this.props.beneficiaries.length && <Pagination  limit={this.limit} page={this.state.page} items={this.props.beneficiaries} onChangePage={this.onChangePage}  initialPage={1}	/>}
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
	beneficiariesLoadSearch,
	committeeSelected
}, dispatch);
export default (connect(mapStateToProps, mapDispatchToProps)(BeneficiariesList)); 