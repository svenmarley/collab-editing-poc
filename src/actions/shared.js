// noinspection SpellCheckingInspection

import { API } from '../utils/_DATA_';
import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveUsersObj } from './userActions';
import { setAuthedUserObjLogOut } from './authedUserActions';

//const AUTHED_ID = 'sarahedo';

export const GLOBALS = {
    USERS : {
        RECEIVE : 'USERS_RECEIVE',
        LOGIN : 'USER_LOGIN',
        LOGOUT : 'USER_LOGOUT',
    },

};

export function handleInitialData() {
    const sFunc = 'handleInitialData()-->';
    let debug = true;

    console.log( sFunc );

    return ( dispatch, /*getState*/ ) => {
        const sFunc1 = sFunc + '.dispatch()-->';
        debug && console.log( sFunc1 + 'here' );

        dispatch( showLoading() );

        return API.getInitialData()
                  .then( ( { users, data } ) => {
                      const sFunc2 = sFunc1 + 'getInitialData().then()-->';
                      debug && console.log( sFunc2 + 'users', users );
                      debug && console.log( sFunc2 + 'data', data );

                      dispatch( receiveUsersObj( users ) );

                      dispatch( setAuthedUserObjLogOut() )
                      //dispatch( setAuthedUserObj( 'johndoe' ) );

                      dispatch( hideLoading() );
                  } )
    };
}


