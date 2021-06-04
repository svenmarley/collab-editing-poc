import { GLOBALS } from '../actions/shared';

export default function docNames( state = {}, action ) {
    const sFunc = `reducers/docNames: ${action.type}-->`;
    let debug = false;


    if ( debug && ( action.type.includes( 'DOCUMENTS' ) ) ) {
        console.log( sFunc + 'state', state );
        console.log( sFunc + 'action', action );
        debug && console.log( sFunc + 'isArray(action.docNames)', Array.isArray( action.docNames ) )
    }

    switch ( action.type ) {
        case GLOBALS.DOCUMENTS.RECEIVE:
            return action.docNames;

        default:
            return state;
    }

}