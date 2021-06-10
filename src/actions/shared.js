// noinspection SpellCheckingInspection

import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsersObj } from './userActions';
import { setAuthedUserObjLogOut } from './authedUserActions';
import { gAPI } from '../components/App';
import { receiveConversationNamesObj } from './conversationIdsActions';

//const AUTHED_ID = 'sarahedo';

export const GLOBALS = {
    USERS : {
        RECEIVE : 'USERS_RECEIVE',
        LOGIN : 'USER_LOGIN',
        LOGOUT : 'USER_LOGOUT',
    },
    CONVERSATIONS : {
        RECEIVE : 'CONVERSATIONS_RECEIVE',
        LOAD : 'CONVERSATIONS_LOAD',
        UPDATE : 'CONVERSATIONS_UPDATE_CONVERSATION',
    },
    NAV : {
        LOGIN : 'NAV_LOGIN',
        LOGOUT : 'NAV_LOGOUT',
        CONVERSATION_LIST : 'NAV_CONVERSATION_LIST',
        EDIT_CONVERSATION : 'NAV_EDIT_CONVERSATION',
    },

};

export function handleInitialData() {
    const sFunc = 'handleInitialData()-->';
    let debug = false;

    return ( dispatch /*getState*/ ) => {
        const sFunc1 = sFunc + '.dispatch()-->';

        dispatch( showLoading() );

        return gAPI.getInitialData()
                   .then( ( { users, conversations } ) => {
                       const sFunc2 = sFunc1 + 'getInitialData().then()-->';
                       debug && console.log( sFunc2 + 'users', users );
                       //debug && console.log( sFunc2 + 'data', data );
                       debug && console.log( sFunc2 + 'conversations ', conversations );

                       dispatch( receiveUsersObj( users ) );

                       let conversationNames = conversations.conversations.map( ( di ) => {
                           return di.id;
                       } );
                       debug && console.log( sFunc2 + 'conversationIds', conversationNames );
                       dispatch( receiveConversationNamesObj( conversationNames ) );

                       dispatch( setAuthedUserObjLogOut() );
                       //dispatch( setAuthedUserObj( 'alice' ) );

                       dispatch( hideLoading() );
                   } );
    };
}

export const myFirstDiff = ( a, b ) => {

    let aIndex = 0;

    while ( aIndex < a.length ) {

        if ( a[aIndex] !== b[aIndex] )
            break;

        if ( aIndex === b.length )
            aIndex = -1;

        aIndex++;
    }

    return ( aIndex === a.length ? -1 : aIndex );
};

