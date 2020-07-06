import express from "express";
import path from "path";
import pug from "pug";

const app = express();

app.set("view engine", "pug");

app.get("/register", (req, res) => res.render("register"));
app.get("/", (req, res) => res.render("home"));


const PORT = 4000;

const handleListen = () => {
    console.log(`${PORT}에서 듣는 중~~`)
}

app.listen(PORT, handleListen);