import { GLOBALS } from '../actions/shared';

// I don't understand this reducer.  Why is state default to null here?  every other reducer it's {}
export default function authedUser( state = null, action ) {
    //const sFunc = 'reducers/authedUser()-->';

    switch ( action.type ) {
        case GLOBALS.USERS.LOGIN:
            return action.authedUser;

        case GLOBALS.USERS.LOGOUT:
            return null;

        default:
            return state;
    }
}
