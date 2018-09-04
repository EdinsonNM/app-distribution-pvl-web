import React, {PureComponent} from 'react';
import { Col, Container, Row, CardBody, Card, ButtonToolbar } from 'reactstrap';
import Committees from './components/committees';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { committeesPartnersLoad, committeesPartnersLoadSearch } from '../../redux/actions/partners';
import { reduxForm } from 'redux-form';
import FilterCommittees from './components/filterCommittees';


class Partners extends PureComponent {
  componentDidMount(){
    this.props.committeesPartnersLoad();
  }
  filterSubmit = (e) => {
    this.props.committeesPartnersLoadSearch(e.target.value);
    
  }
  render() {
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Dashboard Socios</h3>
            <h3 className='page-subhead subhead'>
              Listado de socios por comite
            </h3>
          </Col>
        </Row>
        <Card>
        <CardBody className='products-list'>
        <div className='card__title'>
              <ButtonToolbar className='products-list__btn-toolbar-top'>
                <FilterCommittees onSubmit={this.filterSubmit} />
              </ButtonToolbar>
            </div>
          <Row>
            <Col md={12}>
            &nbsp;
            </Col>
          </Row>
          <Committees committees={this.props.committees}/>
          </CardBody>
          </Card>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    committees: state.partners.committees
  }
}
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  committeesPartnersLoad,
  committeesPartnersLoadSearch
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'committees_partners_form', // a unique identifier for this form
})(Partners));