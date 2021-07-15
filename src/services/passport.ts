import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../entity/User';
import connection from '../dbConnection';

connection.then((connection) => {
  const userRepository = connection.getRepository(User);

  passport.serializeUser((user: User, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user: User, done) => {
    const foundUser = await userRepository.findOne(user.id);
    done(null, foundUser);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // change before production
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, cb) => {
        // insert into database
        try {
          let user = await userRepository.findOne({ googleId: profile.id });
          if (!user) {
            user = new User();
            user.googleId = profile.id;
            user.photo = profile.photos[0].value;
            const savedUser = await connection.manager.save(user);
            console.log('Saved a new user with id: ' + user.googleId);
            cb(null, savedUser);
          }
          //console.log(profile);
          console.log('found user in DB', user);
          cb(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
});
