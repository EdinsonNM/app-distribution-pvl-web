import React, {PureComponent} from 'react';
import { Table, Button, ButtonToolbar } from 'reactstrap';
import { MagnifyIcon } from 'mdi-react';
import {UNIT_MEASURENMENT_ABREV} from '../../../contants/unit_of _measurement';

export default class ListDistribution extends PureComponent{
    render(){
        const {distributions = []} = this.props;
        let headers = [];
        if(distributions.length){
            headers = distributions[0].rations.map((r, index) => 
                <th key={`header-programation-row-${index}`}>{r.productName}</th>
            )
        }
        return (
            <div>
                <ButtonToolbar className='products-list__btn-toolbar-top'>
                    <Button>Crear Acta</Button>
                </ButtonToolbar>
            <Table>
                <thead>
                    <tr>
                        <th>
                        Comite
                        </th>
                        {headers}
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    distributions.map((programation, index) => 
                        <tr key={`programation-row-${index}`}>
                        <td>{programation.committeeName}</td>
                        {
                            programation.rations.map(r => 
                                <td>{r.totalRation} <span dangerouslySetInnerHTML={{__html: UNIT_MEASURENMENT_ABREV[r.unitOfMeasure]}}></span></td>
                            )
                        }
                        <td><Button size="sm">Confirmar</Button></td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            </div>

        )
    }
}