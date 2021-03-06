import React, {PureComponent} from 'react';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { urbancoreLoad } from '../../redux/actions/urbancore';
import { productsLoad } from '../../redux/actions/products';
import { documenttypeLoad } from '../../redux/actions/documenttype';
import { addresstypeLoad } from '../../redux/actions/addresstype';
import { periodsLoad } from '../../redux/actions/periods';
import { ToastContainer } from 'react-toastify';
import { benefittypeLoad } from '../../redux/actions/benefittype';
import { relationshipsLoad } from '../../redux/actions/relationship';

class Layout extends PureComponent {
  componentDidMount(){
    this.props.urbancoreLoad();
    this.props.productsLoad();
    this.props.addresstypeLoad();
    this.props.periodsLoad();
    this.props.documenttypeLoad();
    this.props.benefittypeLoad();
    this.props.relationshipsLoad();
  }
  render() {
    return (
      <div>
        <Topbar/>
        <Sidebar/>
        <ToastContainer />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  urbancoreLoad,
  productsLoad,
  addresstypeLoad,
  documenttypeLoad,
  periodsLoad,
  benefittypeLoad,
  relationshipsLoad
}, dispatch)
export default connect(null, mapDispatchToProps)(Layout)