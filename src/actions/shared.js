// noinspection SpellCheckingInspection

import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsersObj } from './userActions';
import { setAuthedUserObj } from './authedUserActions';
import { gAPI } from '../components/App'
import { receiveDocNamesObj } from './docNamesActions';

//const AUTHED_ID = 'sarahedo';

export const GLOBALS = {
    USERS : {
        RECEIVE : 'USERS_RECEIVE',
        LOGIN : 'USER_LOGIN',
        LOGOUT : 'USER_LOGOUT',
    },
    DOCUMENTS: {
        RECEIVE: 'DOCUMENTS_RECEIVE',
        LOAD: 'DOCUMENT_LOAD',
    },
    NAV: {
        LOGIN: 'NAV_LOGIN',
        LOGOUT: 'NAV_LOGOUT',
        DOC_LIST: 'NAV_DOC_LIST',
        EDIT_CURRENT_DOC: 'NAV_EDIT_CURRENT_DOC',
    }


};

export function handleInitialData() {
    const sFunc = 'handleInitialData()-->';
    let debug = false;

    return ( dispatch, /*getState*/ ) => {
        const sFunc1 = sFunc + '.dispatch()-->';

        dispatch( showLoading() );

        return gAPI.getInitialData()
                  .then( ( { users, data, docsInfo } ) => {
                      const sFunc2 = sFunc1 + 'getInitialData().then()-->';
                      debug && console.log( sFunc2 + 'users', users );
                      debug && console.log( sFunc2 + 'data', data );
                      debug && console.log( sFunc2 + 'docsInfo ', docsInfo );

                      dispatch( receiveUsersObj( users ) );

                      let docNames = docsInfo.conversations.map( ( di) => {
                          return di.id;
                      })
                      debug && console.log( sFunc2 + 'docNames', docNames );
                      dispatch( receiveDocNamesObj( docNames ) );

                      //dispatch( setAuthedUserObjLogOut() )
                      dispatch( setAuthedUserObj( 'alice' ) );

                      dispatch( hideLoading() );
                  } )
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

