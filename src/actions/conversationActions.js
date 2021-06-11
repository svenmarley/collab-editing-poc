import { GLOBALS } from './shared';

export function storeConversation( conversationId, content, lastMutation, origin ) {
    const sFunc = 'conversationActions.js.storeConversation()-->'
    const debug = true;

    debug && console.log( sFunc + 'docId', conversationId, 'content', content, 'lastMutation', lastMutation, 'origin', origin )

    return {
        type: GLOBALS.CONVERSATIONS.UPDATE,
        conversation : {
            id: conversationId,
            content: content,
            lastMutation: lastMutation,
            origin: origin,
        }
    }
}


