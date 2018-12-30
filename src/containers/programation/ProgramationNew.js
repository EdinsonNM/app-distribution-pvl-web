import React, {PureComponent} from 'react';
import {
    Container,
    Col,
    Row,
} from 'reactstrap';
import Panel from '../../components/Panel';
import FormNewDistribution from './components/formNewProgramation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {zonesLoad}	from '../../redux/actions/zones';
import {committeesLoad}	from '../../redux/actions/committees';
import {programationCommitteesLoad, programationSave}	from '../../redux/actions/programation'
import {periodsLoad}	from '../../redux/actions/periods';
import {rationsLoad}	from '../../redux/actions/rations';

import CustomDate from '../../lib/custom-date';
import CustomArray from '../../lib/custom-array';
import DistributionRation from './components/programationRation';
import UtilColor from '../../lib/util-color';

class ProgramationNew extends PureComponent {
	state = {
		activeTab: '1',
		committees: [],
		form:{},
		maxDay: 31,
		percentege: 0,
		programations: [],
		disableForm: false
	}
	componentDidMount(){
		this.props.committeesLoad('', 0, 0);
	}

	handleChangeForm = (name) => (e) => {
		const {form} = this.state;
		this.setState({form: {...form, [name]: e.value}}, () => {
			this.calculeMaxDaysFromMonth();
			this.calculeRations();
			this.props.rationsLoad(this.props.periodDefault);
		})
	}
	componentDidUpdate(prevProps, prevState){
		if(!CustomArray.equals(prevProps.rations, this.props.rations) ){
			this.calculeRations();
		}
		if(prevProps.periodDefault !== this.props.periodDefault){
			this.props.committeesLoad('', 0, 0);
		}
		if(!CustomArray.equals(prevProps.committees, this.props.committees) ){
			let committees = this.props.committees.map(item => item.id)
			this.setState({committees},() => this.calculeRations())
			this.props.programationCommitteesLoad(committees);
		}
	}
	calculeMaxDaysFromMonth = () => {
		const {month} = this.state.form;
		if(this.props.periodDefault && month){
			let periodoName = this.props.periods.find(p => p.id === this.props.periodDefault).name;
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
		let programations = this.props.programationcommittees.map(c => {
			let rations = this.props.rations.map(r => ({
				rationId: r.id,
				productId: r.product.id,
				productName: r.product.name,
				totalRation: Math.floor((r.quantity / r.product.quantityConversion) * c.beneficiaries * this.state.form.days + 0.25),
				unitOfMeasure: r.product.unitOfMeasure,
				price: r.product.price
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
			programations.forEach(d => {
				value += d.rations.find(dr => dr.rationId === r.id).totalRation;
				beneficiaries += d.beneficiaries
			});
			return {
				...r,
				beneficiaries,
				value,
				name: r.product.name,
				unitOfMeasure: r.product.unitOfMeasure,
				fill: UtilColor.getRandomColor()
			}
		})
		this.setState({programations, rationsTotales})
	}
	onSubmit  = (form) => {
		const model = {
			periodId: this.props.periodDefault,
			month: form.month.value,
			days: form.days,
			distributions: this.state.rationsTotales,
			year: parseInt(this.props.periods.find(p => p.id === this.props.periodDefault).name.substring(0,4), 10)
		}
		this.setState({disableForm: true})
		this.props.programationSave(model, this.state.programations);
	}
	render(){
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
				<FormNewDistribution
				onSubmit={this.onSubmit}
				maxDay={this.state.maxDay}
				periods={this.props.periods}
				periodDefault={this.props.periodDefault}
				handleChangeForm={this.handleChangeForm}
				totalCommittees={this.props.committees.length}
				beneficiariesLoaded={this.props.committeeBenefLoaded}
				disableForm={this.state.disableForm}
				/>
				
				<Panel md="8" lg="8" title="Total de Ración programada" subhead={`Programación para ${this.state.committees.length} comites`} >
					<DistributionRation data={this.state.rationsTotales}  />
				</Panel>
			</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	periods: state.periods.data,
	committees: state.committees.committees,
	programationcommittees: state.programation.committees,
	rations: state.rations.data,
	committeeBenefLoaded: state.programation.committeeBenefLoaded,
	periodDefault: state.periods.periodDefault,
	totalForSave: state.programationdetail.totalSaved,
	totalSaved: state.programationdetail.totalSaved
});
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	programationCommitteesLoad,
	committeesLoad,
	zonesLoad,
	periodsLoad,
	rationsLoad,
	programationSave
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ProgramationNew);	
