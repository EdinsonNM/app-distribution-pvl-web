import React, {PureComponent} from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import {Field, reduxForm} from 'redux-form';

class Form extends PureComponent {
	render() {
		const {handleSubmit, reset} = this.props;

		return (
		<Col md={12} lg={12}>
			<Card>
			<CardBody>
				<div className='card__title'>
				<h5 className='bold-text'>Ingreso de productos</h5>
				<h5 className='subhead'>Ingrese los datos del producto</h5>
				</div>
				<form className='form form--horizontal' onSubmit={handleSubmit}>
				
				<div className='form__form-group'>
					<label className='form__form-group-label'>Producto</label>
					<div className='form__form-group-field'>
						<Field
							name='name'
							component='input'
							type='text'
							placeholder='Nombre'
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
	form: 'product_form', // a unique identifier for this form
})(Form);
