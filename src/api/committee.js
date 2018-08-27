import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {ROUTE_COMMITTEE} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class CommitteeApi{
    static getAll = (payload) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE, payload);
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default CommitteeApi;