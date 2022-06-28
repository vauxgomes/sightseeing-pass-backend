// Imports
const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const { NODE_ENV, PORT } = process.env;

// Routes
const routes = require('./routes')

// App
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json())
app.use(routes)

// Port
app.listen(PORT)

//
console.log(`Server is running on PORT ${PORT}`)