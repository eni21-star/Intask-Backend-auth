const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/TESTING");

connect.then(()=>{
    console.log("connected to database successfully..");
})
.catch(()=>{
    console.log("error while connecting to the database..");
})

const schema = new mongoose.Schema({

  username: {
    type: String,
    unique: true,
    required: true

  },
  email:{
    type: String,
    unique: true,
    required: true

  },

  password :{
    type: String,
    required: true
}
})

const model = new mongoose.model("INTASK", schema);
module.exports = model;