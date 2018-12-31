import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import { ROUTE_BENEFITTYPE } from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';

class BenefitTypeApi{
    static getAll = (payload) => {
        let filter = {where:{active:true}};
        let url = CustomUrl.getURL(ROUTE_BENEFITTYPE, {}) + `filter=${JSON.stringify(filter)}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default BenefitTypeApi;