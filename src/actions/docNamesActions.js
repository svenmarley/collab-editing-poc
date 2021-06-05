import { GLOBALS } from './shared';

export function receiveDocNamesObj( inDocNames ) {
    const sFunc = 'docNamesActions.js.receiveDocNameObj()-->'
    const debug = false;

    debug && console.log( sFunc + 'isArray(inDocNames)', Array.isArray( inDocNames ) )

    return {
        type: GLOBALS.DOCUMENTS.RECEIVE,
        docNames: inDocNames
    }
}


