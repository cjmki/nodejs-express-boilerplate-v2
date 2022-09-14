import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../../config/config';
import common from '../../util/constants/common';

export default (sequalize, DataTypes) => {
  const model = sequalize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      first_name: { type: DataTypes.STRING, allowNull: true },
      last_name: { type: DataTypes.STRING, allowNull: true },
      password_digest: { type: DataTypes.STRING, allowNull: false },
      role: DataTypes.ENUM(...common.USER_ROLES),
      auth_token_ctxs: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      hooks: {
        afterCreate: (record) => {
          delete record.dataValues.password_digest;
        },
        afterUpdate: (record) => {
          delete record.dataValues.password_digest;
        },
      },
    }
  );

  // Verify the user's password.
  model.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password_digest);
  };

  // Generates a jwt for the user
  // NOTE: for now calling save is delegated to the caller. So dont foget to
  // call save!!
  model.prototype.generateAuthToken = function () {
    // We create a random string and store it in both the database and the JWT.
    // This way we can invalidate (sort of) JWTs on demand. You could argue
    // this defeats the purpose and runs contrary to the core stateless concept
    // of JWTs. But I think invalidation is important, this is the solution
    // that came to my mind.

    const ctxToken = crypto.randomBytes(64).toString('hex');
    const payload = { email: this.email, role: this.role, ctx: ctxToken };

    this.addCtxToken(ctxToken);
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: '2 days',
    });
  };

  // Add auth token ctxs. Really bad name
  // This is just a random string that we store in the database. And at most we
  // store 10 ctx tokens per user.
  //
  // NOTE: We are NOT storing the JWT. this is a small piece of info that will
  // be included in the JWT.
  model.prototype.addCtxToken = function (ctx) {
    const ctxs = this.auth_token_ctxs;
    ctxs.push(ctx);

    this.auth_token_ctxs = ctxs.slice(-10);
    this.changed('auth_token_ctxs', true);

    return this;
  };

  model.prototype.verifyCtxToken = function (ctx) {
    return this.auth_token_ctxs.includes(ctx);
  };

  model.prototype.getAssetBase = function () {
    return config.storage.users;
  };

  return model;
};
