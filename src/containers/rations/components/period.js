import React, {PureComponent} from 'react';
import {PieChart, Pie, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import Panel from '../../../components/Panel';
import { Link } from 'react-router-dom';
import { UNIT_MEASURENMENT_ABREV2 } from '../../../contants/unit_of _measurement';
import { UNIT_MEASURENMENT_ABREV } from '../../../contants/unit_of _measurement';
import { UNIT_MEASURENMENT } from '../../../contants/unit_of _measurement';

const data01 = [{name: 'Sony Xperia Z', value: 12934, fill: '#4ce1b6'},
	{name: 'Xiaomi Mi 6', value: 9934, fill: '#70bbfd'},
	{name: 'Apple Iphone 7 Plus', value: 20432, fill: '#f6da6e'},
	{name: 'Apple Iphone 6 Plus', value: 15432, fill: '#ff4861'}];

const style = {
	left: 0,
	width: 250,
	lineHeight: '24px'
};

const colors = ['#4ce1b6', '#70bbfd', '#f6da6e', '#ff4861']
const renderLegend = (props) => {
	const {payload} = props;
	return (
		<ul className='dashboard__chart-legend'>
		{
			payload.map((entry, index) => (
			<li key={`item-${index}`}><span style={{backgroundColor: entry.color}}/>{entry.value}</li>
			))
		}
		</ul>
	);
};

export default class Period extends PureComponent {
	render() {
		const {period} = this.props;
		const data = (period.rations || []).map((r, index) => ({
			name: `${r.product.name} (${UNIT_MEASURENMENT_ABREV2[r.product.unitOfMeasureConversion]})`,
			value: parseFloat(r.quantity),
			fill: colors[index]
		}));
		return (
		<Panel lg={4} xl={4} md={6} xs={12} title={period.description}>
			<ResponsiveContainer className='dashboard__chart-pie dashboard__chart-pie--commerce' height={360}>
			<PieChart className='dashboard__chart-pie-container'>
				<Tooltip/>
				<Pie data={data} dataKey='value' cy={130} innerRadius={80} outerRadius={110} label/>
				<Legend layout='vertical' verticalAlign='bottom' wrapperStyle={style} content={renderLegend}/>
			</PieChart>
			</ResponsiveContainer>
			<Link to={`periodo/${period.id}`}>Ver Detalle</Link>
		</Panel>
		)
	}
}

