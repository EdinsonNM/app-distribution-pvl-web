import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {ROUTE_URBANCORES} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class UrbanCoreApi{
    static getAll = (payload) => {
        let url = CustomUrl.getURL(ROUTE_URBANCORES, payload);
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default UrbanCoreApi;