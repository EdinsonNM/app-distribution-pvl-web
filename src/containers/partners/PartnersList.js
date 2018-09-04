import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Row, Container } from 'reactstrap';
import EditTable from '../../components/table/EditableTable';
import Pagination from '../../components/Pagination';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import MagnifyIcon from 'mdi-react/MagnifyIcon';
import {partnersLoad} from '../../redux/actions/partners';
import withRouter from '../committees/committees';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PartnersList extends PureComponent {
  
  constructor(props) {
    super(props);
    this.committeeId = props.match.params.id
    this.heads = [
      {
        key: 'id',
        name: 'ID',
        width: 80,
        sortable: true
      },
      {
        key: 'names',
        name: 'Names',
        sortable: true
      },
      {
        key: 'firstsurname',
        name: 'Names',
        sortable: true
      },
      {
        key: 'lastsurname',
        name: 'Names',
        sortable: true
      },
    ];
    
    this.state = {
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
  }
  componentDidMount() {
   this.props.partnersLoad(this.committeeId);
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
                    <form className='form'>
                      <div className='form__form-group products-list__search'>
                        <input placeholder='Search...' name='search'/>
                        <MagnifyIcon/>
                      </div>
                    </form>
                    <Link className='btn btn-primary products-list__btn-add' to='/e-commerce/product_edit'>Nuevo Comite</Link>
                  </ButtonToolbar>
                </div>
                { this.props.partners && <EditTable heads={this.heads} rows={this.props.partners} enableRowSelect/>}
                { this.props.partners && <Pagination items={this.props.partners} onChangePage={this.onChangePage}/>}
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
  partnersLoad
}, dispatch);
export default (connect(mapStateToProps, mapDispatchToProps)(PartnersList)); 