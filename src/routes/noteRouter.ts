import { Request, Response } from 'express';

module.exports = (app) => {
  // Create note
  app.post('/notes', (req: Request, res: Response) => {
    if (req) {
      console.log(req.user);
      res.status(200).send(req.user);
    }
    res.status(401).send({ error: 'noting' });
  });
};
