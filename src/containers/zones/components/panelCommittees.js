import React, {PureComponent} from 'react';
import Panel from '../../../components/Panel';
import { Field , reduxForm} from 'redux-form';
import { MagnifyIcon, SearchIcon, AddIcon } from 'mdi-react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Table, Button, Alert } from 'reactstrap';
import classnames from 'classnames';

class PanelCommittees extends PureComponent {
	state = {
		activeTab: '1'
	}
	toggle = (activeTab) => () => {
		this.setState({activeTab})		
	}
	render(){
		const { handleSubmit, zone, handleAddCommittee, handleDeleteCommittee, zoneCommittees = [] } = this.props;
		if(!zone.name){
			return (
				<Panel lg={6} xl={6} md={12} xs={12} title={`Seleccione una Zona`}>
					<Alert>Seleccione una zona del listado de la izquierda para agregar o quitar uno o mas comites</Alert>
				</Panel>
			)
		}
		return(
			<Panel lg={6} xl={6} md={12} xs={12} title={`Comites asignados a "${zone.name}"`}>
				

				<div>
					<Nav tabs>
						<NavItem>
							<NavLink
							className={classnames({active: this.state.activeTab === '1'})}
							onClick={this.toggle('1')}
							>
							Comites asignados
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
							className={classnames({active: this.state.activeTab === '2'})}
							onClick={this.toggle('2')}
							>
							Buscar mas comites
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId='1'>
							<Table responsive hover>
								<thead>
									<tr>
										<th>Comite</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{
										zoneCommittees.map((c, index) => 
											<tr key={index}>
												<td>
												{c.name}<br/>
												<small>{c.populatedCenterName}</small>
												</td>
												<td>
													<Button outline className='sm' color='danger' size='sm' style={{marginBottom: 0}} onClick={handleDeleteCommittee(c.id)}>
														Remover
													</Button>
												</td>
											</tr>
										)
									}
									{
										zoneCommittees.length === 0 && <Alert color="light">Agregue uno o mas comites a la zona seleccionada</Alert>
									}
								</tbody>
							</Table>
						</TabPane>
						<TabPane tabId='2'>
							<form className='form' onSubmit={handleSubmit}>
								<div className='form__form-group'>
									<div className='form__form-group-field'>
									<Field
										name='query'
										component='input'
										type='text'
										placeholder='Buscar comite...'
									/>
									<button className={`form__form-group-button`} ><SearchIcon/></button>
									</div>
								</div>
							</form>
							<Table responsive hover>
								{
									this.props.committees.length>0 &&
									<thead>
										<tr>
											<th>Comite</th>
											<th></th>
										</tr>
									</thead>
								}
								<tbody>
									{
										this.props.committees.map((c, index) => 
											<tr key={index}>
												<td>
													{c.name}<br/>
													<small>{c.populatedCenterName}</small>
												</td>
												<td>
													<Button outline className='sm' color='primary' size='sm' style={{marginBottom: 0}} onClick={handleAddCommittee(c)}>
														Agregar
													</Button>
												</td>
											</tr>
										)
									}
									{
										this.props.committees.length === 0 && <Alert>Escriba el nombre del comite que desee agregar a la zona seleccionada y a continuación presione "agregar"</Alert>
									}
								</tbody>
							</Table>
						</TabPane>
					</TabContent>
				</div>
			</Panel>
		)
	}
}

export default reduxForm({
	form: 'search-liscommittees'
})(PanelCommittees)