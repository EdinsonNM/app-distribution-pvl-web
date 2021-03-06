import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Table } from 'reactstrap';
import EditTable from '../../../components/table/EditableTable';
import Pagination from '../../../components/Pagination';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';
import { MagnifyIcon, DeleteIcon } from 'mdi-react';

const fnRemove = (value) => {
	//const deleteItem = () => store.dispatch(productDelete(value.value)); onClick={deleteItem}
	return <Button size="small" style={{color: 'gray'}}><DeleteIcon/></Button>
}

export default class ListTable extends PureComponent {

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
        key: 'product',
        name: 'Producto',
        sortable: true
      },
      {
        key: 'quantity',
        name: 'Cantidad',
        sortable: true,
      },
      {
        key: 'unityId',
        name: 'Unidad',
        sortable: true,
      },
      {
        key: 'entryDate',
        name: 'Fecha de ingreso',
        sortable: true,
      },
      {
        key: 'inputCode',
        name: 'Nro de Pecosa',
        sortable: true,
      }
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
      <Col md={12} lg={12}>
        <Card>
          <CardBody className='products-list'>
            <div className='card__title'>
              <ButtonToolbar className='products-list__btn-toolbar-top'>
                <form className='form'>
                  <div className='form__form-group products-list__search'>
                    <input placeholder='Search...' name='search' onChange={this.props.handleSearch}/>
                    <MagnifyIcon/>
                  </div>
                </form>
                <Link className='btn btn-primary products-list__btn-add' to='/pages/ingresos/new'>Nuevo Ingreso</Link>
              </ButtonToolbar>
            </div>
            {this.props.rows.length && <EditTable limit={10} heads={this.heads} rows={this.props.rows} enableRowSelect/>}
					  {this.props.rows.length && <Pagination items={this.props.rows} onChangePage={this.onChangePage}/>}
          </CardBody>
        </Card>
      </Col>
    )
  }
}
