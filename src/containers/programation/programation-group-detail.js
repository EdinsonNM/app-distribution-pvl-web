import React, {PureComponent} from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {programationsLoad} from '../../redux/actions/programation';
import {zonesLoad} from '../../redux/actions/zones';

import ProgramationList from './components/programation-list';
import ProgramationRation from './components/programationRation';
import Panel from '../../components/Panel';
import FormSearchZone from './components/formSearchZone';
import ListDistribution from './components/listDistribution';
import {programationdetailsLoad, programationdetailsUpdatedistribution, programationdetailConfirmDistribution, programationdetailRemoveDistribution} from '../../redux/actions/programation-detail';
import UtilColor from '../../lib/util-color';
import FormSearchCommittee from './components/formSearchCommittee';
import { committeesLoadSearch } from '../../redux/actions/committees';

const myColors = UtilColor.getArrayColors();
class ProgramationGroupDetail extends PureComponent {
	constructor(props){
		super(props);
		this.month = props.match.params.month
		this.state = {
			activeSearchZone: false,
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
		this.props.programationdetailsUpdatedistribution(programation.id, committees)
	}
	handleAddCommittee = (committee) => () => {
		let {committees, programation} = this.state;
		committees = Array.from(new Set([...committees, committee.id]));
		this.props.programationdetailsUpdatedistribution(programation.id, committees)
		
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
				fill: myColors[index]
			}
		})
		return rationsTotales;
	}
	renderDistribution = () => {
		const {programation, activeSearchZone} = this.state;
		const {distributions} = this.props;
		let totalDistributions = this.calculeDistributions();
		return (
			<Container className='dashboard'>
				<Row>
					<Panel md="4" lg="4" title="Total de Ración programada" subhead={`${programation.days} días programados`} >
						<ProgramationRation data={programation.distributions} title={programation.month} />
					</Panel>
					<Panel md="4" lg="4" title="Total de Ración distribuida" subhead={`${programation.days} días programados`} >
						<ProgramationRation data={totalDistributions} title={programation.month} />
					</Panel>
					<Panel md="4" lg="4" title={activeSearchZone ? "Listado de Zonas":"Listado de Comites"} subhead='Total de comites'  onChangeRefresh = {this.handleChangeSearch}>
					{
						(activeSearchZone) ?
							<FormSearchZone zones={this.props.zones} handleAddZone={this.handleAddZone} onChangeForm = {this.handleChangeSearch}/>
							:
							<FormSearchCommittee committees={this.props.committees} search={this.props.committeesLoadSearch} handleAddCommittee={this.handleAddCommittee} onChangeForm = {this.handleChangeSearch}/>
					}
					</Panel>
				</Row>
				<Row>
					<Panel md="12" lg="12" title="Listado de Comites Programados" subhead='Total de comites' >
						<ListDistribution committees={this.state.committees} distributions={distributions.filter(item => !item.withActa)}
						programationdetailConfirmDistribution={this.props.programationdetailConfirmDistribution}
						programationdetailRemoveDistribution={this.props.programationdetailRemoveDistribution}
						/>
					</Panel>
					
				</Row>
				<Row>
					<Panel md="12" lg="12" title="Listado de Comites Distribuidos" subhead='Total de comites' >
						<ListDistribution committees={this.state.committees} distributions={distributions.filter(item => item.withActa)}
						programationdetailConfirmDistribution={this.props.programationdetailConfirmDistribution}/>
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
	committees: state.committees.committees,
	programationsGroup: state.programation.programationsGroup,
	zones: state.zones.data,
	distributions: state.programationdetail.distributions
})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	committeesLoadSearch,
	programationsLoad,
	zonesLoad,
	programationdetailsUpdatedistribution,
	programationdetailsLoad,
	programationdetailConfirmDistribution,
	programationdetailRemoveDistribution
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProgramationGroupDetail);