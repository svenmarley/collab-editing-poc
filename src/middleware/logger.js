
const logger = ( store ) => ( next ) => ( action ) => {
    const debug = true;

    const subStrings = [ 'USER', ];
    const returnValue = next( action );
    if ( ( debug ) && ( new RegExp( subStrings.join( '|' ) ).test( action.type ) ) ) {
        console.group( '(logger) action: ' + action.type );
        console.log( 'new state: ', store.getState() );
        console.groupEnd();
    }
    return returnValue;
};

export default logger;