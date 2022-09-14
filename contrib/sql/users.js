import bcrypt from 'bcrypt';
import casual from 'casual';

let users = {};

users.data = [
  {
    email: 'admin@dom.com',
    password_digest: bcrypt.hashSync('helloworld', 10),
    role: 'admin',
  },
  {
    email: 'buyer@dom.com',
    password_digest: bcrypt.hashSync('helloworld', 10),
    role: 'seller',
  },
  {
    email: 'seller@dom.com',
    password_digest: bcrypt.hashSync('helloworld', 10),
    role: 'buyer',
  },
];

users.data.forEach((user) => {
  user.first_name = casual.first_name;
  user.last_name = casual.last_name;
});

users.populate = async (models, info) => {
  for (let i = 0; i < users.data.length; i++) {
    console.log(info(users.data[i].email, users.data[i].role));
    await models.user.create(users.data[i]);
  }
};

export default users;
