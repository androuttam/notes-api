
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const authRoutes = require('./routes/authRoutes');

console.log("AUTH ROUTES =", authRoutes);
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((e) => {
    console.log(e);
});

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server Running");
});
