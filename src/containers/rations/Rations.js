import React, {PureComponent} from 'react';
import { Col, Container, Row, CardBody, Card, ButtonToolbar } from 'reactstrap';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { periodRationsLoad, periodRationsLoadSearch } from '../../redux/actions/rations';
import Periods from './components/periods';
import FilterSearch from '../../components/filterSearch';


class Rations extends PureComponent {
	componentDidMount(){
		this.props.periodRationsLoad();
	}
	filterSubmit = (e) => {
		this.props.periodRationsLoadSearch(e.target.value);
		
	}
	render() {
		return (
		<Container className='dashboard'>

			<Card>
			<CardBody className='products-list'>
			<div className='card__title'>
				<ButtonToolbar className='products-list__btn-toolbar-top'>
					<FilterSearch onSubmit={this.filterSubmit} />
				</ButtonToolbar>
				<h3 className='page-title'>Raciones asignadas por periodo</h3>
				<h3 className='page-subhead subhead'>
				Listado de racioens asiganadas por periodo
				</h3>
			</div>
			</CardBody>
			</Card>
			<Periods periods={[this.props.period]}/>
		</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		period: state.rations.period
	}
}
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	periodRationsLoad,
	periodRationsLoadSearch
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Rations);