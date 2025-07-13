export type ConfigType = {
  google: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  };
  session: {
    secret: string;
  };
  frontendUrl: string;
};
