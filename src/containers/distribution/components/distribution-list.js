import React, {PureComponent} from 'react';
import {Container, Row} from 'reactstrap';
import DistributionItem from './distribution-item';
const items = [
	{title: 'Programación Julio 2018'},
	{title: 'Programación Agosto 2018'},
	{title: 'Programación Setiembre 2018'},
	{title: 'Programación Octubre 2018'},
];
export default class DistributionList extends PureComponent {
	render() {
		return (
		<Container className='dashboard'>
			<Row>
			{items.map(item => <DistributionItem title={item.title} />)}
			</Row>
		</Container>
		)
	}
}
