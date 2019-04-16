const stream = require('stream');

function requestLogger (streamObj) {
    let options = streamObj || 'console';
    if (options !== 'console' && !(options instanceof stream.Writable)) {
        throw new Error('You should pass stream object or "console" string as an argument');
    }
    return (req, res, next) => {
        let log = `> ${new Date()} Protocol: ${req.protocol} Host: ${req.headers.host} URL: ${req.url} Method: ${req.method}\nHeaders: ${JSON.stringify(req.headers)}\n`;
        if (typeof options === 'object') {
            options.write(log);
        } else {
            console.log(log);
        }
        next();
    }
}

module.exports = requestLogger;