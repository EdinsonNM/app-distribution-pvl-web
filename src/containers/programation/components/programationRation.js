import React from 'react';
// import formatNumber from 'format-number';
import {PieChart, Pie, Tooltip, Legend, ResponsiveContainer} from 'recharts';
const renderLegend = (props) => {
	const {payload} = props;
	return (
		<ul className='dashboard__chart-legend'>
		{
			payload.map((entry, index) => (
			<li key={`item-${index}`}><span style={{backgroundColor: entry.color}}/>{entry.value} <strong>({entry.payload.value} {entry.payload.unity})</strong></li>
			))
		}
		</ul>
	);
};

const ProgramationRation = ({data}) => {
	return (
		<ResponsiveContainer className='dashboard__chart-pie dashboard__chart-pie--commerce' height={360}>
		<PieChart className='dashboard__chart-pie-container'>
			<Tooltip/>
			<Pie data={data} dataKey='value' cy={100} innerRadius={50} outerRadius={80} label labelLine />
			<Legend layout='vertical' verticalAlign='bottom' content={renderLegend}/>
		</PieChart>
		</ResponsiveContainer>
	)
}

export default ProgramationRation;