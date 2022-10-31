var config = require('../config/config.json');

const WebSocketServer = require('ws').Server
const ws = new WebSocketServer({
    verifyClient: (info, cb) => {
        const token = info.req.headers.token
        if (!token)
            cb(false, 401, 'Unauthorized')
        else {
            jwt.verify(token, 'secret-key', (err, decoded) => {
                if (err) {
                    cb(false, 401, 'Unauthorized')
                } else {
                    info.req.user = decoded
                    cb(true)
                }
            })
        }
    }
})