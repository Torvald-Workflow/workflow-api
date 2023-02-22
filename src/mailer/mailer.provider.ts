import { MAILER_SOURCE } from '../global/constants';

export const mailerProvider = [
  {
    provide: MAILER_SOURCE,
    useFactory: async () => ({
      transport: {
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT,
        ignoreTls: process.env.MAILER_IGNORE_TLS === 'true',
        secure: process.env.MAILER_SECURE === 'true',
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASSWORD,
        },
      },
    }),
  },
];
