import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {ROUTE_RATION} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class RationApi{
    static post = (payload) => {
        let url = CustomUrl.getURL(ROUTE_RATION, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
}

export default RationApi;