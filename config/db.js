const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL)

    .then((conn) => {
        console.log(`connected successfully: ${conn.connection.host} `)
    })

    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });

};

module.exports = connectToDB;