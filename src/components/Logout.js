import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUserObjLogOut } from '../actions/authedUserActions';

class Logout extends Component {
    sFunc = 'Logout';

    componentDidMount() {
        this.props.dispatch( setAuthedUserObjLogOut() );

        this.props.history.push( `/login` );

    }

    render() {
        return (
            <div>
                Logged Out
            </div>
        );
    }
}

function mapStateToProps() {

    return {};
}

export default connect( mapStateToProps )( Logout );