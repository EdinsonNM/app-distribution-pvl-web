import React, {PureComponent} from 'react';
import {PieChart, Pie} from 'recharts';
import Panel from '../../../components/Panel';

const data01 = [
  {value: 80, fill: '#4ce1b6'},
  {value: 20, fill: '#eeeeee'},
  {value: 30, fill: '#e97eee'},
  {value: 80, fill: '#aae7b6'},
  {value: 20, fill: '#78e98e'},
  {value: 30, fill: '#e97e90'}
];

const data02 = [{value: 50, fill: '#ff4861'},
  {value: 50, fill: '#eeeeee'}];

export default class DistributionItem extends PureComponent {
  render() {
    return (
      <Panel md={12} lg={6} xl={3} xs={12} title={this.props.title} subhead='Top selling items statistic by last month'>
        <div className='dashboard__stat'>
          <div className='dashboard__stat-chart'>
            <PieChart height={120} width={120}>
              <Pie data={data01} dataKey='value' cx={55} cy={55} innerRadius={55} outerRadius={60}/>
            </PieChart>
            <p className='dashboard__stat-label' style={{color: '#4ce1b6'}}>80%</p>
          </div>
          <div className='dashboard__stat-info'>
            <p>Leche</p>
            <h4 className='dashboard__-stat-number'>
              23,747 Lts.
            </h4>
          </div>
        </div>
        <div className='dashboard__stat'>
          <div className='dashboard__stat-chart'>
            <PieChart width={120} height={120}>
              <Pie data={data02} dataKey='value' cx={55} cy={55} innerRadius={55} outerRadius={60}/>
            </PieChart>
            <p className='dashboard__stat-label' style={{color: '#ff4861'}}>50%</p>
          </div>
          <div className='dashboard__stat-info'>
            <p>Avena</p>
            <h4 className='dashboard__stat-number'>
              23,747 Grm.
            </h4>
          </div>
        </div>
      </Panel>
    )
  }
}

