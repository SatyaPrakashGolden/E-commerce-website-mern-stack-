require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");

const productController = require("./controllers/productController");
const uploadController = require("./controllers/uploadController");
const authController = require("./controllers/authController");
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
connectDB(); 


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authController);
app.use("/product", productController);
app.use('/upload', uploadController)

// to serve images inside public folder
app.use('/images', express.static('public/images'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});