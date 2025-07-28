const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/myshop')
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err));
    
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

const { productR, userR, categoryR } = require('./routes');
app.use('/api/products', productR(upload));
app.use('/api/users', userR());
app.use('/api/categories', categoryR(upload));

app.listen(3000, () => console.log('Server running on port 3000'));
