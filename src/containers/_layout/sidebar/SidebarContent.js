import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import {changeThemeToDark, changeThemeToLight} from '../../../redux/actions/themeActions';

class SidebarContent extends PureComponent {
  changeToDark = () => {
    this.props.dispatch(changeThemeToDark());
    this.hideSidebar();
  };
  
  changeToLight = () => {
    this.props.dispatch(changeThemeToLight());
    this.hideSidebar();
  };
  
  hideSidebar = () => {
    this.props.onClick();
  };
  
  render() {
    return (
      <div className='sidebar__content'>
        <ul className='sidebar__block'>
          <SidebarCategory title='Tema' icon='layers'>
            <li className='sidebar__link' onClick={this.changeToLight}>
              <p className='sidebar__link-title'>Light Theme</p>
            </li>
            <li className='sidebar__link' onClick={this.changeToDark}>
              <p className='sidebar__link-title'>Dark Theme</p>
            </li>
          </SidebarCategory>
        </ul>
        <ul className='sidebar__block'>
          <SidebarLink title='Comites' icon='home' route='/pages/comites' onClick={this.hideSidebar}/>  
          <SidebarLink title='Socios' icon='users' route='/pages/socios/dashboard' onClick={this.hideSidebar}/>  
          <SidebarLink title='Beneficiarios' icon='user' route='/pages/beneficiarios/dashboard' onClick={this.hideSidebar}/>
          <SidebarLink title='Productos' icon='store' route='/pages/productos' onClick={this.hideSidebar}/>  
          <SidebarLink title='Ingresos' icon='store' route='/pages/ingresos' onClick={this.hideSidebar}/>  
          <SidebarLink title='Ración' icon='home' route='/pages/raciones/dashboard' onClick={this.hideSidebar}/> 
          <SidebarLink title='Zonas de Distribución' icon='home' route='/pages/zonas' onClick={this.hideSidebar}/>
          <SidebarLink title='Programación' icon='home' route='/pages/programacion' onClick={this.hideSidebar}/> 
          
        </ul>
        <ul className='sidebar__block'>
          <SidebarLink title='Log Out' icon='exit' route='/log_in' onClick={this.hideSidebar}/>
        </ul>
      </div>
    )
  }
}

export default connect()(SidebarContent);