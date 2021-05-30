import { GLOBALS } from './shared';

export function setAuthedUserObj( authedUser ) {
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

