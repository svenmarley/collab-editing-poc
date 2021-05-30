const config = require( '../server/config' );

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

const api = config.origin;

let token = localStorage.token;

if ( !token )
    token = localStorage.token = Math.random().toString( 36 ).substr( -8 );

const headers = {
    'Accept' : 'application/json',
    'Authorization' : token,
};

class API {
    sFunc = 'API';

    static generateUID() {
        return Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 );
    }

    static _getUsers() {
        return new Promise( ( res ) => {
            setTimeout( () => res( { ...users } ), 1000 );
        } );
    }

    static getInitialData() {
        return Promise.all( [
                                this._getUsers(),
                                this.getInfo(),
                            ] )
                      .then( ( [ users, data ] ) => ( {
                          users,
                          data,
                      } ) );
    }

    static getInfo = () =>
        fetch( `${api}/info`, { headers } )
            .then( res => res.json() )
            .then( data => data );

}

export { users, API };

