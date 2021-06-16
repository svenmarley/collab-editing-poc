const config = require( '../config' );

let users = {
    alice : {
        id : 'alice',
        name : 'Alice Becker',
        avatarURL : 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
    },
    bob : {
        id : 'bob',
        name : 'Bob Barker',
        avatarURL : 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
    },
};

console.log( 'apiServerPath', config.apiServerPath );

let token = localStorage.token;

if ( !token )
    token = localStorage.token = Math.random().toString( 36 ).substr( -8 );

export class API {
    #sFunc = 'API';
    #config = {
        apiServerUrl : null,
        author : null,
        conversationId : null,
    };
    #headers = {
        'Accept' : 'application/json',
        'Authorization' : null,
    };

    setConfig( apiServerUrl = null, author = null ) {
        const sFunc = this.#sFunc + '.setConfig()-->';
        const debug = false;

        if ( apiServerUrl ) {
            this.#config.apiServerUrl = apiServerUrl;
        }

        if ( author ) {
            this.#config.author = author;
            this.#config.conversationId = API.generateUID();

            this.#headers.Authorization = author;

        }

        debug && console.log( sFunc + 'config', this.#config );
    }

    static generateUID() {
        return Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 );
    }

    _getUsers() {
        return new Promise( ( res ) => {
            setTimeout( () => res( { ...users } ), 1000 );
        } );
    }

    getInitialData() {
        const sFunc = 'API::getInitialData()-->';
        const debug = false;

        return Promise.all( [
                                this._getUsers(),
                                this.getConversations(),
                            ] )
                      .then( ( [ users, conversations ] ) => {
                          if ( debug ) {
                              console.log( sFunc + 'users', users );
                              console.log( sFunc + 'conversations', conversations );
                          }

                          return ( {
                              users,
                              conversations,
                          } );
                      } );
    }

    // getInfo() {
    //     const sFunc = 'API::getInfo()-->';
    //     const debug = true;
    //
    //     debug && console.log( sFunc + 'here' );
    //
    //     return new Promise( ( res ) => {
    //         const headers = this.#headers;
    //
    //         fetch( `${config.apiServerPath}/info`, { headers } )
    //             .then( res => res.json() )
    //             .then( ( data ) => {
    //                 debug && console.log( sFunc + 'got data', data );
    //                 res( data );
    //             } );
    //     } );
    // };

    getConversations() {
        const sFunc = 'API::getConversations()-->';
        const debug = false;

        return new Promise( ( res ) => {
            const headers = this.#headers;

            fetch( `${config.apiServerPath}/conversations`, { headers } )
                .then( res => res.json() )
                .then( ( conversationsInfo ) => {
                    debug && console.log( sFunc + 'ok', conversationsInfo.ok, 'got conversationsInfo', conversationsInfo );

                    res( conversationsInfo );
                } );
        } );

    }

    getConversation( conversationId ) {
        // const sFunc = this.#sFunc + '.getConversation()-->';
        // const debug = true;

        return new Promise( ( res ) => {
            //const sFunc = this.#sFunc + '.getConversation().promise().';
            //const debug = true;

            const headers = this.#headers;

            fetch( `${config.apiServerPath}/conversations/${conversationId}`, { headers } )
                .then( res => res.json() )
                .then( ( conversation ) => {
                    const sFunc = this.#sFunc + '.getConversation().promise().then.then()-->';
                    const debug = true;

                    debug && console.log( sFunc + 'returned', conversation );

                    res( conversation );
                } );

        } );

    }

    breakOrigin( inOrigin ) {
        const sFunc = this.#sFunc + '.breakOrigin()-->';
        const debug = false;

        let ret = inOrigin.substr( 1, inOrigin.length - 2 );
        debug && console.log( sFunc + 'inOrigin', inOrigin, 'ret', ret );
        let a = ret.split( ',' ).map( ( o ) => {
            return parseInt( o.trim() );
        } );
        debug && console.log( sFunc + 'inOrigin', inOrigin, 'a', a );

        return ( a );
    }

    buildOriginIndexStructure( inOrigin ) {
        const sFunc = this.#sFunc + 'buildOriginIndexStructure()-->';
        const debug = true;

        let aOrigin = this.breakOrigin( inOrigin );

        debug && console.log( sFunc + 'inOrigin', inOrigin, 'aOrigin', aOrigin );

        let b = {
            'alice' : 0,
            'bob' : 0,
        };
        b.alice = aOrigin[0];
        b.bob = aOrigin[1];

        debug && console.log( sFunc + 'author', this.#config.author, 'returning', b );

        return b;
    }

    sendMutation( type, conversationId, origin, index, length, text ) {

        return new Promise( () => {
            const sFunc = this.#sFunc + '.sendMutation()-->';
            const debug = true;

            debug && console.log( sFunc + 'inside   type', type, 'origin', origin, 'index', index, 'length', length, 'text', text );

            let body = {
                'author' : this.#config.author,
                'conversationId' : conversationId,
                'origin' : this.buildOriginIndexStructure( origin ),
            };

            if ( type === 'INS' ) {
                body.data = {
                    'index' : index,
                    'length' : length,
                    'text' : text,
                    'type' : 'insert',
                };
            }
            else {
                body.data = {
                    'type' : 'delete',
                    'index' : index,
                    'length' : length,
                    'text' : '',
                };
            }

            console.log( sFunc + 'body', body );
            const requestOptions = {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : this.#config.author,
                },
                body : JSON.stringify( body ),
            };
            console.log( sFunc + 'sending', requestOptions );

            fetch( this.#config.apiServerUrl + '/mutations', requestOptions )
                .then( res => res.json() )
                .then( ( result ) => {
                    const sFunc = this.#sFunc + '.then().then(result)-->';

                    debug && console.log( sFunc + 'result', result );
                } );

        } );
    }

    sendAddConversation() {

        return new Promise( ( respond ) => {
            let sFunc = this.#sFunc + '.sendAddConversation()-->';
            const debug = true;

            debug && console.log( sFunc + 'inside' );

            const requestOptions = {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : this.#config.author,
                },
            };

            // creating a new doc
            fetch( this.#config.apiServerUrl + '/conversations', requestOptions )
                .then( res => res.json() )
                .then( ( results ) => {
                    sFunc += '.POST /conversations-->';

                    console.log( sFunc + 'results', results );

                    const newDocID = results.ID;

                    respond( { ID : newDocID } );
                } );

        } );
    }

    sendDeleteConversation( conversationId ) {

        return new Promise( ( respond ) => {
            let sFunc = this.#sFunc + '.sendDeleteConversation()-->';
            const debug = true;

            debug && console.log( sFunc + 'conversationId', conversationId );

            const requestOptions = {
                method : 'DELETE',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : this.#config.author,
                },
            };

            // delete a doc
            const url = this.#config.apiServerUrl + '/conversations/' + conversationId;
            debug && console.log( sFunc + 'url', url );
            fetch( url, requestOptions )
                .then( ( results ) => {
                    sFunc += '.DELETE /conversations-->';

                    console.log( sFunc + 'results', results );

                    const newDocID = results.ID;

                    respond( { ID : newDocID } );
                } );
        } );
    }
}

export { users };

