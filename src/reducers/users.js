import { GLOBALS } from '../actions/shared';

export default function users( state = {}, action ) {
    const sFunc = `reducers/users: ${action.type}-->`;
    let debug = true;

    if ( debug && ( action.type.includes( 'USER' ) ) )
        console.log( sFunc + 'state', state, 'action', action );

    switch ( action.type ) {
        case GLOBALS.USERS.RECEIVE:
            return {
                ...state,
                ...action.users,
            };

        default:
            return state;
    }

}