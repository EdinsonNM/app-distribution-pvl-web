import { Observable } from 'rxjs-compat';
import { switchMap, catchError, map, mergeMap, tap, finalize } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { of, concat, forkJoin, empty, from } from 'rxjs';

import IncomeApi from '../../api/income';
import ProductApi from '../../api/product';
import store from '../../app/store';
import { INPUTS_OUTPUTS_LOAD, inputsLoadOk, outputsLoadOk } from '../actions/reports';
import CustomDate from '../../lib/custom-date';
import ProgramationDetailApi from '../../api/programaciondetail';
import moment from 'moment';
class ReportsEpic{
	static report1Load = (action$) =>  action$.pipe(
		ofType(INPUTS_OUTPUTS_LOAD),
		switchMap(({payload}) => {
            let range = CustomDate.getMonthDateRange(payload.year, payload.month);   
            let inputsObs = IncomeApi.getAll({filter:{where:{productId:payload.productId}}}).pipe(
                mergeMap(response =>
                    forkJoin(...response.map(item => 
                        ProductApi.get(item.productId).pipe(
                            map(data => ({
                                unity: item.unityId,
                                quantity: item.quantity,
                                code: item.inputCode,
                                date: item.entryDate,
                                product: data,
                                type: 'Ingreso'
                            }))
                        )
                    ))
                ),
                map(response => inputsLoadOk(response)),
                catchError(error => of(inputsLoadOk(error)))
            );
            let outputObs = ProgramationDetailApi.getAll({where:{month: payload.month, year: payload.year, withActa: true}}).pipe(
                map(response =>{
                    let outputs = {}
                    response.forEach(item => {
                        let key = moment(item.actaDate).format('YYYYMMDD');
                        if(!outputs.hasOwnProperty(key)){
                            outputs[key] = {
                                date: item.actaDate,
                                type: 'Salida',
                                code: moment(item.actaDate).format('YYYYMMDD'),
                                quantity: 0
                            }
                        }
                        let product = item.rations.find(r => r.productId === payload.productId);
                        if(product){
                            outputs[key].quantity = outputs[key].quantity + product.totalRation;
                            outputs[key].unity = product.unitOfMeasure;
                        }
                        
                    });
                    return Object.keys(outputs).map(k => outputs[k]);
                }),
                map(response => outputsLoadOk(response)),
                catchError(error => of(outputsLoadOk(error)))
            );
            return concat(
                inputsObs,
                outputObs
            )
        })
	);
	
}
export default function ReportsEpics(action$){
	return Observable.merge(
			ReportsEpic.report1Load(action$),		
	);
}