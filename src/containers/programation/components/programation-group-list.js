import React, {PureComponent} from 'react';
import {Container, Row} from 'reactstrap';
import ProgramationGroupItem from './programation-group-item';

export default class ProgramationGroupList extends PureComponent {
	render() {
		const {distributionsGroup = {}} = this.props;
		const items = [];
		Object.keys(distributionsGroup).forEach(item => {
			if(distributionsGroup[item].distributions.length){
				items.push(distributionsGroup[item])
			}
		})
		return (
		<Container className='dashboard'>
			<Row>
			{items.map(item => <ProgramationGroupItem item={item} title={item.month} />)}
			</Row>
		</Container>
		)
	}
}
