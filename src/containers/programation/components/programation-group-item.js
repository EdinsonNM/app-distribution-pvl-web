import React, {PureComponent} from 'react';
import {PieChart, Pie} from 'recharts';
import Panel from '../../../components/Panel';
import CustomDate from '../../../lib/custom-date';
import { Link } from 'react-router-dom';

export default class ProgramationGroupItem extends PureComponent {
  render() {
    const {item} = this.props;
    let days = 0;
    let committees = item.distributions[0].committees.length;
    item.distributions.forEach(element => {
      days+= element.days
    });
    let total = CustomDate.daysInMonth(item.monthIndex, 2018);
    let percentege = Math.round(days*100 / total);
    const data02 = [{value: percentege, fill: '#ff4861'},{value: 100-percentege, fill: '#eeeeee'}];
    return (
      <Panel md={12} lg={6} xl={3} xs={12} title={this.props.title} subhead={`Programaciones realizadas: ${item.distributions.length} `}>
        <div className='dashboard__stat'>
          <div className='dashboard__stat-chart'>
            <PieChart width={120} height={120}>
              <Pie data={data02} dataKey='value' cx={55} cy={55} innerRadius={55} outerRadius={60}/>
            </PieChart>
            <p className='dashboard__stat-label' style={{color: '#ff4861'}}>{percentege}%</p>
          </div>
          <div className='dashboard__stat-info'>
            <p>Dias programados</p>
            <h4 className='dashboard__stat-number'>
              {days} días
            </h4>
            <p>Comites</p>
            <h4 className='dashboard__stat-number'>
              {committees} comites
            </h4>
            <div>
              <Link to={`programacion/detalle/${item.monthIndex}`}>Ver Detalle</Link>
            </div>
          </div>
        </div>
      </Panel>
    )
  }
}

