import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
    ROUTE_COMMITTEE,
    ROUTE_COMMITTEE_PARTNERS_COUNT,
    ROUTE_COMMITTEE_PARTNERS,
    ROUTE_COMMITTEE_BENEFICIARIES,
    ROUTE_COMMITTEE_BENEFICIARIES_COUNT, 
  ROUTE_COMMITTEE_COUNT
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';
import qs from 'qs';

class CommitteeApi{
    static getAll = ({...payload, filter = {}} = {}) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE, payload) + `${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getCount = (where) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_COUNT, {}) + `${qs.stringify({where}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static get = (id) => {
        let url = CustomUrl.getURL(`${ROUTE_COMMITTEE}/:id`, {id});
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getPartnersCount = (id, filter) => {
        let filterString = (filter) ? `${qs.stringify({filter}, { encodeValuesOnly: true })}` : '';
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_PARTNERS_COUNT, {id}) + filterString;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getPartners = (id, filter) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_PARTNERS, {id})+ `${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    

    static getBeneficiariesCount = (id, filter) => {
        let filterString = (filter) ? `${qs.stringify({filter}, { encodeValuesOnly: true })}` : '';
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_BENEFICIARIES_COUNT, {id}) + filterString;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getBeneficiaries = (id, filter) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_BENEFICIARIES, {id}) + `${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default CommitteeApi;