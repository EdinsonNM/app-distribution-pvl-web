import React, {PureComponent} from 'react';
import  Committee from './committee';
import { Row } from 'reactstrap';

export default class Committees extends PureComponent {
	render() {
		const {committees = []} = this.props;
		return (
		<Row>
			{committees.map(c => <Committee committee={c} max={150}/>)}
		</Row>
		)
	}
}