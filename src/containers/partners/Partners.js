import React, {PureComponent} from 'react';
import {
    Col,
    Container,
    Row,
    CardBody,
    Card,
    ButtonToolbar,
    ButtonGroup,
    Button
} from 'reactstrap';
import Committees from './components/committees';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { committeesPartnersLoad, committeesPartnersLoadSearch, committeesPartnersLoadPagenext, committeesPartnersLoadPageback } from '../../redux/actions/partners';
import { reduxForm } from 'redux-form';
import FilterCommittees from './components/filterCommittees';
import { KeyboardArrowLeftIcon , KeyboardArrowRightIcon} from 'mdi-react';


class Partners extends PureComponent {
  componentDidMount(){
    this.props.committeesPartnersLoad();
  }
  componentDidUpdate(prevProps){
    if(this.props.periodDefault !== prevProps.periodDefault){
      this.props.committeesPartnersLoad();
    }
  }
  filterSubmit = (e) => {
    this.props.committeesPartnersLoadSearch(e.target.value);
    e.preventDefault();
    
  }
  getPager = () => {
    let total = Math.floor(this.props.totalCommittees / 10);
    return {
      total
    }
  }
  render() {
    let pager = this.getPager();
    const {totalCommittees, pageCommittees} = this.props
    return (
      <Container className='dashboard'>
        <Row>
          <Col md={12}>
            <h3 className='page-title'>Socios por Comite</h3>
            <h3 className='page-subhead subhead'>
              Seleccione un comite y a continuación en <a href="/socios/dashboard">Ver socios</a> para visualizar el listado de socios vinculados
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
          <Row>
            <Col xs="2">
            {pageCommittees > 0 && <Button size="sm" color='primary' outline onClick={this.props.committeesPartnersLoadPageback}><KeyboardArrowLeftIcon /> Atras</Button>}
            </Col>
            <Col xs="8" className="text-center">Del {pageCommittees*10 + 1} al {pageCommittees*10 +10} de {totalCommittees} registros</Col>
            <Col xs="2" className="text-right">
            {(pageCommittees < pager.total) &&<Button size="sm" color='primary' outline onClick={this.props.committeesPartnersLoadPagenext}>Siguiente <KeyboardArrowRightIcon /></Button>}
            </Col>
          </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    totalCommittees: state.partners.totalCommittees,
    committees: state.partners.committees,
    periodDefault: state.periods.periodDefault,
    pageCommittees:state.partners.pageCommittees,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  committeesPartnersLoad,
  committeesPartnersLoadSearch,
  committeesPartnersLoadPagenext,
  committeesPartnersLoadPageback
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'committees_partners_form', // a unique identifier for this form
})(Partners));