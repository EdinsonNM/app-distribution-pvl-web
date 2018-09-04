import React, {PureComponent} from 'react';
import { Row } from 'reactstrap';
import Period from './period';

export default class Periods extends PureComponent {
	render() {
		const {periods = []} = this.props;
		return (
		<Row>
			{periods.map(c => <Period period={c} max={100}/>)}
		</Row>
		)
	}
}