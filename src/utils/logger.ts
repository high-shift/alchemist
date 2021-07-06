/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, format, transports } from 'winston';

const prodFormat = format.combine(
    format.timestamp(),
    format.json()
);

const devFormat = format.combine(
    format.timestamp(),
    format.json({ replacer: null, space: 2 }),
);

const logger = createLogger({
    transports: [
        new transports.Console({
            format: process.env.NODE_ENV === 'production' ? prodFormat : devFormat
        })
    ],
});

console.error = (...args: any) => logger.error(args);
console.warn = (...args: any) => logger.warn(args);
console.info = (...args: any) => logger.info(args);
console.log = (...args: any) => logger.info(args);
console.debug = (...args: any) => logger.debug(args);
