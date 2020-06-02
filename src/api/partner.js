import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import { ROUTE_PARTNER } from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';
import qs from 'qs';
class PartnerApi{
    static getAll = ({...payload, filter = ''} = {}) => {
        let url = CustomUrl.getURL(ROUTE_PARTNER, payload) + qs.stringify({filter});
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static post = (payload) => {
        let url = CustomUrl.getURL(ROUTE_PARTNER, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static put = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_PARTNER}/:id`, {id: payload.id});
        return ajax.put(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static delete = (id) => {
        let url = CustomUrl.getURL(`${ROUTE_PARTNER}/:id`, {id});
        return ajax.delete(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default PartnerApi;