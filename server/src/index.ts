import 'reflect-metadata';
require('dotenv').config();
import path from 'path';
import cors from 'cors';
import { Connection, createConnection } from 'typeorm';
import { User } from './entity/User';
import { Note } from './entity/Note';
import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

createConnection({
  // below inserting 
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: 5432,
  entities: [User, Note],
})
  .then(async (connection: Connection) => {
    const userRepository = connection.getRepository(User);
    const noteRepository = connection.getRepository(Note);
    // console.log('Inserting a new user into the database...');
    // const user = new User();
    // user.firstName = 'Timber';
    // user.lastName = 'Saw';
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database');
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

    passport.serializeUser((user: User, done) => {
      return done(null, user);
    });

    passport.deserializeUser((user: User, done) => {
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
          try {
            let user = await userRepository.findOne({ googleId: profile.id });
            if (!user) {
              user = new User();
              user.googleId = profile.id;
              user.photo = profile.photos[0].value;
              await connection.manager.save(user);
              console.log('Saved a new user with id: ' + user.googleId);
              cb(null, user);
            }
            //console.log(profile);
            cb(null, user);
          } catch (error) {
            console.log(error);
          }
        }
      )
    );

    // Routes

    // Create note
    app.post('/notes/', (req: Request, res: Response) => {
      console.log(req.user);
    });

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
