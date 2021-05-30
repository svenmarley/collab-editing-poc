import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUserObjLogOut } from '../actions/authedUserActions';

class Logout extends Component {
    sFunc = 'Logout';

    componentDidMount() {
        this.props.dispatch( setAuthedUserObjLogOut() )
    }

    render() {
        return (
            <div >
                Logged Out
            </div>
        );
    }
}


export default connect()(Logout);
