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
    sFunc = 'API';
    config = {
        apiServerUrl : null,
        author : null,
        conversationId : null,
    };
    headers = {
        'Accept' : 'application/json',
        'Authorization' : null,
    };

    setConfig( apiServerUrl = null, author = null ) {
        const sFunc = this.sFunc + '.setConfig()-->';
        const debug = false;

        if ( apiServerUrl ) {
            this.config.apiServerUrl = apiServerUrl;
        }

        if ( author ) {
            this.config.author = author;
            this.config.conversationId = API.generateUID();

            this.headers.Authorization = author;

        }

        debug && console.log( sFunc + 'config', this.config );
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
                                this.getInfo(),
                                this.getConversations(),
                            ] )
                      .then( ( [ users, data, docsInfo  ] ) => {
                          if ( debug ) {
                              console.log( sFunc + 'users', users );
                              console.log( sFunc + 'data', data );
                              console.log( sFunc + 'docsInfo', docsInfo );
                          }

                          return ( {
                              users,
                              data,
                              docsInfo,
                          } );
                      } );
    }

    getInfo = () => {
        const sFunc = 'API::getInfo()-->';
        const debug = false;
        return new Promise( ( res ) => {
            const headers = this.headers;

            fetch( `${config.apiServerPath}/info`, { headers } )
                .then( res => res.json() )
                .then( ( data ) => {
                    debug && console.log( sFunc + 'got data', data );
                    res( data );
                } );
        } );
    };

    getConversations() {
        const sFunc = 'API::getConversations()-->';
        const debug = false;

        return new Promise( (res) => {
            const headers = this.headers;

            fetch( `${config.apiServerPath}/conversations`, { headers } )
                .then( res => res.json() )
                .then( ( docsInfo ) => {
                    debug && console.log( sFunc + 'ok', docsInfo.ok, 'got docsInfo', docsInfo );

                    res( docsInfo );
                } );
        } );

    }

    sendInsert( index, length, text, originIndex ) {

        return new Promise( ( res ) => {
            const sFunc = this.sFunc + '.sendInsert()-->';
            const debug = false;

            debug && console.log( sFunc + 'inside   res', res );

            const body = {
                'conversationId' : this.config.conversationId,
                'author' : this.config.author,
                'data' : {
                    'index' : index,
                    'length' : length,
                    'text' : text,
                    'type' : 'insert',
                },
                'origin' : {
                    [this.config.author] : originIndex,
                },
            };

            const requestOptions = {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : this.config.author,
                },
                body : JSON.stringify( body ),

            };

            debug && console.log( sFunc + 'sending', requestOptions );

            fetch( this.config.apiServerUrl + '/mutations', requestOptions )
                .then( res => res.json() )
                .then( ( result ) => {
                    const sFunc = this.sFunc + '.then().then(result)-->';

                    debug && console.log( sFunc + 'result', result );
                } );

        } );
    }

}

export { users };

