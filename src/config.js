const fs = require( 'fs' );

let mainHost;

console.log( 'process.env', process.env );

if ( typeof ( process.env.JAWSDB_MARIA_URL ) === 'undefined' ) {
    mainHost = '127.0.0.1';
}
else {
    mainHost = 'u3r5w4ayhxzdrw87.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
}

exports.msgServerPort = process.env.PORT || 3001;
exports.msgServerPath = process.env.ORIGIN || `ws://${mainHost}:${exports.msgServerPort}`;

exports.apiServerPort = process.env.PORT || 3002;
exports.apiServerPath = process.env.ORIGIN || `http://${mainHost}:${exports.apiServerPort}`;
