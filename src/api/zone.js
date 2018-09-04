import qs from 'qs';
import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
    ROUTE_ZONE
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class ZoneApi {
	static getAll = ({filter, ...payload}) => {
        let url = CustomUrl.getURL(ROUTE_ZONE, payload) + `?${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
	}
	static post = (payload) => {
        let url = CustomUrl.getURL(ROUTE_ZONE, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
}
export default ZoneApi;