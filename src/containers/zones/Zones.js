import React, {PureComponent} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PanelCommittees from './components/panelCommittees';
import PanelZones from './components/panelZones';
import { zoneSave, zonesLoad, zoneUpdate, zoneCommitteesLoad } from '../../redux/actions/zones';
import { committeesLoadSearch } from '../../redux/actions/committees';


class Zones extends PureComponent {
	state = {
		zone: {}
	}
	componentDidMount(){
		this.props.zonesLoad();
	}
	handleZoneSave = (values) => {
		console.log(values);
		this.props.zoneSave(values);
	}
	handleSelectZone = (zone) => () => {
		this.setState({zone});
		this.props.zoneCommitteesLoad(zone.committees || []);
		console.log(zone);
	}
	handleSearch = (value)  => {
		this.props.committeesLoadSearch(value.query);
	}
	handleAddCommittee = (committee) => () => {
		const {zone} = this.state;
		if(!zone.committees){
			zone.committees = [];
		}
		zone.committees.push(committee.id);
		this.props.zoneUpdate(zone);
	}
	render() {
		const {zone = {}} = this.state;
		return (
			<Container className='dashboard'>
				<Row>
					<Col md={12}>
					<h3 className='page-title'>Zonas de Distribución</h3>
					<h3 className='page-subhead subhead'>
						Asigne comites a zonas de distribución
					</h3>
					</Col>
				</Row>
				<Row>
					<PanelZones onSubmit={this.handleZoneSave} zones={this.props.zones} select={this.handleSelectZone}/>
					<PanelCommittees
						zoneCommittees={this.props.zoneCommittees}
						committees={this.props.committees}
						zone={zone}
						onSubmit={this.handleSearch}
						handleAddCommittee={this.handleAddCommittee}
					/>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	zones: state.zones.data,
	zoneCommittees: state.zones.committees,
	committees: state.committees.committees
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
	committeesLoadSearch,
	zonesLoad,
	zoneSave,
	zoneUpdate,
	zoneCommitteesLoad
}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Zones));