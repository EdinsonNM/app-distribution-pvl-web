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
 
}

export default PartnerApi;