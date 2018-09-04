import React from 'react';
import {PieChart, Pie, ResponsiveContainer} from 'recharts';
import { Col, CardBody, Card } from 'reactstrap';
import HeartOutlineIcon from 'mdi-react/HeartOutlineIcon';
import UtilColor from '../../../lib/util-color';
import { Link } from 'react-router-dom';
const Committee = ({committee, max}) => {
	const color = UtilColor.getRandomColor();
	const data = [{value: committee.beneficiaries, fill: color }, {value: max-committee.beneficiaries, fill: '#eeeeee'}];
	return (
		<Col md={12} xl={3} lg={6} sm={12} xs={12}>
			<Card>
			<CardBody className='dashboard__health-chart-card'>
				<div className='card__title'>
				<h5 className='bold-text'>{committee.name}</h5>
				</div>
				<div className='dashboard__health-chart'>
				<ResponsiveContainer height={180}>
					<PieChart>
					<Pie data={data} dataKey='value' cy={85} innerRadius={80} outerRadius={90}/>
					</PieChart>
				</ResponsiveContainer>
				<div className='dashboard__health-chart-info'>
					<HeartOutlineIcon style={{fill: color}}/>
					<p className='dashboard__health-chart-number'>{committee.beneficiaries}</p>
					<p className='dashboard__health-chart-units'>beneficiarios</p>
				</div>
				</div>
				<p className='dashboard__goal'>Referencia: {committee.beneficiaries}-{max}</p>
				<Link to="lista">Ver Beneficiarios</Link>
			</CardBody>
			</Card>
		</Col>
	);
}

export default Committee;