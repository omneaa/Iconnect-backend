const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;


// app.use(bodyParser.json({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
require('./config/database')(app)
require('./routes')(app);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
