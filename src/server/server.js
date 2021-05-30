const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const config = require( './config' );

const app = express();

app.use( express.static( 'public' ) );
app.use( cors() );
app.disable( 'etag' );        // disables caching

app.get( '/ping', ( req, res ) => {
    res.json( { 'ok' : true, 'msg' : 'pong' } );
} );

app.get( '/info', ( req, res ) => {

    res.json(
        {
            'ok' : true,
            'author' : {
                'email' : config.authorEmail,
                'name' : config.authorName,
            },
            'frontend' : {
                'url' : config.front,
            },
            'language' : 'node.js',
            'sources' : config.githubURL,
            'answers' : {
                '1' : config.q1,
                '2' : config.q2,
                '3' : config.q3,
            },
        },
    );

} );

app.use( ( req, res, next ) => {
    const token = req.get( 'Authorization' );

    if ( token ) {
        req.token = token;
        next();
    }
    else {
        res.status( 403 ).send( {
                                    error : 'Please provide an Authorization header to identify yourself (can be whatever you want)',
                                } );
    }
} );

app.get( '/contacts', ( req, res ) => {
    res.send( contacts.get( req.token ) );
} );

app.delete( '/contacts/:id', ( req, res ) => {
    res.send( contacts.remove( req.token, req.params.id ) );
} );

app.post( '/contacts', bodyParser.json(), ( req, res ) => {
    const { name, handle } = req.body;

    if ( name && handle ) {
        res.send( contacts.add( req.token, req.body ) );
    }
    else {
        res.status( 403 ).send( {
                                    error : 'Please provide both a name and a handle',
                                } );
    }
} );

app.listen( config.port, () => {
    console.log( 'Server listening on port %s, Ctrl+C to stop', config.port );
} );
