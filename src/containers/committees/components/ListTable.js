import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Table } from 'reactstrap';
import EditTable from '../../../components/table/EditableTable';
import Pagination from '../../../components/Pagination';
import {Link} from 'react-router-dom';

import MagnifyIcon from 'mdi-react/MagnifyIcon';
import CustomArray from '../../../lib/custom-array';


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
      
    ];
    
    this.state = {
      rows: [],
      pageOfItems: [],
      page: 1
    };

    this.onChangePage = this.onChangePage.bind(this);
  }
  
  onChangePage(pageOfItems) {
    //debugger;
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
