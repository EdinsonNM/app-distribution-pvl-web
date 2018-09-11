import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import ProgramationGroupList from './components/programation-group-list';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {programationsLoad} from '../../redux/actions/programation';

class Programation extends PureComponent {
	componentDidMount(){
		this.props.programationsLoad();
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
				<Link className="btn btn-outline-success" to="programacion/new">Nueva programación</Link>
				</Col>
			</Row>
			<ProgramationGroupList programationsGroup={this.props.programationsGroup} />
		</Container>
		)
	}
}
const mapStateToProps = (state, ownProps) => ({
	programationsGroup: state.programation.programationsGroup
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	programationsLoad
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Programation);