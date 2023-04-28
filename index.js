const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
require('dotenv').config()

const {login} = require('./controllers/login')
const {partnerLogin} = require('./controllers/partner/partnerLogin')
const {partnerRegister} = require('./controllers/partner/partnerRegister')
const db = require('./models');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/users', db.getUsers)
app.post('/login', login)
app.post('/partner-login', partnerLogin)
app.post('/partner-register', partnerRegister)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});