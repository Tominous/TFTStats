const winston = require('winston');
const path = require('path');

winston.level = process.env.TFT_APP_LOG_LEVEL == undefined ? 'silly' : process.env.TFT_APP_LOG_LEVEL;
winston.add(new winston.transports.Console());

const logger = moduleName => {

    var basename = path.relative(process.mainModule.filename.replace(`app${path.sep}index.js`, ""), moduleName);
    var padding = "";
    while (basename.length + padding.length < 30) {
        padding += " ";
    }

    return winston.createLogger({
        level: winston.level,
        format: winston.format.combine(
            winston.format.label({ label: basename }),
            winston.format.colorize(),
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} [${info.label}]${padding} - ${info.level} \t:: ${info.message}`)
        ),
        transports: [
            new winston.transports.Console()
        ]
    });
}

module.exports = logger