import React, {PureComponent} from 'react';
import renderSelectField from '../../../components/form/Select';
import { Field, reduxForm } from 'redux-form';
import Panel from '../../../components/Panel';
import { ButtonToolbar, Button, Progress } from 'reactstrap';
import { months } from '../../../contants/months';

const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined

class FormNewDistribution extends PureComponent {
	state = {
		committees: []
	}
	render() {
		const {totalCommittees = 0, beneficiariesLoaded = 0, periods = [], handleSubmit} = this.props;
		let minValueDay = minValue(this.state.maxDay);
		let percentege =  0;
		if(totalCommittees > 0)
			percentege = Math.round((beneficiariesLoaded / totalCommittees)*100)
		return(
			<Panel md="4" lg="4" title="Nueva Programación">
				<form className='form' onSubmit={handleSubmit} >
					<div className='form__form-group'>
						<label className='form__form-group-label'>Periodo</label>
						<div className='form__form-group-field'>
						<div>{this.props.periods.length && this.props.periods.find(p=> p.id === this.props.periodDefault).description}</div>
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
						<div className='form__form-group'>
							<div className='progress-wrap progress-wrap--middle progress-wrap--violet'>
								<Progress value={percentege}>
									{(percentege < 100) ? `Cargando comites... ${percentege}%` : `Se cargaron ${totalCommittees} comites`}
								</Progress>
							</div>
						</div>
					<ButtonToolbar className='form__button-toolbar'>
						<Button type='button'>
							Cancel
						</Button>
						<Button color='primary' type='submit' disabled={totalCommittees !== beneficiariesLoaded}>Crear programación</Button>
					</ButtonToolbar>
				</form>
				
			</Panel>
		)
	}
}

export default reduxForm({
	form: 'distribution_new'
})(FormNewDistribution);