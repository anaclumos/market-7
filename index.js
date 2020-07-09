import express from "express";
import bodyParser from 'body-parser';
import { registerNewUser, getDatabaseSalt } from './backend/db';

const app = express();
const PORT = 4000;

// set
app.set("view engine", "pug");

// use
app.use("/static", express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get
app.get("/", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));

// post
app.post("/register", (req, res) => { registerNewUser(req, res) });
app.post("/salt", (req, res) => { getDatabaseSalt(req, res) });

// listen
app.listen(PORT, () => console.log(`✅ ${PORT}에서 듣는 중~~`));