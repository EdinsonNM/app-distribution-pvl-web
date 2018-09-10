import React, {PureComponent} from 'react';
import LogInForm from './components/LogInForm';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { userLogin } from '../../redux/actions/users';

class LogIn extends PureComponent {
  handleLogin = (values) => {
    console.log(values)
    this.props.userLogin(values)
  }
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
            <LogInForm onSubmit={this.handleLogin}/>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({

})
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  userLogin
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
