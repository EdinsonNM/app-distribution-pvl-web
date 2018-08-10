import React, {PureComponent} from 'react';
import  Committee from './committee';
import { Row } from 'reactstrap';
const data = [
  {name: 'comite 1', partners: 80},
  {name: 'comite 2', partners: 50},
  {name: 'comite 3', partners: 32},
  {name: 'comite 4', partners: 90}
];
export default class Committees extends PureComponent {
  render() {
    return (
      <Row>
        {data.map(c => <Committee committee={c} max={100}/>)}
      </Row>
    )
  }
}