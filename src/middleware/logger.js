const logger = ( store ) => ( next ) => ( action ) => {
    const debug = true;

    const subStrings = [ 'USER', 'DOCUMENT' ];
    const returnValue = next( action );
    if ( ( debug ) && ( new RegExp( subStrings.join( '|' ) ).test( action.type ) ) ) {
        console.group( '(logger) action: ' + action.type );
        const currStoreState = store.getState();
        console.log( 'new state: ', currStoreState );
        // console.log( 'isArray(action.conversationNames)', Array.isArray( action.conversationNames )
        //     , 'isArray(currStoreState.conversationNames)', Array.isArray( currStoreState.conversationNames )
        //     , 'isArray(currStoreState.conversationNames.conversationNames)', Array.isArray( currStoreState.conversationNames.conversationNames ) );
        console.groupEnd();
    }
    return returnValue;
};

export default logger;