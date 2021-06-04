import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactLogo from '../assets/logo.svg';
import { setAuthedUserObj } from '../actions/authedUserActions';
import Nav from './Nav';

class Login extends Component {
    sFunc = 'Login';
    state = {
        currUser: 'choose',
    }

    handleChange = (e) => {
        const sFunc = this.sFunc + '.handleChange()-->';
        const debug = false;

        debug && console.log( sFunc + 'e.target.value', e.target.value );

        this.setState( { currUser: e.target.value })

    }
    handleSubmit = ( e ) => {
        const sFunc = this.sFunc + '.handleSubmit()-->';
        const debug = true;

        e.preventDefault();

        if ( debug ) {
            console.log( sFunc + 'e.target', e.target );
            console.log( sFunc + 'e.target.value', e.target.value );
            console.log( sFunc + 'this', this )
            console.log( sFunc + 'this.state', this.state )
        }

        const userChoice = this.state.currUser;

        debug && console.log( sFunc + 'userChoice', userChoice );

        const { dispatch } = this.props;

        dispatch( setAuthedUserObj( userChoice ) );

        this.props.history.push( `/` );
    };

    render() {
        const sFunc = this.sFunc + '.render()-->';
        const debug = false;

        let { users,  } = this.props;

        debug && console.log( sFunc + 'users', users, 'type', typeof ( users ), 'keys len', Object.keys( users ).length );

        if ( Object.keys( users ).length === 0 )
            return null;

        this.options = Object.keys( users ).map( ( uId ) => {
            const user = users[uId];

            return ( {
                value : uId,
                label : user.name,
            } );
        } );

        debug && console.log( sFunc + 'options', this.options );

        return (
            <div className="login-main">
                <Nav />
                <div className="login-welcome">
                    <h5>Welcome to the <strong>Would You Rather</strong> app</h5>
                    Please sign in to continue
                </div>
                <div>
                    <div>
                        <img src={ReactLogo} alt={'blah'} className={'login-reactLogo'}/>
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit} >
                            <select id='usersSelect' name='users' ref='usersSelect'
                                    style={{ width : '90%' }}
                                    defaultValue={this.state.currUser}
                                    onChange={this.handleChange}
                            >
                                <option value={'choose'}
                                        disabled
                                        hidden
                                        key={'select-none'}
                                >Select a User...
                                </option>
                                {Object.keys( users ).map( ( uId ) => {
                                    const user = users[uId];

                                    return (
                                        <option value={uId}
                                                key={uId}
                                        >
                                            {user.name}
                                        </option>
                                    );
                                } )}
                            </select>
                            <button
                                style={{
                                    backgroundColor : 'lightGreen',
                                    width : '90%',
                                }}
                            >Sign In
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps( { authedUser, users } ) {
    return {
        authedUser,
        users,
    };
}

export default withRouter( connect( mapStateToProps )( Login ) );
