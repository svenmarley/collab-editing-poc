import { GLOBALS } from './shared';

export function storeConversation( conversationId, content, lastMutation ) {
    const sFunc = 'conversationActions.js.storeConversation()-->'
    const debug = true;

    debug && console.log( sFunc + 'docId', conversationId, 'content', content )

    return {
        type: GLOBALS.CONVERSATIONS.UPDATE,
        conversation : {
            id: conversationId,
            content: content,
            lastMutation: lastMutation,
        }
    }
}


