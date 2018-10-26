import React, {PureComponent} from 'react';
import { Card, CardBody, Col, Button, ButtonToolbar, Row } from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import renderSelectField from '../../../components/form/Select';
import { connect } from 'react-redux';
import { UNIT_MEASURENMENT_ABREV } from '../../../contants/unit_of _measurement';
import { UNIT_MEASURENMENT } from '../../../contants/unit_of _measurement';

class Form extends PureComponent {
	state = {
		unitOfMeasure:'',
		unitOfMeasureConversion: ''
	}
	onChange = (type) => (e) => {
		this.setState({[type]: e.value});
	}
	render() {
		const {handleSubmit, handleCancel} = this.props;

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
				<div className='form__form-group'>
					<label className='form__form-group-label'>Unidad de Producto</label>
					<div className='form__form-group-field'>
					<Field
						onChange={this.onChange('unitOfMeasure')}
						name='unitOfMeasure'
						component={renderSelectField}
						options={Object.keys(UNIT_MEASURENMENT).map(key => ({value: key, label: UNIT_MEASURENMENT[key]}))}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Unidad de Ración</label>
					<div className='form__form-group-field'>
					<Field
						name='unitOfMeasureConversion'
						onChange={this.onChange('unitOfMeasureConversion')}
						component={renderSelectField}
						options={Object.keys(UNIT_MEASURENMENT).map(key => ({value: key, label: UNIT_MEASURENMENT[key]}))}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>1 {UNIT_MEASURENMENT[this.state.unitOfMeasure]} equivale a</label>
					<div className='form__form-group-field'>
						<Field
							name='quantityConversion'
							component='input'
							type='text'
							placeholder={UNIT_MEASURENMENT[this.state.unitOfMeasureConversion]}
						/>
						<span dangerouslySetInnerHTML={{__html: UNIT_MEASURENMENT_ABREV[this.state.unitOfMeasureConversion]}}></span>
					</div>
				</div>
				<ButtonToolbar className='form__button-toolbar'>
					<Button color='primary' type='submit'>Guardar</Button>
					<Button type='button' onClick={handleCancel}>
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


Form =  reduxForm({
	form: 'product_form', 
	enableReinitialize: true
})(Form);

const mapStateToProps = (state, ownProps) =>({
	initialValues: state.products.product
})
export default connect(mapStateToProps)(Form);
