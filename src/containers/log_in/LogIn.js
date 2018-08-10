import React, {PureComponent} from 'react';
import LogInForm from './components/LogInForm';

export default class LogIn extends PureComponent {
  
  render() {
    return (
      <div className='account'>
        <div className='account__wrapper'>
          <div className='account__card'>
            <div className='account__head'>
              <h3 className='account__title'><span className='account__logo'>Sistema de Distribución <span
                className='account__logo-accent'>PVL</span></span></h3>
              <h4 className='account__subhead subhead'>Por favor ingrese sus nombre de usuario y contraseña</h4>
            </div>
            <LogInForm onSubmit/>
          </div>
        </div>
      </div>
    )
  }
}

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
