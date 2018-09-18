import AuthToken from './auth-token';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '/api'; // || 'http://104.211.27.152:9090/api/stark-services';
class CustomUrl {
    static getURL = (url, params, server = true, prefix = SERVER_URL) => {
        let fullURL = server ? `${prefix}${url}` : url;
        if (params && Object.keys(params) && Object.keys(params).length) {
            const mapObj = {};
            Object.keys(params).forEach((par) => {
                mapObj[`:${par}`] = params[par];
            });
            const regexp = new RegExp(Object.keys(mapObj).join('|'), 'gi');
            fullURL =  fullURL.replace(regexp, matched => mapObj[matched])
        }
        let token = AuthToken.getToken();
        if(token)
            fullURL += `?access_token=${AuthToken.getToken().id}&`;
        return fullURL;
    };
}
export default CustomUrl;
