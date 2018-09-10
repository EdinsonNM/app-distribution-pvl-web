import React, {PureComponent} from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import renderFileInputField from '../../../components/form/FileInput';
import renderSelectField from '../../../components/form/Select';
import renderMultiSelectField from '../../../components/form/MultiSelect';

import EyeIcon from 'mdi-react/EyeIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import renderCheckBoxField from '../../../components/form/CheckBox';
import renderRadioButtonField from '../../../components/form/RadioButton';
import renderDatePickerField from '../../../components/form/DatePicker';
import { CalendarBlankIcon } from 'mdi-react';
import { UNIT_MEASURENMENT } from '../../../contants/unit_of _measurement';

class Form extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,
		};
		
		this.showPassword = this.showPassword.bind(this);
	}
	
	showPassword(e) {
		e.preventDefault();
		this.setState({
		showPassword: !this.state.showPassword
		})
	};
	
	render() {
		const {handleSubmit, reset} = this.props;

		return (
		<Col md={12} lg={12}>
			<Card>
			<CardBody>
				<div className='card__title'>
				<h5 className='bold-text'>Ingreso de productos</h5>
				<h5 className='subhead'>Ingrese los datos de los productos ingresados</h5>
				</div>
				<form className='form form--horizontal' onSubmit={handleSubmit}>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Producto</label>
					<div className='form__form-group-field'>
					<Field
						name='product'
						component={renderSelectField}
						options={this.props.products.map(item => ({value:item.id, label: item.name}))}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Unidad</label>
					<div className='form__form-group-field'>
					<Field
						name='unity'
						component={renderSelectField}
						options={Object.keys(UNIT_MEASURENMENT).map(key => ({value:key, label: UNIT_MEASURENMENT[key]}))}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Cantidad</label>
					<div className='form__form-group-field'>
						<Field
							name='quantity'
							component='input'
							type='text'
							placeholder='Nombre'
						/>
					</div>
				</div>

				<div className='form__form-group'>
					<label className='form__form-group-label'>Fecha de Ingreso</label>
					<div className='form__form-group-field'>
						<Field
							name='entryDate'
							component={renderDatePickerField}
						/>
						<div className='form__form-group-icon'>
							<CalendarBlankIcon/>
						</div>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Código</label>
					<div className='form__form-group-field'>
						<Field
							name='inputCode'
							component='input'
							type='text'
							placeholder='Nro'
						/>
					</div>
				</div>
				
				
				<ButtonToolbar className='form__button-toolbar'>
					<Button color='primary' type='submit'>Submit</Button>
					<Button type='button' onClick={reset}>
					Cancel
					</Button>
				</ButtonToolbar>
				</form>
			</CardBody>
			</Card>
		</Col>
		)
	}
}

export default reduxForm({
	form: 'committee_form', // a unique identifier for this form
})(Form);
