import { GLOBALS } from './shared';

export function receiveConversationNamesObj( inConversationIds ) {
    const sFunc = 'conversationIdsActions.js.receiveDocNameObj()-->'
    const debug = false;

    debug && console.log( sFunc + 'isArray(inConversationIds)', Array.isArray( inConversationIds ) )

    return {
        type: GLOBALS.CONVERSATIONS.RECEIVE,
        conversationIds: inConversationIds
    }
}


