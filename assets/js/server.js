/*

const express = require("express");
const redis = require("redis");

const redisHost = "127.0.0.1";
const redisPort = 6379
const client = redis.createClient(redisPort);

let app = express();

app.get('/', (req, res) => {
    res.send("Server is ready...");
}).listen(3000);

client.on("error", (err) => {
    console.error("Error encountered: ", err);
});

client.on("connect", (err) => {
    console.log("Redis connection established.");
});

*/