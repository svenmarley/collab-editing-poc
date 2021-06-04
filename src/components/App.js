import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBarContainer from 'react-redux-loading';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import Login from './Login';
import Logout from './Logout';
import '../assets/App.css';

import { API } from '../utils/_DATA_';
import { handleInitialData, myFirstDiff } from '../actions/shared';
import DocsList from './DocsList';
import DocEdit from './DocEdit';

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
                                <Route path={'/login'} exact component={Login}/>
                                <Route path={'/logout'} exact component={Logout}/>
                                <Route path={'/'} exact component={DocsList}/>
                                <Route path={'/docs'} exact component={DocsList}/>
                                <Route path={'/docs/:id'} exact component={DocEdit}/>
                            </div>
                        }
                    </div>

                </Fragment>

            </Router>
        );
    }
}

function mapStateToProps( { users, authedUser } ) {
    // const sFunc = 'App.js.mapStateToProps()-->';
    // const debug = false;

    let bRet = true;
    if ( typeof ( users ) !== 'undefined' ) {
        if ( users.length !== 0 )
            if ( authedUser )
                bRet = false;
    }

    return {
        loading : bRet,
        users,
        authedUser,
    };
}

// ******************************************************************************************************
// ******************************************************************************************************
// ******************************************************************************************************

//   MESSAGE SERVER --- STUFF

const msgServer = new W3CWebSocket( config.msgServerPath );

msgServer.onopen = () => {
    console.log( 'WebSocket Client Connected' );
};
msgServer.onmessage = ( message ) => {
    const sFunc = 'msgServer.onmessage()-->';
    const debug = false;

    debug && console.log( sFunc + 'message', message );

    const m = JSON.parse( message.data );

    const n = myFirstDiff( this.state.value, m.value );
    debug && console.log( sFunc + 'state.value [%s] m[%s] n', this.state.value, m.value, n );

    this.setState( ( state ) => ( {
        ...state,
        value : m.value,
    } ) );

};

export default connect( mapStateToProps )( App );