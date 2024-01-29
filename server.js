const express = require("express");
const bcrypt = require('bcrypt');
const Login = require('./routes/login');
const model = require('./Database/mongo')
const Register = require('./routes/register');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/login', Login);
app.use('/register', Register);




app.listen(port, () => {
    console.log("server listening on port 3000..")
})

