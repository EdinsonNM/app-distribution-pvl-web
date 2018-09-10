import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import DistributionList from './components/programation-group-list';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {distributionsLoad} from '../../redux/actions/distribution';
import ProgramationList from './components/programation-list';

class ProgramationGroupDetail extends PureComponent {
	constructor(props){
		super(props);
		this.month = props.match.params.month
	}
	componentDidMount(){
		// this.props.distributionsLoad();
	}
	render() {
		return (
		<Container className='dashboard'>
			<Row>
				<Col md={12}>
					<h3 className='page-title'>Distribución PVL <span style={{color: 'orange'}}>PROGRAMACION</span></h3>
					<h3 className='page-subhead subhead'>
					Consiste en la programación y asignación mensual de productos a los diferentes comites.
					</h3>
				</Col>
			</Row>
			<Row>
				<Col md={12}>
				<Link class="btn btn-outline-success" to="programacion/new">Nueva programación</Link>
				</Col>
			</Row>
			<ProgramationList programations={this.props.distributionsGroup[this.month].distributions} />
		</Container>
		)
	}
}
const mapStateToProps = (state, ownProps) => ({
	distributionsGroup: state.distribution.distributionsGroup
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	distributionsLoad
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProgramationGroupDetail);