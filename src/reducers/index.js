import { combineReducers } from 'redux';
import authedUser from './authedUser';
import { loadingBarReducer } from 'react-redux-loading';
import users from './users';

export default combineReducers( {
                                    authedUser,
                                    loadingBar : loadingBarReducer,
                                    users,
                                } );