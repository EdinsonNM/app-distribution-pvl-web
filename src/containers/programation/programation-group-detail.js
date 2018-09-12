import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {programationsLoad} from '../../redux/actions/programation';
import {zonesLoad} from '../../redux/actions/zones';

import ProgramationList from './components/programation-list';
import ProgramationRation from './components/programationRation';
import Panel from '../../components/Panel';
import FormSearch from './components/formSearch';
import ListDistribution from './components/listDistribution';
import {programationdetailsLoad, programationdetailsUpdatedistribution} from '../../redux/actions/programation-detail';
import UtilColor from '../../lib/util-color';

class ProgramationGroupDetail extends PureComponent {
	constructor(props){
		super(props);
		this.month = props.match.params.month
		this.state = {
			activeSearchZone: true,
			committees: [],
			showListDistribution: false
		}
	}
	componentDidMount(){
		this.props.zonesLoad();
		if(Object.keys(this.props.programationsGroup).length === 0)
			this.props.programationsLoad();
	}
	handleAddDistribution = (programation) => () => {
		this.setState({showListDistribution: true, programation})
		this.props.programationdetailsLoad(programation.id);
	}
	handleAddZone = (zone) => () => {
		let {committees, programation} = this.state;
		const zoneCommittees = zone.committees || [];
		committees = Array.from(new Set([...committees, ...zoneCommittees]));
		//this.props.programationCommitteesLoad(committees);
		this.props.programationdetailsUpdatedistribution(programation.id, committees)
		//this.setState({committees})
	}
	handleChangeSearch = (status) => {
		let {activeSearchZone} = this.state;
		activeSearchZone = !activeSearchZone;
		this.setState({activeSearchZone});
	}
	calculeDistributions = () => {
		const {distributions = []} = this.props;
		let rations = [];
		if(distributions.length){
			rations = distributions[0].rations.map(r => ({
				productId: r.productId,
				productName: r.productName,
				unitOfMeasure: r.unitOfMeasure
			}))
		}
		let rationsTotales = rations.map((ration, index) => {
			let value = 0;
			distributions.map(d => {
				value += d.rations.find(r => r.productId === ration.productId).totalRation
			})
			return {
				productId: ration.productId,
				value,
				name: ration.productName,
				product: {
					id: ration.productId,
					name: ration.productName,
				},
				unitOfMeasure: ration.unitOfMeasure,
				fill: UtilColor.getRandomColor()
			}
		})
		return rationsTotales;
	}
	renderDistribution = () => {
		const {programation} = this.state;
		const {distributions} = this.props;
		let totalDistributions = this.calculeDistributions();
		debugger;
		return (
			<Container className='dashboard'>
				<Row>
					<Panel md="4" lg="4" title="Total de Ración programada" subhead={`${programation.days} días programados`} >
						<ProgramationRation data={programation.distributions} title={programation.month} />
					</Panel>
					<Panel md="4" lg="4" title="Total de Ración distribuida" subhead={`${programation.days} días programados`} >
						<ProgramationRation data={totalDistributions} title={programation.month} />
					</Panel>
					<Panel md="4" lg="4" title="Listado de Comites" subhead='Total de comites'  onChangeRefresh = {this.handleChangeSearch}>
					{
						(this.state.activeSearchZone) ?
							<FormSearch zones={this.props.zones} handleAddZone={this.handleAddZone} />
							:
							<div>Filter by comite</div>
					}
					</Panel>
				</Row>
				<Row>
					<Panel md="12" lg="12" title="Listado de Comites Distribuidos" subhead='Total de comites' >
						<ListDistribution committees={this.state.committees} distributions={distributions}/>
					</Panel>
					<Panel md="12" lg="12" title="Listado de Comites Distribuidos con acta" subhead='Total de comites' >
						<ListDistribution committees={this.state.committees} distributions={distributions}/>
					</Panel>
				</Row>
			</Container>
		)
	}
	renderListProgramation = () => {
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
					{ Object.keys(programationsGroup).length &&
						<ProgramationList
							handleAddDistribution={this.handleAddDistribution}
							programations={this.props.programationsGroup[this.month].programations}
						/>
					}
				</Row>
			</Container>
		)
	}
	render() {
		const {showListDistribution} = this.state;
		return (!showListDistribution ? this.renderListProgramation() : this.renderDistribution());
	}
}
const mapStateToProps = (state, ownProps) => ({
	programationsGroup: state.programation.programationsGroup,
	zones: state.zones.data,
	distributions: state.programationdetail.distributions
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	programationsLoad,
	zonesLoad,
	programationdetailsUpdatedistribution,
	programationdetailsLoad
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProgramationGroupDetail);