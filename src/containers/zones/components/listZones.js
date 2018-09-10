import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Table, Button } from 'reactstrap';
import EditTable from '../../../components/table/EditableTable';
import Pagination from '../../../components/Pagination';
import { RemoveIcon , TrashIcon} from 'mdi-react';


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
		
		this.state = {
			pageOfItems: []
		};

		this.onChangePage = this.onChangePage.bind(this);
	}
	
	onChangePage(pageOfItems) {
		// update state with new page of items
		this.setState({pageOfItems: pageOfItems});
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
					</tbody>
				</Table>

			</Col>
		)
	}
}
