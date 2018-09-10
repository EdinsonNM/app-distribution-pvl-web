import React, {PureComponent} from 'react';
import {
    Container,
    Col,
    Row,
    Progress
} from 'reactstrap';
import Panel from '../../components/Panel';
import FormNewDistribution from './components/formNewProgramation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {zonesLoad}	from '../../redux/actions/zones';
import {committeesLoad}	from '../../redux/actions/committees';
import {distributionCommitteesLoad, distributionSave}	from '../../redux/actions/distribution'
import {periodsLoad}	from '../../redux/actions/periods';
import {rationsLoad}	from '../../redux/actions/rations';

import FormSearch from './components/formSearch';
import CustomDate from '../../lib/custom-date';
import CustomArray from '../../lib/custom-array';
import DistributionRation from './components/programationRation';
import UtilColor from '../../lib/util-color';
import { UNIT_MEASURENMENT_ABREV } from '../../contants/unit_of _measurement';
import beneficiaries from '../../redux/epics/beneficiaries';

class ProgramationNew extends PureComponent {
	state = {
		activeTab: '1',
		committees: [],
		form:{},
		maxDay: 31,
		percentege: 0,
		distributions: []
	}
	componentDidMount(){
		this.props.committeesLoad('', 0, 0);
		this.props.zonesLoad();
		this.props.periodsLoad();
	}
	handleToggletab = (activeTab) => () => {
		this.setState({ activeTab})
	}

	handleAddZone = (zone) => () => {
		let {committees} = this.state;
		const zoneCommittees = zone.committees || [];
		// committees = [...committees, ...zoneCommittees];
		committees = Array.from(new Set([...committees, ...zoneCommittees]));
		this.props.distributionCommitteesLoad(committees);
		this.setState({committees}, () => this.calculeRations())
	}
	handleChangeForm = (name) => (e) => {
		const {form} = this.state;
		this.setState({form: {...form, [name]: e.value}}, () => {
			this.calculeMaxDaysFromMonth();
			this.calculeRations();
			this.props.rationsLoad(this.state.form.period);
		})
	}
	componentDidUpdate(prevProps, prevState){
		if(!CustomArray.equals(prevProps.rations, this.props.rations) ){
			this.calculeRations();
		}
		if(!CustomArray.equals(prevProps.committees, this.props.committees) ){
			let committees = this.props.committees.map(item => item.id)
			this.setState({committees},() => this.calculeRations())
			this.props.distributionCommitteesLoad(committees);
		}
	}
	calculeMaxDaysFromMonth = () => {
		const {period, month} = this.state.form;
		if(period && month){
			let periodoName = this.props.periods.find(p => p.id === period).name;
			let objPeriod = CustomDate.getObjectPeriod(periodoName);
			let maxDay = CustomDate.daysInMonth(month + 1, objPeriod.year);
			this.setState({maxDay}, () => {
				if(this.state.form.days && this.state.maxDay){
					let percentege = Math.round(parseFloat( parseInt(this.state.form.days, 10) * 100/ parseInt(this.state.maxDay, 10) ) )
					this.setState({percentege})
				}
			});
		}
	}
	calculeRations = () => {
		let distributions = this.props.distributioncommittees.map(c => {
			let rations = this.props.rations.map(r => ({
				rationId: r.id,
				productId: r.product.id,
				productName: r.product.name,
				totalRation: r.quantity * c.beneficiaries * this.state.form.days,
				unity: r.unity
			}));
			return {
				committeeId: c.id,
				committeeName: c.name,
				beneficiaries: c.beneficiaries,
				rations
			}
		})
		// const colors = ['#4ce1b6', '#70bbfd', '#f6da6e', '#ff4861'];
		let rationsTotales = this.props.rations.map((r, index) => {
			let value = 0;
			let beneficiaries = 0;
			distributions.forEach(d => {
				value += d.rations.find(dr => dr.rationId === r.id).totalRation;
				beneficiaries += d.beneficiaries
			});
			return {
				...r,
				beneficiaries,
				value,
				name: r.product.name,
				unity: r.unity,
				fill: UtilColor.getRandomColor()
			}
		})
		this.setState({distributions, rationsTotales})
	}
	onSubmit  = (form) => {
		console.log(form);
		debugger;
		const model = {
			periodId: form.period.value,
			month: form.month.value,
			days: form.days,
			committees: this.state.committees,
			distributions: this.state.rationsTotales
		}
		this.props.distributionSave(model)
	}
	render(){
		//let colors  = ['pink', 'blue', 'violet', 'yellow'];
		const colors = ['#4ce1b6', '#70bbfd', '#f6da6e', '#ff4861']

		const {distributions} = this.state;
		return(
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
				<FormNewDistribution onSubmit={this.onSubmit}  maxDay={this.state.maxDay} periods={this.props.periods} handleChangeForm={this.handleChangeForm} />
				
				<Panel md="8" lg="8" title="Total de Ración programada" subhead={`Programación para ${this.state.committees.length} comites`} >
					<DistributionRation data={this.state.rationsTotales}  />
				</Panel>
			</Row>
			
				<Row>
				{/*
					distributions.map(c => {
						let data = c.rations.map((r, index) => ({
							value: r.totalRation,
							unity: UNIT_MEASURENMENT_ABREV[r.unity],
							name: r.productName,
							fill: colors[index]
						}));
						return (
							<Panel xs="12" sm="12" md="4" lg="4" title={c.committeeName} subhead={""}>
								<DistributionRation data={data} />
							</Panel>
						)
					})	
				*/}
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	periods: state.periods.data,
	zones: state.zones.data,
	committees: state.committees.committees,
	distributioncommittees: state.distribution.committees,
	rations: state.rations.data
});
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	distributionCommitteesLoad,
	committeesLoad,
	zonesLoad,
	periodsLoad,
	rationsLoad,
	distributionSave
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProgramationNew);	
