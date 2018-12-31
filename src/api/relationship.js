import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import { ROUTE_RELATIONSHIPS } from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class RelationShipApi{
    static getAll = (payload) => {
        let filter = {where:{active:true}};
        let url = CustomUrl.getURL(ROUTE_RELATIONSHIPS, {}) + `filter=${JSON.stringify(filter)}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default RelationShipApi;