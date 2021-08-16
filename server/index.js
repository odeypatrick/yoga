const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// models
const User = require('./models/user')

//connection strings
mongoose.connect("mongodb+srv://yoga:yoga12345@cluster0.ahg5v.mongodb.net/yoga?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected Successfully'))
.catch(err => console.log("connection compromised", err))

//express initailazation
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// this code will return every user on the database ----- go to your browser and enter localhost:5000
// the .then .catch and stuff you see is called promise. so its was introduced in 2015 it is a better way of getter results instead of using callbacks
app.get('/', (req, res) => {
    User.find({})
    .then(users => {
        res.status(200).json({ users })
    })
    .catch(err => {
        console.log(err)
    })
})

// This code handles the post request sent from the signup form
// this is where we send the auth request fromn our axios to localhost:5000/auth/signup
// User.create method is used in creating a new instance in your database. its gets the value used in your model. check  the models file in model/use.js
app.post('/auth/signup', (req, res) => {
    const { firstname, lastname, phone, email } = req.body
    User.create({
        firstname,
        lastname,
        phone,
        email
    })
    .then(user => {
        console.log("Account has been created successfully: ", user)
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})