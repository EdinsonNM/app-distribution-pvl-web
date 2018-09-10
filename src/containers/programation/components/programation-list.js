import React, {PureComponent} from 'react';
import {Container, Row} from 'reactstrap';
import ProgramationRation from './programationRation';
import Panel from '../../../components/Panel';

export default class ProgramationList extends PureComponent {
	render() {
		const {programations = {}} = this.props;
		return (
		<Container className='dashboard'>
			<Row>
            {programations.map(item => 
                <Panel md="4" lg="4" title="Total de Ración programada" subhead={`${item.days} días programados`} >
                    <ProgramationRation data={item.distributions} title={item.month} />
                </Panel>
            )}
			</Row>
		</Container>
		)
	}
}
