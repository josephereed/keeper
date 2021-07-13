import 'reflect-metadata';
import path from 'path';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import express, { Request, response, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

require('dotenv').config();

createConnection()
  .then(async (connection) => {
    const userRepository = connection.getRepository(User);
    // console.log('Inserting a new user into the database...');
    // const user = new User();
    // user.firstName = 'Timber';
    // user.lastName = 'Saw';
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);

    const app = express();
    // Middleware
    app.use(express.json());
    express.urlencoded({ extended: true });
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    // app.use((req, res, next) => {
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   next();
    // });

    app.use(
      session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
      return done(null, user);
    });

    passport.deserializeUser((user, done) => {
      return done(null, user);
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
          // const user = await userRepository.findOne({ id: profile.id });
          console.log(profile);
          cb(null, profile);
        }
      )
    );

    // Routes

    app.get('/getuser', (req: Request, res: Response) => {
      return res.send(req.user);
    });
    app.get('/ping', (req: Request, res: Response) => {
      console.log('PONG');
      return res.status(200).send('PONG');
    });

    app.get(
      '/auth/google',
      passport.authenticate('google', { scope: ['profile'] })
    );

    app.get(
      '/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/login' }),
      function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000');
      }
    );

    app.get('/', (req, res) => {
      res.sendFile(
        // fix before before deploy
        path.join(
          __dirname,
          '../',
          '../',
          '../',
          'client',
          'build',
          'index.html'
        )
      );
    });

    // app.use(express.static(path.resolve(__dirname, '../../client/build')));
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });

    // app.get(
    //   '/auth/google',
    //   passport.authenticate('google', { scope: ['email', 'profile'] })
    // );
    // app.get('/success', (req: Request, res: Response) => {
    //   res.status(200).send({ data: 'Herro' });
    // });
    // app.get('/success', (req: Request, res: Response) => {
    //   res.status(200).send({ data: 'Herro' });
    // });

    // app.get(
    //   '/auth/google/callback',
    //   passport.authenticate('google', {
    //     successRedirect: '/auth/google/success',
    //     failureRedirect: '/auth/google/failure',
    //   })
    // );
  })
  .catch((error) => console.log(error));
