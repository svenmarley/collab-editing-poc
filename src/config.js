
let apiHost;
console.log( 'process.env', process.env );
console.log( 'typeof( process.env.MSG_PORT )', typeof( process.env.MSG_PORT ) );
if ( typeof( process.env.MSG_PORT ) === 'undefined' ) {
    apiHost = '127.0.0.1';
}
else {
    apiHost = 'https://dashboard.heroku.com/apps/floating-hamlet-81896';
}

exports.msgServerPort = parseInt( process.env.MSG_PORT ) || 3001;
exports.msgServerPath = process.env.ORIGIN || `ws://${apiHost}:${exports.msgServerPort}`;

exports.apiServerPort = process.env.API_PORT || 3002;
exports.apiServerPath = process.env.ORIGIN || `http://${apiHost}:${exports.apiServerPort}`;
