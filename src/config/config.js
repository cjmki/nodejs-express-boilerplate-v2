import path from 'path';
import fse from 'fs-extra';

const config = {
  env: {
    isDev: process.env.NODE_ENV === 'development',
    isTest: process.env.NODE_ENV === 'test',
    isProd: process.env.NODE_ENV === 'production',
  },
  port: process.env.PORT,
  storage: {
    base: process.env.STORAGE || path.join(__dirname, '../..', '.storage'),
  },
  db: {
    url: process.env.SQL_DB_HOST,
    user: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASSWORD,
    database: process.env.SQL_DB_NAME,
    host: process.env.SQL_DB_HOST,
    dialect: 'postgres',
  },
};

config.env.isProd
  ? (config.JWT_SECRET = process.env.JWT_SECRET)
  : (config.JWT_SECRET =
      "3S~VU|F][>M:*)o.>87/yk,X^Ml>)MebUwIv4a,!,j'x3Nl&2KMwZ@O&~m<-l");

Object.keys(config.storage).forEach((item) =>
  fse.ensureDirSync(config.storage[item])
);

export default config;
