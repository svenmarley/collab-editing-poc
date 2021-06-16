import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/App.css';
import { gAPI } from './App';
import { receiveConversationNamesObj } from '../actions/conversationIdsActions';

class ConversationsList extends Component {
    #sFunc = 'ConversationsList';

    componentDidMount() {
        const sFunc = this.#sFunc + '.componentDidMount()-->';
        const debug = true;

        debug && console.log( sFunc + 'props', this.props );

        if ( this.props.authedUser === null ) {
            this.props.history.push( `/login` );
        }

    }

    handleClick = ( e ) => {
        const sFunc = this.#sFunc + '.handleClick()-->';
        const debug = true;

        const { target } = e;

        debug && console.log( sFunc + 'target.id', target.id );

        this.props.history.push( `/conversations/` + target.id );

    };

    handleDelete = ( e ) => {
        const sFunc = 'handleDelete )-->';
        const debug = true;

        const { dispatch } = this.props;
        const { target } = e;
        debug && console.log( sFunc + 'target', target );

        const { id } = target;
        debug && console.log( sFunc + 'id', id );

        gAPI.sendDeleteConversation( id )
            .then( ( result ) => {
                if ( result ) {

                    console.log( sFunc + 'result', result );

                    gAPI.getConversations()
                        .then( ( conversations ) => {

                            debug && console.log( sFunc + 'conversations', conversations );

                            let conversationNames = conversations.conversations.map( ( di ) => {
                                return di.id;
                            } );
                            debug && console.log( sFunc + 'conversationIds', conversationNames );
                            dispatch( receiveConversationNamesObj( conversationNames ) );
                        } );
                }
            } );

    };

    handleAdd = () => {
        const sFunc = 'handleAdd )-->';
        const debug = true;

        debug && console.log( sFunc + 'Adding a conversation' );
        const { dispatch } = this.props;

        gAPI.sendAddConversation()
            .then( ( result ) => {

                if ( result ) {

                    console.log( sFunc + 'result', result );

                    gAPI.getConversations()
                        .then( ( conversations ) => {

                            debug && console.log( sFunc + 'conversations', conversations );

                            let conversationNames = conversations.conversations.map( ( di ) => {
                                return di.id;
                            } );
                            debug && console.log( sFunc + 'conversationIds', conversationNames );
                            dispatch( receiveConversationNamesObj( conversationNames ) );
                        } );
                }
            } );
    };

    render() {
        const sFunc = this.#sFunc + '.render()-->';
        const debug = true;

        const { authedUser, conversationIds } = this.props;
        if ( debug ) {
            console.log( sFunc + 'conversationNames', conversationIds );
            console.log( sFunc + 'authedUser', authedUser );
            console.log( sFunc + 'isArray(conversationNames)', Array.isArray( conversationIds ), 'len',
                         ( Array.isArray( conversationIds ) ? conversationIds.length : 0 ) );
        }

        return (
            <div>
                {authedUser === null || !Array.isArray( conversationIds )
                    ?
                    null
                    :
                    <span>
                        <div>
                            <h3>Click on one</h3>
                            <div className="ConversationsList-block">
                                {conversationIds.map( ( dn ) => {
                                    return (
                                        <div className="ConversationsList-item"
                                             key={dn}
                                        >
                                            {dn}
                                            <span id={dn} onClick={this.handleClick}>&nbsp;&nbsp;(load)</span>
                                            <span id={dn} onClick={this.handleDelete}>&nbsp;&nbsp;(delete)</span>
                                        </div>
                                    );
                                } )}
                            </div>
                            <div className="addConversation"
                                 onClick={this.handleAdd}>
                                <h5>Click here to add a Conversation</h5>
                            </div>
                        </div>
                    </span>
                }
            </div>
        );
    }

}

function mapStateToProps( {
                              authedUser,
                              conversationIds,
                          }
    ,
) {
    const sFunc = 'ConversationsList.js.mapStateToProps()-->';
    const debug = false;

    const ret = {
        authedUser,
        conversationIds,
    };

    debug && console.log( sFunc + 'here', 'returning', ret );

    return ret;
}

export default connect( mapStateToProps )( ConversationsList );