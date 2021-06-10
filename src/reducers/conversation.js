import { GLOBALS } from '../actions/shared';

export default function conversation( state = {}, action ) {
    const sFunc = `reducers/conversation: ${action.type}-->`;
    const debug = false;

    if ( debug && ( action.type.includes( 'CONVERSATIONS' ) ) ) {
        console.log( sFunc + 'state', state );
        console.log( sFunc + 'action', action );
        debug && console.log( sFunc + '' );
    }

    switch ( action.type ) {
        case GLOBALS.CONVERSATIONS.UPDATE:
            return action.conversation;

        default:
            return state;
    }

}