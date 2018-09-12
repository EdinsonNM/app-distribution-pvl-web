import React, {PureComponent} from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from 'mdi-react/SearchIcon';
import { connect } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';
import {bindActionCreators} from 'redux';
import { periodDefaultSelect } from '../../../redux/actions/periods';

class TopbarSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {inputOpen: false};
    this.onInputOpen = this.onInputOpen.bind(this);
  }
  
  onInputOpen(e) {
    e.preventDefault();
    this.setState({inputOpen: !this.state.inputOpen});
  }
  handleChange = (e) => {
    this.props.periodDefaultSelect(e.target.value);
  }
  
  render() {
    return (
        <Select native onChange={this.handleChange} value={this.props.periodDefault}>
            {
              this.props.periods.map(p => 
                <option value={p.id}>{p.description}</option>
              )
            }
          </Select>

    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  periodDefault: state.periods.periodDefault,
  periods: state.periods.data
})
const mapDispatchToProps = (dispatch) => bindActionCreators({
  periodDefaultSelect
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TopbarSearch);