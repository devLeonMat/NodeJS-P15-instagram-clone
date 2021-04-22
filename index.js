const mongoose = require("mongoose");
require("dotenv").config({path: ".env"});

mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) {
        console.log(err, 'Connect error')
    } else {
        console.log('Successful')
    }
});