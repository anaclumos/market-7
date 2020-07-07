import express from "express";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.use("/static", express.static('static'));

app.get("/", (req, res) => res.render("home"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));


app.listen(PORT, () => console.log(`✅ ${PORT}에서 듣는 중~~`));