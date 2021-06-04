import React, { Component } from 'react';
//import { gAPI } from './App';
import { connect } from 'react-redux';
import '../assets/App.css';
import Nav from './Nav';

class DocsList extends Component {
    #sFunc = 'DocsList';
    state = {
        docs : [],
    };

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

        this.props.history.push( `/docs/` + target.textContent );

    };

    render() {
        const sFunc = this.#sFunc + '.render()-->';
        const debug = true;

        const { authedUser, docNames } = this.props;
        debug && console.log( sFunc + 'docNames', docNames );
        debug && console.log( sFunc + 'authedUser', authedUser );
        console.log( sFunc + 'isArray(docNames)', Array.isArray( docNames ), 'len', ( Array.isArray( docNames ) ? docNames.length : 0 ) );

        return (
            <div>
                {authedUser === null || !Array.isArray( docNames )
                    ?
                    null
                    :
                    <span>
                        <Nav/>
                        <div className="DocsList-block">
                            <h3>Click on one</h3>
                            <ul className="DocsList-ul">
                                {docNames.map( ( dn ) => {
                                    return (
                                        <li className="DocsList-item"
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
                              docNames,
                          }
    ,
) {
    const sFunc = 'DocsList.js.mapStateToProps()-->';
    const debug = false;

    const ret = {
        authedUser,
        docNames,
    };

    debug && console.log( sFunc + 'here', 'returning', ret );

    return ret;
}

export default connect( mapStateToProps )( DocsList );