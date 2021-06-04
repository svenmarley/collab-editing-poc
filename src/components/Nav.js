import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GLOBALS } from '../actions/shared';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
    #sFunc = 'Nav';

    handleNavClick = ( e ) => {
        const sFunc = this.#sFunc + '.handleNavClick()-->';
        const debug = true;

        const { target } = e;
        const navTarget = target.id;

        debug && console.log( sFunc + 'target', target.id );

        switch ( navTarget ) {
            case GLOBALS.NAV.LOGOUT:
                this.props.history.push( '/logout' );
                break;

            case GLOBALS.NAV.LOGIN:
                this.props.history.push( '/login' );
                break;

            case GLOBALS.NAV.DOC_LIST:
                this.props.history.push( '/docs' );
                break;

            default:
                break;
        }

    };

    render() {
        const sFunc = this.#sFunc + '.render()==>';
        const debug = true;

        debug && console.log( sFunc + '.props', this.props );

        const { authedUser } = this.props;
        const user = this.props.users[authedUser];

        return (
            <nav className="Nav-block" onClick={this.handleNavClick}>
                {( authedUser === null )
                    ?
                    <NavLink to={'/login'} exact activeClassName={'Nav-active'}>Login</NavLink>
                    :
                    <span>Hello {user.name}</span>
                }
                <NavLink to={'/logout'} exact activeClassName={'Nav-active'}>Logout</NavLink>
                <NavLink to={'/docs'} exact activeClassName={'Nav-active'}>Docs List</NavLink>
            </nav>
        );
    }
}

function mapStateToProps( {
                              authedUser,
                              docNames,
                              users,
                          },
) {
    const sFunc = 'Nav.js.mapStateToProps()-->';
    const debug = true;

    const ret = {
        authedUser,
        docNames,
        users,
    };

    debug && console.log( sFunc + 'here', 'returning', ret );

    return ret;
}

//DocsList.propTypes = {};
export default connect( mapStateToProps )( Nav );
