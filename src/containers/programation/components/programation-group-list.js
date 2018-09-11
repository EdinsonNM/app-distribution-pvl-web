import React, {PureComponent} from 'react';
import {Container, Row} from 'reactstrap';
import ProgramationGroupItem from './programation-group-item';

export default class ProgramationGroupList extends PureComponent {
	render() {
		const {programationsGroup = {}} = this.props;
		const items = [];
		Object.keys(programationsGroup).forEach(item => {
			if(programationsGroup[item].programations.length){
				items.push(programationsGroup[item])
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
