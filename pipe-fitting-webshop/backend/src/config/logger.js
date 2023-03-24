const winston = require('winston');
const config = require('config');
const path = require('path');

const transportOptions = {
    console: {
        level: config.log_level_console,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    },
    file: {
        level: config.log_level_file,
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