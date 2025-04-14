const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const todoRoutes = require('./routes.js/todos')

dotenv.config()

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())

 mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
  app.use("/api/todos", todoRoutes);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));