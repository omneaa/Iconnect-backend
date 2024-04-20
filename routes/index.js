const router = require('express').Router();
const passport = require('passport');

require('../config/passport');
const axios = require('axios');
// Import and use the routes
const authRoutes = require('./auth')(router, passport);
const userRoutes=require('./user')(router, passport);
const postRoutes=require('./post')(router,passport);
const friendsRoutes=require('./friends')(router,passport);


module.exports = (app) => {
    app.use('/', authRoutes);
    
};

module.exports = (app) => {
    app.use('/', userRoutes);
    
};
module.exports= (app) => {
    app.use('/',postRoutes);
};
module.exports= (app) => {
    app.use('/',postRoutes);
};
module.exports= (app) => {
    app.use('/',friendsRoutes);
};




