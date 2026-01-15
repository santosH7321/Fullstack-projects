import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();

import auth from './routes/auth.js';
import user from './routes/users.js';
import product from './routes/products.js';
import order from './routes/orders.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', auth);
app.use('/api/products', product);
app.use('/api/orders', order);
app.use('/api/users', user);

import errorHandler from './middleware/error';
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
