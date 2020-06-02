import React, {PureComponent} from 'react';
import {Col, Container, Row} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import ProductsList from './components/products-list';
import { productsLoad } from '../../redux/actions/products';


class Committees extends PureComponent {
	componentDidMount(){
		this.props.load();
	}
	render() {
		return (
		<Container className='dashboard'>
			<Row>
			<Col md={12}>
				<h3 className='page-title'>Productos</h3>
				<h3 className='page-subhead subhead'>
					Son organizaciones sociales de base, tienen personería jurídica y existencia legal debidamente reconocidos por la Municipalidad
				</h3>
			</Col>
			</Row>
			<Row>
				<ProductsList rows={this.props.products}/>
			</Row>
		</Container>
		)
	}
}
const mapStateToProps = (state, ownProps) => {
	return {
		products: state.products.data
	}
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  load: productsLoad
}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Committees));