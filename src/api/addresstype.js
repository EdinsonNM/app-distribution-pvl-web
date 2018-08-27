import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import { ROUTE_ADDRESSTYPE } from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class AddressTypeApi{
    static getAll = (payload) => {
        let filter = {where:{active:true}};
        let url = CustomUrl.getURL(ROUTE_ADDRESSTYPE, {filter: JSON.stringify(filter)});
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default AddressTypeApi;