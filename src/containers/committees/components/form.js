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
				<h5 className='bold-text'>Datos Comité</h5>
				<h5 className='subhead'>Complete toda la información para realizar el registro de un comité</h5>
				</div>
				<form className='form form--horizontal' onSubmit={handleSubmit}>
				
				<div className='form__form-group'>
					<label className='form__form-group-label'>Nombre de Comité</label>
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
					<label className='form__form-group-label'>Centro poblado</label>
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
					<div className='form__form-group-field'>
					<Field
						name='email'
						component='input'
						type='email'
						placeholder='example@mail.com'
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Núcleo Urbano</label>
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
					<div className='form__form-group-field'>
					<Field
						name='email'
						component='input'
						type='email'
						placeholder='example@mail.com'
					/>
					</div>
				</div>

				<div className='form__form-group'>
					<label className='form__form-group-label'>Dirección</label>
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
					<div className='form__form-group-field'>
					<Field
						name='email'
						component='input'
						type='email'
						placeholder='example@mail.com'
					/>
					</div>
				</div>
				
				<div className='form__form-group'>
					<label className='form__form-group-label'>
					Add file
					</label>
					<div className='form__form-group-field'>
					<Field
						name='file'
						component={renderFileInputField}
					/>
					</div>
				</div>
				<div className='card__title'>
				<h5 className='bold-text'>Datos Responsable</h5>
				<h5 className='subhead'>Complete toda la información para realizar el registro de un comité</h5>
				</div>
				<div className='form__form-group'>
				<label className='form__form-group-label'>Centro poblado</label>
					<div className='form__form-group-field'>
					<Field
						name='email'
						component='input'
						type='email'
						placeholder='example@mail.com'
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<div className='form__form-group-field'>
					<Field
						name='email'
						component='input'
						type='email'
						placeholder='example@mail.com'
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<div className='form__form-group-field'>
					<Field
						name='email'
						component='input'
						type='email'
						placeholder='example@mail.com'
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
