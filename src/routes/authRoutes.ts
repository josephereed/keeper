import passport from 'passport';
import { Request, Response } from 'express';

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req: Request, res: Response) => {
      // Successful authentication, redirect home.
      res.redirect('http://localhost:3000');
    }
  );

  app.get('/getuser', (req: Request, res: Response) => {
    res.send(req.user);
  });
};
