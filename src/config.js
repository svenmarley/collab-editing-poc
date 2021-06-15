
console.log( 'url', window.location.href );
global.serverUrl = window.location.href;

let apiHost;
if ( global.serverUrl.includes( 'localhost' ) ) {
    apiHost = '127.0.0.1';
    exports.msgServerPort = 3001;
    exports.msgServerPath = `ws://${apiHost}:${exports.msgServerPort}`;

    exports.apiServerPort = 3002;
    exports.apiServerPath = `http://${apiHost}:${exports.apiServerPort}`;
}
else {
    apiHost = 'floating-hamlet-81896.herokuapp.com';

    exports.msgServerPort = ;
    exports.msgServerPath = process.env.ORIGIN || `ws://${apiHost}:${exports.msgServerPort}`;

    exports.apiServerPort = process.env.API_PORT || 3002;
    exports.apiServerPath = process.env.ORIGIN || `http://${apiHost}:${exports.apiServerPort}`;

}

