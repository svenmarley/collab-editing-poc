import { combineReducers } from 'redux';
import authedUser from './authedUser';
import { loadingBarReducer } from 'react-redux-loading';
import users from './users';
import conversationIds from './conversationIds';
import conversation from './conversation';

export default combineReducers( {
                                    authedUser,
                                    loadingBar : loadingBarReducer,
                                    users,
                                    conversationIds,
                                    conversation,
                                } );
