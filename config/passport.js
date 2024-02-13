const User = require('../models/User');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader('x-access-token');
opts.secretOrKey = process.env.JWT_SECRET;

const strategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) {
      return done(new Error('UserNotFound'), null);
    } else if (payload.expire <= Date.now()) {
      return done(new Error('TokenExpired'), null);
    } else {
      return done(null, user);
    }
  } catch (err) {
    return done(err, null);
  }
});

passport.use(strategy);
