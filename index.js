import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("안녕!");
});

const PORT = 4000;

const handleListen = () => {
    console.log(`${PORT}에서 듣는 중~~`)
}

app.listen(PORT, handleListen);