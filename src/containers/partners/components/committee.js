import React from 'react';
import {PieChart, Pie, ResponsiveContainer} from 'recharts';
import { Col, CardBody, Card } from 'reactstrap';
import HeartOutlineIcon from 'mdi-react/HeartOutlineIcon';
import UtilColor from '../../../lib/util-color';
import { Link } from 'react-router-dom';
const Committee = ({committee, max}) => {
	const color = UtilColor.getRandomColor();
	const data = [{value: committee.partners, fill: color }, {value: max-committee.partners, fill: '#eeeeee'}];
	return (
		<Col xl={3} lg={4} md={6} sm={6} xs={12}>
			<Card style={{paddingBottom: 0}}>
			<CardBody className='dashboard__health-chart-card'>
				<div className='card__title'>
				<h5 className='bold-text' style={{fontSize: 12, height: 30}}>{committee.name}</h5>
				</div>
				<div className='dashboard__health-chart'>
				<ResponsiveContainer height={150}>
					<PieChart>
					<Pie data={data} dataKey='value' cy={75} innerRadius={60} outerRadius={70}/>
					</PieChart>
				</ResponsiveContainer>
				<div className='dashboard__health-chart-info'>
					<HeartOutlineIcon style={{fill: color}}/>
					<p className='dashboard__health-chart-number'>{committee.partners}</p>
					<p className='dashboard__health-chart-units'>socios</p>
				</div>
				</div>
				<p className='dashboard__goal'>{committee.populatedCenterName}</p>
				<Link to={`lista/${committee.id}`}>Ver socios</Link>
			</CardBody>
			</Card>
		</Col>
	);
}

export default Committee;