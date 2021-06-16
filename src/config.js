console.log( 'url', window.location.href );
global.serverUrl = window.location.href;

if ( global.serverUrl.includes( 'localhost' ) ) {
    const apiHost = '127.0.0.1';

    exports.webPort = 80;
    exports.apiServerPort = 3002;
    exports.msgServerPort = 3001;

    exports.webURL = `http://${apiHost}:${exports.webPort}`;
    exports.msgServerPath = `ws://${apiHost}:${exports.msgServerPort}`;
    exports.apiServerPath = `http://${apiHost}:${exports.apiServerPort}`;
    exports.apiServerPathRaw = `http://${apiHost}`;
}
else {
    // apiHost = 'floating-hamlet-81896.herokuapp.com';   // heroku

    const apiHost = '52.14.91.154';       // amazon
    exports.webURL = 'https://hidden-hollows-45703.herokuapp.com';

    exports.apiServerPort = 3002;
    exports.msgServerPort = 3001;


    exports.msgServerPath = `ws:${apiHost}:${exports.msgServerPort}`;
    exports.apiServerPath = `http://${apiHost}:${exports.apiServerPort}`;
    exports.apiServerPathRaw = `http://${apiHost}`;
}




