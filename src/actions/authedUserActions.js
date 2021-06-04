import { GLOBALS } from './shared';
import { gAPI } from '../components/App';

export function setAuthedUserObj( authedUser ) {

    gAPI.setConfig( null, authedUser );

    return {
        type: GLOBALS.USERS.LOGIN,
        authedUser
    }
}

export function setAuthedUserObjLogOut() {
    return {
        type: GLOBALS.USERS.LOGOUT
    }
}

