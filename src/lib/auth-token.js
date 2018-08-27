// import { CookieStorage } from 'cookie-storage';
import { KEY_TOKEN, KEY_EVENT, KEY_SESSION } from '../contants/local-storage';

const store = localStorage;

class AuthToken {
    static getToken() {
        return JSON.parse(store.getItem(KEY_TOKEN)) || null;
    }

    static setToken(token) {
        if (token) {
            store.setItem(KEY_TOKEN, JSON.stringify(token));
            AuthToken.setSesion();
        } else {
            store.removeItem(KEY_TOKEN);
            AuthToken.removeSesion();
            AuthToken.removeLastUserEvent();
        }
    }

    static getAuthorization() {
        const token = AuthToken.getToken();
        return `${token.tokenType} ${token.accessToken}`;
    }

    static getLastUserEvent() {
        return parseInt(store.getItem(KEY_EVENT), 10);
    }

    static setLastUserEvent() {
        store.setItem(KEY_EVENT, (new Date()).getTime().toString());
    }

    static getSesion() {
        return parseInt(store.getItem(KEY_SESSION), 10);
    }

    static setSesion() {
        store.setItem(KEY_SESSION, (new Date()).getTime().toString());
    }

    static removeSesion() {
        store.removeItem(KEY_SESSION);
    }

    static removeLastUserEvent() {
        store.removeItem(KEY_EVENT);
    }
}

export default AuthToken;
