const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../src/models/userModel');

exports.mochaHooks = {
  beforeAll(done) {
    setTimeout(async () => {
      const testUser = {
        username: 'testUser',
        email: 'testuser@email.com',
        password: 'TestPassword123!',
      };
      const existingUser = await User.findOne({ email: testUser.email });
      if (!existingUser) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(testUser.password, salt);
        const newTestUser = new User({
          email: testUser.email,
          password: passwordHash,
          username: testUser.username,
          role: 'editor',
        });
        await newTestUser.save();
        done();
      } else {
        done();
      }
    }, 1500);
  },
};
