import express from "express";
import dotenv from "dotenv";
import Product from './routes.js';

const app = express();

dotenv.config();

app.use("/customer",Product);
app.listen(3000, (req, res) => {
    console.log("Listening on port 3000!!");
});
