const logger = ( store ) => ( next ) => ( action ) => {
    const debug = true;

    const subStrings = [ 'USER', 'DOCUMENT' ];
    const returnValue = next( action );
    if ( ( debug ) && ( new RegExp( subStrings.join( '|' ) ).test( action.type ) ) ) {
        console.group( '(logger) action: ' + action.type );
        const currStoreState = store.getState();
        console.log( 'new state: ', currStoreState );
        // console.log( 'isArray(action.docNames)', Array.isArray( action.docNames )
        //     , 'isArray(currStoreState.docNames)', Array.isArray( currStoreState.docNames )
        //     , 'isArray(currStoreState.docNames.docNames)', Array.isArray( currStoreState.docNames.docNames ) );
        console.groupEnd();
    }
    return returnValue;
};

export default logger;