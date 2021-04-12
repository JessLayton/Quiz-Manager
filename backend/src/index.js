const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

app.use('/users', require('./routes/users'));
app.use('/quizzes', require('./routes/quizzes'));

module.exports = app;
