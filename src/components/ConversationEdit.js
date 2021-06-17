//import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { myFirstDiff } from '../actions/shared';
import { gAPI } from './App';
import { storeConversation } from '../actions/conversationActions';

class ConversationEdit extends Component {
    #sFunc = 'ConversationEdit';
    state = {
        cursorPosition : 0,
    };

    componentDidMount() {
        const sFunc = this.#sFunc + '.componentDidMount()-->';
        const debug = false;

        const { params } = this.props.match;
        const { dispatch } = this.props;
        debug && console.log( sFunc + 'params', params );

        gAPI.getConversation( params.id )
            .then( ( conversation ) => {
                const sFunc = this.#sFunc + '.componentDidMount().gAPI.getConversation.then()-->';

                debug && console.log( sFunc + 'conversation', conversation );

                dispatch( storeConversation( params.id, conversation.content, conversation.lastMutation
                    , conversation.origin ) );
            } );
    }

    handleChange = ( e ) => {
        const sFunc = this.#sFunc + '.handleChange()-->';
        const debug = false;

        let newValue = e.target.value;
        debug && console.log( sFunc + 'newValue', newValue );

        const { selectionStart, selectionEnd } = e.target;
        const s = typeof( e.target.onClick );
        debug && console.log( sFunc + 'selectionStart', selectionStart, 'selectionEnd', selectionEnd, 's', s, 'newValue', newValue );
        // selectionEnd is ALWAYS the same as selectionStart  todo:  figure out why?

        this.setState( { cursorPosition : selectionStart } );

        const { conversation } = this.props;
        debug && console.log( sFunc + 'conversation', conversation );

        if ( newValue.length - 1 !== conversation.content.length ) {
            // means a char was deleted
            const index = myFirstDiff( conversation.content, newValue );

            const newLen = conversation.content.length - newValue.length;
            debug && console.log( sFunc + 'index', index, 'selectionStart', selectionStart, 'selectionEnd', selectionEnd, 'newLen', newLen );

            const delChars = conversation.content.substring( index, index + 1 );
            debug && console.log( sFunc + 'DEL( %d, 1 )', index, 'char to be deleted', delChars );

            gAPI.sendMutation( 'DEL', conversation.id, conversation.origin, index, newLen, '' )
                .then( res => res.json() )
                .then( ( result ) => {
                    const sFunc = this.#sFunc + '.handleChange().sendInsert().then.then()-->';

                    debug && console.log( sFunc + 'result', result );
                } );
        }
        else {
            const newChar = newValue.substring( selectionStart - 1, selectionStart );
            debug && console.log( sFunc + 'newChar', newChar );
            debug && console.log( sFunc + 'INS %d:\'%s\'', selectionStart, newChar );

            //gAPI.sendInsert( conversation.id,  conversation.origin, selectionStart - 1, 1, newChar, 1 )
            gAPI.sendMutation( 'INS', conversation.id, conversation.origin, selectionStart - 1, 1, newChar )
                .then( res => res.json() )
                .then( ( result ) => {
                    const sFunc = this.#sFunc + '.handleChange().sendInsert().then.then()-->';

                    debug && console.log( sFunc + 'result', result );
                } );
        }
    };

    componentDidUpdate( prevProps, prevState, snapshot ) {
        const sFunc = 'componentDidUpdate()-->';
        const debug = false;

        const e = document.getElementById( 'theTextAreaIWant' );

        debug && console.log( sFunc + 'this.state.cursorPosition', this.state.cursorPosition, 'e.selectionStart', e.selectionStart );

        debug && console.log( sFunc + 'e', e );

        e.setSelectionRange( this.state.cursorPosition, this.state.cursorPosition );
    }

    // test = (e) => {
    //     const sFunc = this.#sFunc + '.test()-->';
    //     const debug = false;
    //
    // }


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
                        <div>Editing Conversation: {conversation.id}</div>
                        <div>Origin: {conversation.origin}</div>
                        <div>Last Mutation: {conversation.lastMutation}</div>

                        <textarea name="test"
                                  rows="10" cols="70"
                                  id="theTextAreaIWant"
                                  value={conversation.content}
                                  onChange={this.handleChange}
                                  // onFocus={this.test}
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