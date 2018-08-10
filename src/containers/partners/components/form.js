import React, {PureComponent} from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import renderFileInputField from '../../../components/form/FileInput';
import renderSelectField from '../../../components/form/Select';
import renderMultiSelectField from '../../../components/form/MultiSelect';

import EyeIcon from 'mdi-react/EyeIcon';
import EmailIcon from 'mdi-react/EmailIcon';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';

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
				<h5 className='bold-text'>Datos de Beneficiario</h5>
				<h5 className='subhead'>Complete toda la información para realizar el registro de un comité</h5>
				</div>
				<form className='form form--horizontal' onSubmit={handleSubmit}>
				
				<div className='form__form-group'>
					<label className='form__form-group-label'>Nombres</label>
					<div className='form__form-group-field'>
						<Field
							name='name'
							component='input'
							type='text'
							placeholder='Nombre'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Apellido Paterno</label>
					<div className='form__form-group-field'>
						<Field
							name='name'
							component='input'
							type='text'
							placeholder='Nombre'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Apellido Materno</label>
					<div className='form__form-group-field'>
						<Field
							name='name'
							component='input'
							type='text'
							placeholder='Nombre'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Tipo Documento</label>
					<div className='form__form-group-field'>
					<Field
						name='select'
						component={renderSelectField}
						options={[
						{value: 'one', label: 'One'},
						{value: 'two', label: 'Two'},
						]}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Documento</label>
					<div className='form__form-group-field'>
						<Field
							name='name'
							component='input'
							type='text'
							placeholder='Nombre'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Fecha Nacimiento</label>
					<div className='form__form-group-field'>
						<Field
							name='name'
							component='input'
							type='date'
							placeholder='Nombre'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Sexo</label>
					<div className='form__form-group-field'>
					<Field
						name='select'
						component={renderSelectField}
						options={[
						{value: 'one', label: 'One'},
						{value: 'two', label: 'Two'},
						]}
					/>
					</div>
				</div>
				
				<div className='form__form-group'>
					<label className='form__form-group-label'>Parentesco Socio</label>
					<div className='form__form-group-field'>
						<Field
							name='select'
							component={renderSelectField}
							options={[
							{value: 'one', label: 'One'},
							{value: 'two', label: 'Two'},
							]}
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Motivo beneficio</label>
					<div className='form__form-group-field'>
						<Field
							name='select'
							component={renderSelectField}
							options={[
							{value: 'one', label: 'One'},
							{value: 'two', label: 'Two'},
							]}
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
