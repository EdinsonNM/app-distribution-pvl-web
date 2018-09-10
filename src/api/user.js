import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
    ROUTE_USER
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';
import qs from 'qs';

class UserApi{
    static login = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_USER}/login`, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
    static logout = (payload) => {
        let url = CustomUrl.getURL(`${ROUTE_USER}/logout`, {});
        return ajax.post(url, payload, HeaderRequest.getPublicRequestHeader());
    }
}

export default UserApi;