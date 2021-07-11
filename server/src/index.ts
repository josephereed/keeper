import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import express, { Request, Response } from 'express';
import passport from 'passport';

createConnection()
  .then(async (connection) => {
    //console.log('Inserting a new user into the database...');
    // const user = new User();
    // user.firstName = 'Timber';
    // user.lastName = 'Saw';
    // user.age = 25;
    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);

    express.urlencoded({ extended: true });
    const app = express();
    app.get('/ping', (req: Request, res: Response) => {
      console.log('PONG');
      return res.status(200).send('PONG');
    });
    //app.use(express.static(path.resolve(__dirname, '../client/build')));
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
