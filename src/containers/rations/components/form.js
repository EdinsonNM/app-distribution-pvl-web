import React, {PureComponent} from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import renderSelectField from '../../../components/form/Select';
import { UNIT_MEASURENMENT_ABREV } from '../../../contants/unit_of _measurement';

import {UNIT_MEASURENMENT} from '../../../contants/unit_of _measurement';
class Form extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,
			product: {}
		};
		
	}
	handleChange = (e) => {
		let product = this.props.products.find(item => item.id === e.value);
		this.setState({product});
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
						onChange={this.handleChange}
						name='productId'
						component={renderSelectField}
						options={this.props.products.map(item => ({value:item.id, label: item.name}))}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>
					Cantidad (<span dangerouslySetInnerHTML={{__html: UNIT_MEASURENMENT_ABREV[this.state.product.unitOfMeasureConversion]}}></span>)
					</label>
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
