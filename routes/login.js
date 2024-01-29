const express = require('express');
const bcrypt = require('bcrypt')
const model = require("../Database/mongo");
const router = express.Router();

router.post('/', async (req, res) => {
    const useremail = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const Userfind = await model.findOne({ email: useremail });
    //console.log(Userfind.password);
    if (!Userfind) {
        return res.status(401).json({
            message: "user does not exist please check email"
        })
    }
    else {
        //res.send("hello welcome to ur account");

        const passWcompare = await bcrypt.compare(password, Userfind.password);
        if (passWcompare) {
            res.json({
            message: 'passwords match user can now login'
        })

        }
        else {
            res.json(
                {message: `${username} your passwords dont match, please try again`
            });
        }
    }
})

module.exports = router;