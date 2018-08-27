import React, {PureComponent} from 'react';
import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { urbancoreLoad } from '../../redux/actions/urbancore';
import { productsLoad } from '../../redux/actions/products';
import { addresstypeLoad } from '../../redux/actions/addresstype';

class Layout extends PureComponent {
  componentDidMount(){
    this.props.urbancoreLoad();
    this.props.productsLoad();
    this.props.addresstypeLoad();
  }
  render() {
    return (
      <div>
        <Topbar/>
        <Sidebar/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  urbancoreLoad,
  productsLoad,
  addresstypeLoad
}, dispatch)
export default connect(null, mapDispatchToProps)(Layout)