import React, {PureComponent} from 'react';
import moment from 'moment';
import {
    Col,
    Container,
    Row,
    CardBody,
    Card,
} from 'reactstrap';
import { months } from '../../contants/months';
import { connect } from 'react-redux';
import TableComponent from '../../components/table/Table';
import { MenuItem, Button } from '@material-ui/core';
import { Select } from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {inputsOutputsLoad} from '../../redux/actions/reports';
import { UNIT_MEASURENMENT_ABREV } from '../../contants/unit_of _measurement';
class ReportInputOutput extends PureComponent {
    
    constructor(props){
        super(props);
        this.state = {
            month: 0,
            product:null,
            year: (new Date()).getFullYear()
        }
        this.years = [this.state.year, this.state.year - 1, this.state.year - 2];
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    handleLoad = () =>{
        this.props.inputsOutputsLoad(this.state.year, this.state.month, this.state.product);
    }
    render() {
        const {products} = this.props;
        return (
        <Container className='dashboard'>
            <Row>
            <Col md={12}>
                <h3 className='page-title'>Reporte <span style={{color: 'orange'}}>Ingresos/Salidas</span></h3>
                <h3 className='page-subhead subhead'>
                Seleccione un comite y a continuación en <a href="/socios/dashboard">Ver socios</a> para visualizar el listado de socios vinculados
                </h3>
            </Col>
            </Row>
            <Card>
            <CardBody className='products-list'>
                <Row>
                    <Col md={3}>
                        <Select
                        name="year"
                        value={this.state.year}
                        onChange={this.handleChange}
                        fullWidth
                        >
                            <MenuItem value="" />
                            <em>Seleccione un año...</em>
                            {
                                this.years.map(year => (<MenuItem value={year}>{year}</MenuItem>))
                            }
                            
                        </Select>
                    </Col>
                    <Col md={3}>
                        <Select
                        name="month"
                        value={this.state.month}
                        onChange={this.handleChange}
                        fullWidth
                        >
                            <MenuItem value="">
                            <em>Seleccione un mes...</em>
                            </MenuItem>
                            {
                                months.map((month, index) => (<MenuItem value={index}>{month}</MenuItem>))
                            }
                        </Select>
                    </Col>
                    <Col md={4}>
                        <Select
                        name="product"
                        value={this.state.product}
                        onChange={this.handleChange}
                        fullWidth
                        >
                            <MenuItem value="">
                            <em>Seleccione un mes...</em>
                            </MenuItem>
                            {
                                products.map(product => (<MenuItem value={product.id}>{product.name}</MenuItem>))
                            }
                        </Select>
                    </Col>
                    
                    <Col md={2}>
                    <Button onClick={this.handleLoad}>Cargar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    <TableComponent striped>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Ingreso/Egreso</th>
                                <th>Documento</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.data.map(item=>(
                                <tr>
                                    <td>{moment(item.date).format('DD/MM/YYYY')}</td>
                                    <td>{item.type}</td>
                                    <td>{item.code}</td>
                                    <td>{item.quantity} {UNIT_MEASURENMENT_ABREV[item.unity]}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </TableComponent>
                    </Col>
                </Row>
            </CardBody>
            </Card>
        </Container>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    products: state.products.data,
    data: state.reports.input_output_data
})
const mapDispatchToProps = dispatch => bindActionCreators({
    inputsOutputsLoad
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ReportInputOutput);