import HeaderRequest from '../lib/header-request';
import CustomUrl from '../lib/custom-url'
import {
    ROUTE_COMMITTEE,
    ROUTE_COMMITTEE_PARTNERS_COUNT,
    ROUTE_COMMITTEE_PARTNERS,
    ROUTE_COMMITTEE_BENEFICIARIES,
    ROUTE_COMMITTEE_BENEFICIARIES_COUNT
} from '../contants/routes/route-services';
import { ajax } from 'rxjs/ajax';
import qs from 'qs';

class CommitteeApi{
    static getAll = ({...payload, filter = {}} = {}) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE, payload) + `?${qs.stringify({filter}, { encodeValuesOnly: true })}`;
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static get = (id) => {
        let url = CustomUrl.getURL(`${ROUTE_COMMITTEE}/:id`, {id});
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getPartnersCount = (payload) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_PARTNERS_COUNT, payload);
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getPartners = (payload) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_PARTNERS, payload);
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }

    static getBeneficiariesCount = (payload) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_BENEFICIARIES_COUNT, payload);
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
    static getBeneficiaries = (payload) => {
        let url = CustomUrl.getURL(ROUTE_COMMITTEE_BENEFICIARIES, payload);
        return ajax.getJSON(url, HeaderRequest.getPublicRequestHeader());
    }
}

export default CommitteeApi;