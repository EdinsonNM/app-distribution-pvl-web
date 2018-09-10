import React, {PureComponent} from 'react';
import Panel from '../../../components/Panel';
import { AddIcon } from 'mdi-react';
import { Field, reduxForm } from 'redux-form';
import ListZones from './listZones';
import { Row } from 'reactstrap';

class PanelZones extends PureComponent {
	render(){
		const {handleSubmit, select} = this.props;
		return(
			<Panel lg={6} xl={6} md={12} xs={12} title="Zonas de distribución">
				<form className='form' onSubmit={handleSubmit}>
					<div className='form__form-group'>
						<div className='form__form-group-field'>
						<Field
							name='name'
							component='input'
							type='text'
							placeholder='Agregar Zona...'
						/>
						<button className={`form__form-group-button`} ><AddIcon/></button>
						</div>
					</div>
				</form>
				<Row>
					<ListZones rows={this.props.zones} select={select} handleDeleteZone={this.props.handleDeleteZone} />
				</Row>
			</Panel>
		)
	}
}


export default reduxForm({
	form: 'formZone'
})(PanelZones)