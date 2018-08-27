import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Table } from 'reactstrap';
import EditTable from '../../../components/table/EditableTable';
import Pagination from '../../../components/Pagination';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import MagnifyIcon from 'mdi-react/MagnifyIcon';

class StatusFormatter extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired
  };
  
  render() {
    return (
      this.props.value === 'Enabled' ? <span className='badge badge-success'>Activo</span> :
        <span className='badge badge-disabled'>Inactivo</span>
    )
  }
}


export default class ProductsListTable extends PureComponent {
  
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
        name: 'Nombre',
        sortable: true
      },
      {
        key: 'urbancoreType',
        name: 'urbancoreType',
        sortable: true,
      },
      {
        key: 'urbancoreName',
        name: 'urbancoreName',
        sortable: true,
      },
      {
        key: 'populatedCenterType',
        name: 'populatedCenterType',
        sortable: true,
      },
      {
        key: 'populatedCenterName',
        name: 'populatedCenterName',
        sortable: true,
      },
      {
        key: 'addresstype',
        name: 'addresstype',
        sortable: true,
      }
      
      /*{
        key: 'category',
        name: 'Centro Poblado',
        sortable: true
      },
      {
        key: 'quantity',
        name: 'Nucleo Urbano',
        sortable: true
      },
      {
        key: 'articul',
        name: 'Responsable',
        sortable: true
      },
      {
        key: 'status',
        name: 'Status',
        sortable: true,
        formatter: StatusFormatter,
        width: 110
      },*/
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
        status: ['Enabled', 'Disabled'][Math.floor((Math.random() * 2))],
      });
    }
    return rows;
  };
  
  render() {
    return (
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
                <Link className='btn btn-primary products-list__btn-add' to='/pages/comite/new'>Nuevo Comite</Link>
              </ButtonToolbar>
            </div>
            <Table>
              <thead>
                <tr>{this.heads.map(head => <th>{head.name}</th>)}</tr>
              </thead>
              <tbody>
              {this.props.rows.map((row, index) => 
                <tr key={`row-${index}`}>
                  {
                    this.heads.map(head =>
                      <td {...(head.width? {width: head.width}: {})}>
                        {head.formatter ? head.formatter(row[head.key]) : row[head.key]}
                      </td>)
                  }
                </tr>
              )}
              </tbody>
            </Table>
            {this.props.rows.length && <Pagination items={this.props.rows} onChangePage={this.onChangePage}/>}
          </CardBody>
        </Card>
      </Col>
    )
  }
}
