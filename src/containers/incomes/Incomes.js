import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import ListTable from './components/ListTable';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { incomesLoad, incomesLoadSearch } from '../../redux/actions/incomes';


class Incomes extends PureComponent {
	componentDidMount(){
		this.props.incomesLoad('', 0, 0);
	}
	filterSearch = (e) => {
		this.props.incomesLoadSearch(e.target.value);;
		e.preventDefault();
	}
	render() {
		return (
			<Container className='dashboard'>
				<Row>
				<Col md={12}>
					<h3 className='page-title'>Ingreso de productos</h3>
					<h3 className='page-subhead subhead'>
						Son organizaciones sociales de base, tienen personería jurídica y existencia legal debidamente reconocidos por la Municipalidad
					</h3>
				</Col>
				</Row>
				<Row>
				<ListTable rows={this.props.incomes} handleSearch={this.filterSearch}/>
			</Row>
			</Container>
		)
	}
}
const mapStateToProps = (state, ownProps) => ({
    incomes: state.incomes.data
})

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	incomesLoad,
	incomesLoadSearch
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Incomes));