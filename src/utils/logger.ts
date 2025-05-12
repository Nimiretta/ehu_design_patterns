// eslint-disable-next-line import/no-extraneous-dependencies
import pino from 'pino';

const logToFile = pino.destination('./logs/app.log');

export const logger = pino(
  {
    level: 'info',
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: false,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
        {
          target: 'pino/file',
          options: {
            destination: './logs/app.log',
            mkdir: true,
          },
        },
      ],
    },
  },
  logToFile,
);
