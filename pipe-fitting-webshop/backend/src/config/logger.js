const winston = require('winston');
const path = require('path');

const transportOptions = {
    console: {
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    },
    file: {
        level: 'info',
        filename: path.join(__dirname, '..', '..', 'logs', 'server.log'),
        format: winston.format.label()
    }
}

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(transportOptions.console),
        new winston.transports.File(transportOptions.file)
    ],
    exitOnError: false
})

module.exports = logger;