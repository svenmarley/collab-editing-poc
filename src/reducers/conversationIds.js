import { GLOBALS } from '../actions/shared';

export default function conversationIds( state = {}, action ) {
    const sFunc = `reducers/conversationIds: ${action.type}-->`;
    let debug = false;


    if ( debug && ( action.type.includes( 'CONVERSATIONS' ) ) ) {
        console.log( sFunc + 'state', state );
        console.log( sFunc + 'action', action );
        debug && console.log( sFunc + 'isArray(action.conversationNames)', Array.isArray( action.conversationIds ) )
    }

    switch ( action.type ) {
        case GLOBALS.CONVERSATIONS.RECEIVE:
            return action.conversationIds;

        default:
            return state;
    }

}