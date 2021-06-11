exports.msgServerPort = process.env.PORT || 3001;
exports.msgServerPath = process.env.ORIGIN || `ws:127.0.0.1:${exports.msgServerPort}`;

exports.apiServerPort = process.env.PORT || 3002;
exports.apiServerPath = process.env.ORIGIN || `http://127.0.0.1:${exports.apiServerPort}`;

// exports.users = {
//     'alice': 1,
//     'bob': 2,
// }
