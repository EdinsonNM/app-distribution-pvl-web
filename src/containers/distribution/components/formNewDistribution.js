import React, {PureComponent} from 'react';
import renderSelectField from '../../../components/form/Select';
import { Field, reduxForm } from 'redux-form';
import Panel from '../../../components/Panel';
import { ButtonToolbar, Button } from 'reactstrap';
import { months } from '../../../contants/months';

const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined

class FormNewDistribution extends PureComponent {
	state = {
		committees: []
	}
	render() {
		const {periods = []} = this.props;
		let minValueDay = minValue(this.state.maxDay);
		return(
			<Panel md="4" lg="4" title="Nueva Distribución">
				<form className='form' >
					<div className='form__form-group'>
						<label className='form__form-group-label'>Periodo</label>
						<div className='form__form-group-field'>
						<Field
							name='period'
							component={renderSelectField}
							options={periods.map(item => ({value:item.id, label: item.description}))}
							placeholder='Número de días'
							onChange={this.props.handleChangeForm('period')}
						/>
						</div>
					</div>
						<div className='form__form-group'>
							<label className='form__form-group-label'>Mes de Distribución</label>
							<div className='form__form-group-field'>
							<Field
								name='month'
								component={renderSelectField}
								options={months.map((month, index) => ({value:index, label:month}))}
								onChange={this.props.handleChangeForm('month')}

							/>
							</div>
						</div>
						<div className='form__form-group'>
							<label className='form__form-group-label'>Días</label>
							<div className='form__form-group-field'>
							<Field
								name='days'
								component='input'
								type='text'
								placeholder='Número de días'
								onChange={(e) => this.props.handleChangeForm('days')(e.target) }
								validate={[ minValueDay ]}
							/>
							</div>
						</div>
					<ButtonToolbar className='form__button-toolbar'>
						<Button type='button'>
							Cancel
						</Button>
						<Button color='primary' type='submit'>Submit</Button>
					</ButtonToolbar>
				</form>
			</Panel>
		)
	}
}

export default reduxForm({
	form: 'distribution_new'
})(FormNewDistribution);