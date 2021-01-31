import express from 'express';
import dotenv from 'dotenv';
import connect from './database';

import authController from './controllers/authController';

dotenv.config();
connect();

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authController);

export default app;
