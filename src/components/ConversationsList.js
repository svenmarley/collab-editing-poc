import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/App.css';

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

        debug && console.log( sFunc + 'target.value', target.textContent );

        this.props.history.push( `/conversations/` + target.textContent );

    };

    render() {
        const sFunc = this.#sFunc + '.render()-->';
        const debug = true;

        const { authedUser, conversationIds } = this.props;
        if ( debug ) {
            console.log( sFunc + 'conversationNames', conversationIds );
            console.log( sFunc + 'authedUser', authedUser );
            console.log( sFunc + 'isArray(conversationNames)', Array.isArray( conversationIds ), 'len', ( Array.isArray( conversationIds ) ? conversationIds.length : 0 ) );
        }

        return (
            <div>
                {authedUser === null || !Array.isArray( conversationIds )
                    ?
                    null
                    :
                    <span>
                        <div className="ConversationList-block">
                            <h3>Click on one</h3>
                            <ul className="ConversationsList-ul">
                                {conversationIds.map( ( dn ) => {
                                    return (
                                        <li className="ConversationsList-item"
                                            key={dn}
                                            onClick={this.handleClick}
                                        >
                                            {dn}
                                        </li>
                                    );
                                } )}
                            </ul>
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