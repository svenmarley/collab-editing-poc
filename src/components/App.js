import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBarContainer from 'react-redux-loading';

import Login from './Login';
import Logout from './Logout';
import '../assets/App.css';

import { API } from '../utils/_DATA_';
import { handleInitialData } from '../actions/shared';
import ConversationsList from './ConversationsList';
import ConversationEdit from './ConversationEdit';
import Nav from './Nav';
import { storeConversation } from '../actions/conversationActions';
import { store } from '../index';

const config = require( '../config' );

export let gAPI = new API();
gAPI.setConfig( config.apiServerPath, null );

class App extends Component {
    #sFunc = 'App';
    state = {
        value : '',
    };

    componentDidMount() {
        const sFunc = this.#sFunc + '.componentDidMount()-->';
        const debug = false;

        debug && console.log( sFunc + 'props', this.props );

        this.props.dispatch( handleInitialData() );
    }

    render() {
        const sFunc = this.#sFunc + '.render()-->';
        const debug = false;

        debug && console.log( sFunc + 'props', this.props );

        return (
            <Router>
                <Fragment>
                    <LoadingBarContainer/>
                    <div className="App">
                        {this.props.loading === true
                            ? <span>loading</span>
                            : <div>
                                <Nav/>
                                <Route path={'/'} exact component={ConversationsList}/>
                                <Route path={'/login'} exact component={Login}/>
                                <Route path={'/logout'} exact component={Logout}/>
                                <Route path={'/conversations'} exact component={ConversationsList}/>
                                <Route path={'/conversations/:id'} exact component={ConversationEdit}/>
                            </div>
                        }
                    </div>

                </Fragment>

            </Router>
        );
    }
}

function mapStateToProps( { users, authedUser } ) {
    const sFunc = 'App.js.mapStateToProps()-->';
    const debug = false;

    debug && console.log( sFunc + 'authedUser', authedUser, 'users', users );

    return {
        loading : users.length === 0,
        users,
        authedUser,
    };
}

// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************

//   MESSAGE SERVER --- STUFF
let W3CWebSocket = require( 'websocket' ).w3cwebsocket;

let client = new W3CWebSocket( config.msgServerPath );//, 'echo-protocol');

client.onerror = function( err ) {
    const sFunc = 'client.onerror()-->';
    console.log( sFunc + 'connection error', err );
};

client.onopen = function( connection ) {
    console.log( 'WebSocket Client Connected on', config.msgServerPath, 'connection', connection );
};

client.onmessage = function( message ) {
    let sFunc = 'client.onmessage()-->';
    const debug = true;

    debug && console.log( sFunc + 'message', message );

    const m = JSON.parse( message.data );
    console.log( sFunc + 'm', m );
    const { id, lastMutation, content, origin } = m;

    sFunc = 'app.js.client.onmessage().return()-->';

    console.log( sFunc + 'dispatching  id', id, 'origin', origin, 'content', content, 'lastMutation', lastMutation );

    store.dispatch( storeConversation( id, content, lastMutation, origin ) );

};

export default connect( mapStateToProps )( App );