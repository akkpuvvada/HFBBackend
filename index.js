const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const port = 3001
require('dotenv').config()

const {login} = require('./controllers/login')
const {partnerLogin} = require('./controllers/partner/partnerLogin')

const {partnerRegister} = require('./controllers/partner/partnerRegister')

const {listPartners} = require('./controllers/partner/listPartners')
const {listFood} = require('./controllers/food/listFood')
const {listEvents} = require('./controllers/events/listEvents')
const { listVolunteers } = require('./controllers/volunteer/listVolunteers')
const { listInventory } = require('./controllers/food/listInventory')
const { communityList } = require('./controllers/community/communityList')

const { getPartnerById } = require('./controllers/partner/getPartnerById')
const { addFoodItem } = require('./controllers/food/addFoodItem')
const { createEvent } = require('./controllers/events/createEvent')
const { makeDonation } = require('./controllers/donation/makeDonation')

const db = require('./models');

app.use(cors('*'))

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.post('/login', login)
app.post('/partner-login', partnerLogin)

app.get('/users', db.getUsers)
app.get('/list-food', listFood)
app.get('/list-events', listEvents)
app.get('/list-partners', listPartners)
app.get('/list-partner', getPartnerById)
app.get('/list-volunteers', listVolunteers)
app.get('/list-inventory', listInventory)
app.get('/list-communities', communityList)

app.post('/make-donation', makeDonation)
app.post('/add-food-item', addFoodItem)
app.post('/create-event', createEvent)
app.post('/partner-register', partnerRegister)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
});