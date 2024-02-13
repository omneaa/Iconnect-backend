const mongoose = require('mongoose');

module.exports = (app) => {
    mongoose.connect(process.env.MongoURI).then(() => console.log('connected to db')).catch((err) => console.log(err));
};
