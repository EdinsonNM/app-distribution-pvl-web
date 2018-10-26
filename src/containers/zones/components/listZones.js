import React, {PureComponent} from 'react';
import { Col, Table, Button, Alert } from 'reactstrap';
import { TrashIcon} from 'mdi-react';


export default class ListZones extends PureComponent {
	constructor(props) {
		super(props);
		this.heads = [
			{
				key: 'name',
				name: 'Nombre',
				sortable: true
			}
		];
		
	}

	render() {
		const {select, handleDeleteZone} = this.props;
		return (
			<Col md={12} lg={12}>
				<Table hover responsive>
					<tbody>
						{this.props.rows.map((row, index) => 
							<tr key={index} onClick={select(row)}>
								<td>{row.name}</td>
								<td style={{width: 80}}>
								<Button color='danger' size='sm' style={{marginBottom: 0}} onClick={handleDeleteZone(row.id)}>
									<TrashIcon />
								</Button>
								</td>
							</tr>
						)}
						{
							this.props.rows.length === 0 && <Alert color="light">
							Agrupe diferentes comites en una o mas Zonas para facilitar la distribución de productos. Ingrese el nombre de la zona y a continuación presione "Enter" o el boton "+" para agregar un nueva zona.
							</Alert>
						}
					</tbody>
				</Table>

			</Col>
		)
	}
}
