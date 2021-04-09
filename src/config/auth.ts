import { registerAs } from '@nestjs/config';

const IS_OFFLINE = process.env.IS_OFFLINE;

const redirectPath = '/auth/callback';

export default registerAs('auth', () => {
  return {
    redirectUri:
      IS_OFFLINE !== 'false'
        ? `http://localhost:3000${redirectPath}`
        : `http://${'something'}${redirectPath}`,
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  };
});
