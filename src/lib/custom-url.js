const SERVER_URL = process.env.SERVER_URL || '/api'; // || 'http://104.211.27.152:9090/api/stark-services';
class CustomUrl {
    static getURL = (url, params, server = true, prefix = SERVER_URL) => {
        const fullURL = server ? `${prefix}${url}` : url;
        if (params && Object.keys(params) && Object.keys(params).length) {
            const mapObj = {};
            Object.keys(params).forEach((par) => {
                mapObj[`:${par}`] = params[par];
            });
            const regexp = new RegExp(Object.keys(mapObj).join('|'), 'gi');
            return fullURL.replace(regexp, matched => mapObj[matched]);
        }
        return fullURL;
    };
}
export default CustomUrl;
