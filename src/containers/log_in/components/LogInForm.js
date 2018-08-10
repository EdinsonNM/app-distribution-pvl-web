import React, {PureComponent} from 'react';
import {Field, reduxForm} from 'redux-form';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import {Link} from 'react-router-dom';
import renderCheckBoxField from '../../../components/form/CheckBox';

class LogInForm extends PureComponent {
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
  }
  
  render() {
    const {handleSubmit} = this.props;
    
    return (
      <form className='form' onSubmit={handleSubmit}>
        <div className='form__form-group'>
          <label className='form__form-group-label'>Usuario</label>
          <div className='form__form-group-field'>
            <div className='form__form-group-icon'>
              <AccountOutlineIcon/>
            </div>
            <Field
              name='name'
              component='input'
              type='text'
              placeholder='email@example.com'
            />
          </div>
        </div>
        <div className='form__form-group'>
          <label className='form__form-group-label'>Contraseña</label>
          <div className='form__form-group-field'>
            <div className='form__form-group-icon'>
              <KeyVariantIcon/>
            </div>
            <Field
              name='password'
              component='input'
              type={this.state.showPassword ? 'text' : 'password'}
              placeholder='Contraseña'
            />
            <button className={`form__form-group-button${this.state.showPassword ? ' active' : ''}`}
                    onClick={(e) => this.showPassword(e)}><EyeIcon/></button>
          </div>

        </div>

        <Link className='btn btn-primary btn-block' to='/pages/one'>Entrar</Link>
      </form>
    )
  }
}

export default reduxForm({
  form: 'log_in_form',
})(LogInForm);
