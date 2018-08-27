import AuthToken from './auth-token';
class HeaderRequest{
	static getRequestHeader(){
		return {
			Authorization: AuthToken.getAuthorization(),
			'Content-Type': 'application/json',
			Accept: 'application/json'
		};
	}
	static getPublicRequestHeader() {
        const requestHeader = { 'Content-Type': 'application/json', Accept: 'application/json' };
        return requestHeader;
    }
}

export default HeaderRequest;