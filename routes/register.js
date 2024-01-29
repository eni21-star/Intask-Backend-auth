const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const model = require("../Database/mongo");
router.post('/', async (req, res) => {
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
        res.json({
            message: "user already exist"
        })

    }
    else {
        pushDB();
    }





    async function pushDB() {


        const hashedPass = await bcrypt.hash(data.password, 10);
        data.password = hashedPass;

        const userdata = await model.create(data)
            .then(() => {
                console.log('data inserted to database successfully..');        
                res.json({
                    message: "account created succesfully.."
                })
        

            })
            .catch(() => {
                console.log('error while inserting data to database..');
            })
    }
})

module.exports = router;