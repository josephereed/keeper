import express from 'express';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cors from 'cors';
const path = require('path');

require('./services/passport');

// DB Connection

const app = express();

// Middlewares
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['key1'],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
require('./routes/authRoutes')(app);
require('./routes/noteRouter')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
