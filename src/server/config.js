exports.port = process.env.PORT || 5001
exports.uiPort = process.env.UI_PORT || 3000
exports.origin = process.env.ORIGIN || `http://localhost:${exports.port}`
exports.front = process.env.UI_PATH || `http://localhost:${exports.uiPort}`
exports.githubURL = 'https://github.com/svenmarley/collab-editing-poc'
exports.authorName = 'Mike Anderson'
exports.authorEmail = 'mike.anderson@checkone.com'

exports.q1 = '1'
exports.q2 = '2'
exports.q3 = '3'