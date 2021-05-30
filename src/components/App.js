import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import '../assets/App.css';
import LoadingBarContainer from 'react-redux-loading';
import Login from './Login';
import Logout from './Logout';

class App extends Component {
    sFunc = 'App';

    componentDidMount() {
        const sFunc = this.sFunc + '.componentDidMount()-->';
        const debug = false;

        debug && console.log( sFunc + 'props', this.props );

        this.props.dispatch( handleInitialData() );
    }

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = true;

        debug && console.log( sFunc + 'props', this.props );
        const { authedUser, users } = this.props;


        const user = users[authedUser];
        debug && console.log( sFunc + 'user', user );
        const userName = ( user ? user.name : '' );


        return (
            <Router>
                <Fragment>
                    <LoadingBarContainer/>
                    <div className="App">
                        {this.props.loading === true
                            ? <span>loading</span>
                            : <div>
                                Welcome: {userName}
                                <Route path={'/login'} exact component={Login}/>
                                <Route path={'/logout'} exact component={Logout}/>
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
            bRet = false;
    }

    return {
        loading : bRet,
        users,
        authedUser,
    };
}

export default connect( mapStateToProps )( App );
