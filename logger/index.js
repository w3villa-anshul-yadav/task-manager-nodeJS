const winston = require('winston');

const { format } = winston;
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp, at }) => {
    let on = at?.stack.split('\n')[1].slice(7).split('/').pop();
    
    let file = on?.split(':')[0];
    let line = on?.split(':')[1];
    let timeStamp = Date(timestamp).toString().split(' GMT')[0];

    return JSON.stringify({
        level: level,
        message: message,
        file: file,
        line,
        time: timeStamp,
    });
});

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(myFormat),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './logger/logs/combineLog.log',
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logger/logs/error.log',
        }),
    ],
});

module.exports = logger;
