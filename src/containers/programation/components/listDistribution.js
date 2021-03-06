import React, {PureComponent} from 'react';
import { Table, Button, ButtonToolbar } from 'reactstrap';
import { MagnifyIcon } from 'mdi-react';
import { Link } from 'react-router-dom';
import {UNIT_MEASURENMENT_ABREV} from '../../../contants/unit_of _measurement';
import ProgramationDetailApi from '../../../api/programaciondetail';

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
                        <td>
                        {
                            (programation.withActa)?
                            <a target="blank" href={ProgramationDetailApi.download(programation.id, programation.programationId)} download>Imprimir</a>
                            :
                            <div>
                            <Button color="success" size="sm" onClick={() => this.props.programationdetailConfirmDistribution(programation.programationId,programation.id) }>Confirmar</Button>
                            <Button color="danger" size="sm" onClick={() => this.props.programationdetailRemoveDistribution(programation.programationId,programation.id) }>Quitar</Button>
                            </div>
                        }
                        </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            </div>

        )
    }
}