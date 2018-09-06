import React, {PureComponent} from 'react';
import { ButtonToolbar, Card, CardBody, Col, Table } from 'reactstrap';
import EditTable from '../../../components/table/EditableTable';
import Pagination from '../../../components/Pagination';


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
		const {select} = this.props;
		return (
			<Col md={12} lg={12}>
				<Table hover responsive>
					<thead>
					<tr>
						<th>Nombre</th>
					</tr>
					</thead>
					<tbody>
						{this.props.rows.map((row, index) => 
							<tr key={index} onClick={select(row)}>
								<td>{row.name}</td>
							</tr>
						)}
					</tbody>
				</Table>

			</Col>
		)
	}
}
