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
		const {handleSubmit, handleCancel} = this.props;

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
							name='names'
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
							name='firstsurname'
							component='input'
							type='text'
							placeholder='Apellido Paterno'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Apellido Materno</label>
					<div className='form__form-group-field'>
						<Field
							name='lastsurname'
							component='input'
							type='text'
							placeholder='Apellido Materno'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Tipo Documento</label>
					<div className='form__form-group-field'>
					<Field
						name='documenttypeId'
						component={renderSelectField}
						options={this.props.documenttype.map(d=>({value: d.id,label: d.name}))}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Documento</label>
					<div className='form__form-group-field'>
						<Field
							name='documentId'
							component='input'
							type='text'
							placeholder='Nro de DNI'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Fecha Nacimiento</label>
					<div className='form__form-group-field'>
						<Field
							name='birthday'
							component='input'
							type='date'
							placeholder='Fecha de Nacimiento'
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Sexo</label>
					<div className='form__form-group-field'>
					<Field
						name='sexo'
						component={renderSelectField}
						options={[
						{value: 'M', label: 'Másculino'},
						{value: 'F', label: 'Femenino'},
						]}
					/>
					</div>
				</div>
				
				<div className='form__form-group'>
					<label className='form__form-group-label'>Parentesco Socio</label>
					<div className='form__form-group-field'>
						<Field
							name='relationshipId'
							component={renderSelectField}
							options={this.props.relationships.map(item => ({value: item.id, label: item.name}))}
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Motivo beneficio</label>
					<div className='form__form-group-field'>
						<Field
							name='benefittypeId'
							component={renderSelectField}
							options={this.props.benefittype.map(item => ({value: item.id, label: item.name}))}
						/>
					</div>
				</div>
				<div className='form__form-group'>
					<label className='form__form-group-label'>Dirección</label>
					<div className='form__form-group-field'>
					<Field
						name='addresstypeId'
						component={renderSelectField}
						options={this.props.addresstype.map(item => ({value:item.id, label: item.name}))}
					/>
					</div>
				</div>
				<div className='form__form-group'>
					<div className='form__form-group-field'>
					<Field
						name='addresstypeName'
						component='input'
						type='text'
						placeholder='Dirección'
					/>
					</div>
				</div>
				
				<div className="form__form-group">
					<label className='form__form-group-label'></label>
					<div className='form__form-group-field' style={{paddingLeft: 5}}>
						<div className="container">
							<div className="row">
								<div className="col-md-2">
									<Field
										name='number'
										component='input'
										type='text'
										placeholder='Nro'
									/>
								</div>
								<div className="col-md-2">
									<Field
										name='letter'
										component='input'
										type='text'
										placeholder='Letra'
									/>
								</div>
								<div className="col-md-2">
									<Field
										name='block'
										component='input'
										type='text'
										placeholder='Block'
									/>
								</div>
								<div className="col-md-2">
									<Field
										name='manzana'
										component='input'
										type='text'
										placeholder='Manzana'
									/>
								</div>
								<div className="col-md-2">
									<Field
										name='lote'
										component='input'
										type='text'
										placeholder='Lote'
									/>
								</div>
								<div className="col-md-2">
									<Field
										name='floor'
										component='input'
										type='text'
										placeholder='Piso'
									/>
								</div>
							</div>				
						</div>
					</div>
				</div>
				<ButtonToolbar className='form__button-toolbar'>
					<Button color='primary' type='submit'>Submit</Button>
					<Button type='button' onClick={handleCancel}>
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
