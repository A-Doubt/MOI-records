import winston, { transports } from 'winston';
import 'winston-mongodb';
import 'express-async-errors';

export default function () {
	const logger = winston.createLogger({
		format: winston.format.combine(winston.format.prettyPrint()),
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({
				filename: './logs/logfile.log',
				level: 'info',
			}),
			new winston.transports.MongoDB({
				db: 'mongodb://127.0.0.1:27017/moi',
				level: 'error',
			}),
		],
		exceptionHandlers: [
			new winston.transports.File({
				filename: './logs/exceptions.log',
				level: 'info',
			}),
			new winston.transports.Console(),
		],
		rejectionHandlers: [
			new winston.transports.File({
				filename: './logs/rejections.log',
				level: 'info',
			}),
		],
	});

	winston.add(logger);
}
