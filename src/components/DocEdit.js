import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { myFirstDiff } from '../actions/shared';
import { gAPI } from './App';

class DocEdit extends Component {
    #sFunc = 'DocEdit';
    state = {
        value : '',
    };

    handleChange = ( e ) => {
        const sFunc = this.#sFunc + '.handleChange()-->';
        const debug = true;

        const cursorPos = e.target.selectionStart;
        debug && console.log( sFunc + 'cursorPosition', cursorPos );

        let newValue = e.target.value;
        debug && console.log( sFunc + 'newValue', newValue );

        if ( newValue.length - 1 !== this.state.value.length ) {
            // means a char was deleted
            const i = myFirstDiff( this.state.value, newValue );

            const delChar = this.state.value.substring( i, i + 1 );
            console.log( sFunc + 'DEL( %d, 1 )', i, 'char to be deleted', delChar );

        }
        else {
            const newChar = newValue.substring( cursorPos - 1, cursorPos );
            debug && console.log( sFunc + 'newChar', newChar );
            console.log( sFunc + 'INS %d:\'%s\'', cursorPos, newChar );

            gAPI.sendInsert( cursorPos, 1, newChar, 1 ) //docOriginIndex )
                .then( res => res.json() )
                .then( ( result ) => {
                    const sFunc = this.#sFunc + '.handleChange().sendInsert().then.then()-->';

                    console.log( sFunc + 'result', result );

                } );

        }

        // msgServer.send( JSON.stringify( {
        //                                     type : 'fileChange',
        //                                     user : 'alice',
        //                                     value : newValue,
        //                                 } ) );

        this.setState( ( state ) => ( {
            ...state,
            value : newValue,
        } ) );

    };

    render() {
        const sFunc = this.#sFunc + '.render()-->';
        const debug = true;

        debug && console.log( sFunc + 'props', this.props );
        const { authedUser, users } = this.props;

        const user = users[authedUser] || null;
        debug && console.log( sFunc + 'user', user );
        const userName = ( user ? user.name : '' );

        return (
            <div>
                {authedUser === null
                    ?
                    null
                    :
                    <div>
                        <h3>Welcome: {userName}</h3>

                        <textarea name="test"
                                  rows="10" cols="70"
                                  value={this.state.value}
                                  onChange={this.handleChange}
                        >
                    </textarea>
                    </div>
                }
            </div>
        );
    }

}

DocEdit.propTypes = {};

function mapStateToProps( { authedUser, users } ) {
    const sFunc = 'DocsEdit.js.mapStateToProps()-->';
    const debug = false;

    debug && console.log( sFunc + 'here' );

    return {
        authedUser,
        users,
    };
}

//DocEdit.propTypes = {};

export default connect( mapStateToProps )( DocEdit );