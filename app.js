const express = require('express');
const app = express();
require('dotenv').config();
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/database')(app)
require('./routes')(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
