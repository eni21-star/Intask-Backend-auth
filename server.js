const express = require("express");
const model = require("./mongo");
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(express.json());



app.post('/login', async (req, res) => {
    const useremail = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const Userfind = await model.findOne({ email: useremail });
    //console.log(Userfind.password);
    if (!Userfind) {
        return res.status(401).send("Invalid Email please check if email exist.")
    }
    else {
        //res.send("hello welcome to ur account");

        const passWcompare = await bcrypt.compare(password, Userfind.password);
        if (passWcompare) {
            res.send('passwords match user can now login')

        }
        else {
            res.send(`${username} your passwords dont match, please try again`);
        }
    }
})

app.post('/register', async (req, res) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password

    }

    console.log(data);
    const userexist = await model.findOne({ email: data.email });
    //const userexist1 = await model.findOne({ username: data.username });

    if (userexist) {
        console.log('user already exist');

    }
    else {
        pushDB();
    }





    async function pushDB() {


        const hashedPass = await bcrypt.hash(data.password, 10);
        res.send(hashedPass);
        data.password = hashedPass;

        const userdata = await model.create(data)
            .then(() => {
                console.log('data inserted to database successfully..');
            })
            .catch(() => {
                console.log('error while inserting data to database..');
            })
    }
})


app.listen(port, () => {
    console.log("server listening on port 3000..")
})

