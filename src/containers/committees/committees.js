import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import ProductsListTable from './components/ProductsListTable';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { committeesLoad } from '../../redux/actions/committees';


class Committees extends PureComponent {
  componentDidMount(){
    this.props.load();
  }
  render() {
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Comites</h3>
            <h3 className='page-subhead subhead'>
                Son organizaciones sociales de base, tienen personería jurídica y existencia legal debidamente reconocidos por la Municipalidad
            </h3>
          </Col>
        </Row>
        <Row>
          <ProductsListTable rows={this.props.committees}/>
      </Row>
      </Container>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    committees: state.committees.committees
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  load: committeesLoad
}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Committees));