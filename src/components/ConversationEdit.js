//import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { myFirstDiff } from '../actions/shared';
import { gAPI } from './App';
import { storeConversation } from '../actions/conversationActions';

class ConversationEdit extends Component {
    #sFunc = 'ConversationEdit';

    componentDidMount() {
        const sFunc = this.#sFunc + '.componentDidMount()-->';
        const debug = false;

        const { params } = this.props.match;
        const { dispatch } = this.props;
        debug && console.log( sFunc + 'params', params );

        gAPI.getConversation( params.id )
            .then( ( conversation ) => {
                const sFunc = this.#sFunc + '.componentDidMount().gAPI.getConversation.then()-->';
                const debug = true;

                debug && console.log( sFunc + 'conversation', conversation );

                dispatch( storeConversation( params.id, conversation.text, conversation.lastMutation ) );
            } );

    }

    handleChange = ( e ) => {
        const sFunc = this.#sFunc + '.handleChange()-->';
        const debug = false;

        const cursorPos = e.target.selectionStart;
        debug && console.log( sFunc + 'cursorPosition', cursorPos );

        let newValue = e.target.value;
        debug && console.log( sFunc + 'newValue', newValue );

        const { conversation } = this.props;

        if ( newValue.length - 1 !== conversation.content.length ) {
            // means a char was deleted
            const i = myFirstDiff( conversation.content, newValue );

            const delChar = conversation.content.substring( i, i + 1 );
            console.log( sFunc + 'DEL( %d, 1 )', i, 'char to be deleted', delChar );

        }
        else {
            const newChar = newValue.substring( cursorPos - 1, cursorPos );
            debug && console.log( sFunc + 'newChar', newChar );
            console.log( sFunc + 'INS %d:\'%s\'', cursorPos, newChar );

            gAPI.sendInsert( conversation.id, cursorPos - 1, 1, newChar, 1 )
                .then( res => res.json() )
                .then( ( result ) => {
                    const sFunc = this.#sFunc + '.handleChange().sendInsert().then.then()-->';

                    console.log( sFunc + 'result', result );
                } );

        }

    };

    render() {
        const sFunc = this.#sFunc + '.render()-->';
        const debug = true;

        debug && console.log( sFunc + 'props', this.props );
        const { authedUser, users, conversation } = this.props;

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
                                  value={conversation.content}
                                  onChange={this.handleChange}
                        >
                    </textarea>
                    </div>
                }
            </div>
        );
    }

}

ConversationEdit.propTypes = {};

function mapStateToProps( { authedUser, users, conversation } ) {
    const sFunc = 'ConversationEdit.js.mapStateToProps()-->';
    const debug = false;

    debug && console.log( sFunc + 'here' );

    return {
        authedUser,
        users,
        conversation,
    };
}

//ConversationEdit.propTypes = {};

export default connect( mapStateToProps )( ConversationEdit );