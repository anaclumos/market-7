import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { registerNewUser, getDatabaseSalt } from './backend/db';
import { passport, authenticateUser, ensureAuthenticated } from './backend/auth';
const connectNedbSession = require('connect-nedb-session')(session);

const app = express();
const PORT = 8080;

// set
app.set('view engine', 'pug');

// use
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret key', resave: true, saveUninitialized: false
  , store: new connectNedbSession({ filename: './backend/session.db'})
}));
app.use(passport.initialize());
app.use(passport.session());

// get
app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/done', (req, res) => res.render('done'));
app.get('/session', ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

// post
app.post('/register', (req, res) => { registerNewUser(req, res) });
app.post('/salt', (req, res) => { getDatabaseSalt(req, res) });
app.post('/login', async (req, res, next) => { authenticateUser(req, res, next) });

// listen
app.listen(process.env.PORT || PORT, () => console.log(`✅ http://localhost:${PORT} 에서 듣는 중~`));