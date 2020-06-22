const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoRoute = require('./routes/todos');

const PORT = 4000;
const url = 'mongodb+srv://A1:123@cluster0-3kbbb.mongodb.net/MERN?retryWrites=true&w=majority';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

app.use(cors());
app.use(bodyParser.json());
app.use('/todos', TodoRoute);

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});