import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Row, Container } from 'reactstrap';
import EditTable from '../../components/table/EditableTable';
import Pagination from '../../components/Pagination';
import {Link} from 'react-router-dom';

import MagnifyIcon from 'mdi-react/MagnifyIcon';
import { partnersLoad, partnersLoadSearch } from '../../redux/actions/partners';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomArray from '../../lib/custom-array';

class PartnersList extends PureComponent {
  
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
    this.limit = 10;
  }
  componentDidMount() {
    this.props.partnersLoadSearch(this.committeeId);
  }
  onChangePage(pageOfItems) {
    //debugger;
    this.setState({rows: pageOfItems});
  }
  filterSearch = (e) => {
    this.props.partnersLoadSearch(this.committeeId, e.target.value);;
    e.preventDefault();
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(!CustomArray.equals(this.props.partners, prevProps.partners)){
      let rows = this.props.partners.slice(0, this.limit);
      this.setState({rows});
    }
  }
  render() {
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Socios</h3>
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
                    <div className='form'>
                    
                      <div className='form__form-group products-list__search'>
                        <input placeholder='Search...' name='search'onChange={this.filterSearch}/>
                        <MagnifyIcon/>
                      </div>
                    </div>
                    <Link className='btn btn-primary products-list__btn-add' to='/pages/socios/new'>Nuevo Socio</Link>
                  </ButtonToolbar>
                </div>
                <EditTable heads={this.heads} rows={this.state.rows} enableRowSelect/>
                { this.props.partners.length && <Pagination limit={this.limit} items={this.props.partners} onChangePage={this.onChangePage} initialPage={1}/>}
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
    partners: state.partners.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  partnersLoad,
  partnersLoadSearch
}, dispatch);
export default (connect(mapStateToProps, mapDispatchToProps)(PartnersList)); 