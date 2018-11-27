import React, {PureComponent} from 'react';
import { Container, Row, Button } from 'reactstrap';
import ProgramationRation from './programationRation';
import Panel from '../../../components/Panel';

export default class ProgramationList extends PureComponent {
	render() {
		const {programations = {}, handleAddDistribution} = this.props;
		return (
		<Container className='dashboard'>
			<Row>
            {programations.map(item => 
                <Panel md="6" lg="6" title="Total de Ración programada" subhead={`${item.days} días programados`} >
					<ProgramationRation data={item.distributions} title={item.month} />
					<p>
					<Button outline block onClick={handleAddDistribution(item)}>Agregar distribución</Button>
					</p>
                </Panel>
            )}
			</Row>
		</Container>
		)
	}
}
