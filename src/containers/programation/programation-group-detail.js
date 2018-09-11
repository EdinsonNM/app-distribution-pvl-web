import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {programationsLoad} from '../../redux/actions/programation';
import ProgramationList from './components/programation-list';

class ProgramationGroupDetail extends PureComponent {
	constructor(props){
		super(props);
		this.month = props.match.params.month
	}
	componentDidMount(){
		if(Object.keys(this.props.programationsGroup).length === 0)
			this.props.programationsLoad();
	}
	render() {
		const {programationsGroup = {}} = this.props
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
			{ Object.keys(programationsGroup).length &&
				<ProgramationList programations={this.props.programationsGroup[this.month].programations} />
			}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProgramationGroupDetail);