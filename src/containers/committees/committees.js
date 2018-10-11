import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import ListTable from './components/ListTable';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { committeesLoad, committeesLoadSearch } from '../../redux/actions/committees';


class Committees extends PureComponent {
  componentDidMount(){
    this.props.committeesLoad('', 0, 0);
  }
  filterSearch = (e) => {
    debugger;
    this.props.committeesLoadSearch(e.target.value);
    e.preventDefault();
  }
  componentDidUpdate(prevProps){
    if(this.props.periodDefault !== prevProps.periodDefault){
      this.props.committeesLoad('', 0, 0);
    }
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
          <ListTable rows={this.props.committees} handleSearch={this.filterSearch}/>
      </Row>
      </Container>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    committees: state.committees.committees,
    periodDefault: state.periods.periodDefault
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  committeesLoad,
  committeesLoadSearch
}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Committees));