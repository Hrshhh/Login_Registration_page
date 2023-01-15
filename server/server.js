// const express = require('express');
import express, { json } from 'express';
import fs from 'fs';
require('dotenv').config();
const morgan = require('morgan');
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.connect(process.env.DATABASE)
.then(() => {console.log("Connection established")})
.catch((e) => {console.log(`Error Occured ${e}`)})

const app = express();
// app.use('/api', router)
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// Autoloading routes
fs.readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`))
});

const port = process.env.PORT;
app.listen(port, () => console.log('Server is runnning on port 8000'));