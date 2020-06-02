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
import CustomArray from '../../../lib/custom-array';
import store from '../../../app/store';
import { committeesDelete } from '../../../redux/actions/committees';

import {MagnifyIcon,DeleteIcon,EditIcon} from 'mdi-react';
import { Button } from '@material-ui/core';

const fnRemove = (value) => {
	const deleteItem = () => store.dispatch(committeesDelete(value.value))
	return <Button size="small" style={{color: 'gray'}} onClick={deleteItem}><DeleteIcon/></Button>
}
export default class ListTable extends PureComponent {
  
  constructor(props) {
    super(props);
    this.heads = [

      {
        key: 'name',
        name: 'Nombre',
        sortable: true
      },
      {
        key: 'populatedCenterName',
        name: 'Centro Poblado',
        sortable: true,
      },
      {
        key: 'populatedCenterType',
        name: 'Tipo Zona',
        sortable: true,
      },

      {
        key: 'urbancoreName',
        name: 'Núcleo urbano',
        sortable: true,
      },
      {
        key: 'id',
        name: 'Quitar',
        width: 80,
        formatter: fnRemove
      },
    ];
    
    this.state = {
      rows: [],
      pageOfItems: [],
      page: 1
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.limit = 10;    
  }
  
  onChangePage(pageOfItems) {
    this.setState({rows: pageOfItems});
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(!CustomArray.equals(this.props.rows, prevProps.rows)){
      let rows = this.props.rows.slice(0, 10);
      this.setState({rows});
    }
  }
  
  render() {
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody className='products-list'>
            <div className='card__title'>
              <ButtonToolbar className='products-list__btn-toolbar-top'>
                <div className='form'>
                  <div className='form__form-group products-list__search'>
                    <input placeholder='Search...' name='search' onChange={this.props.handleSearch}/>
                    <MagnifyIcon/>
                  </div>
                </div>
                <Link className='btn btn-primary products-list__btn-add' to='/pages/comite/new'>Nuevo Comite</Link>
              </ButtonToolbar>
            </div>
            <EditTable limit={10} heads={this.heads} rows={this.state.rows} enableRowSelect/>
					  {this.props.rows.length && <Pagination page={this.state.page} items={this.props.rows} onChangePage={this.onChangePage} initialPage={1}/>}
          </CardBody>
        </Card>
      </Col>
    )
  }
}