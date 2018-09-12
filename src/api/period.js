import qs from 'qs';
import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
    ROUTE_PERIOD,
    ROUTE_PERIOD_RATIONS_COUNT,
    ROUTE_PERIOD_RATIONS
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';


class PeriodApi{
    static getAll = ({filter, ...payload}) => {
        let url = CustomUrl.getURL(ROUTE_PERIOD, payload) + `?${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static get = (id) => {
        let url = CustomUrl.getURL(`${ROUTE_PERIOD}/:id`, {id});
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getRationsCount = (payload) => {
        let url = CustomUrl.getURL(ROUTE_PERIOD_RATIONS_COUNT, payload);
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getRations = (payload) => {
        let url = CustomUrl.getURL(ROUTE_PERIOD_RATIONS, payload);
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default PeriodApi;