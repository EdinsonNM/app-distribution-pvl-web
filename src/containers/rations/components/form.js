import React, {PureComponent} from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import renderSelectField from '../../../components/form/Select';

import {UNIT_MEASURENMENT} from '../../../contants/unit_of _measurement';
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
	onSubmit = (values) => {
		return values;
	}

	render() {
		const {handleSubmit, onCancel} = this.props;

		return (
		<Col md={12} lg={12}>
			<Card>
			<CardBody>
				<div className='card__title'>
				<h5 className='bold-text'>Datos Ración</h5>
				<h5 className='subhead'>Complete toda la información para realizar el registro de un comité</h5>
				</div>
				<form className='form form--horizontal' onSubmit={handleSubmit}>
				
				<div className='form__form-group'>
					<label className='form__form-group-label'>Producto</label>
					<div className='form__form-group-field'>
					<Field
						name='productId'
						component={renderSelectField}
						options={this.props.products.map(item => ({value:item.id, label: item.name}))}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Unidad de Medida</label>
					<div className='form__form-group-field'>
					<Field
						name='unitId'
						component={renderSelectField}
						options={Object.keys(UNIT_MEASURENMENT).map(key => ({value: key, label: UNIT_MEASURENMENT[key]}))}
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
						placeholder='cantidad de ración por persona'
					/>
					</div>
				</div>

				<ButtonToolbar className='form__button-toolbar'>
					<Button color='primary' type='submit'>Guardar</Button>
					<Button type='button' onClick={onCancel}>
					Cancelar
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
	form: 'ration_form', // a unique identifier for this form
	fields: ['quantity']
})(Form);
