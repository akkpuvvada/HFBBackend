const model = require("../../models")
const utils = require("../../utils/randomNumber")
const client = model.pool

exports.createEvent = async (req, response) => {
  try {
    const body = req.body
    const event_id = utils.randomNumber(999, 2000)
    const insertToEvent = await client.query(`INSERT INTO event VALUES ('${event_id}', ${body.no_of_persons_served}, '${body.time}', '${body.date}', '${body.ID}', '${body.partner_id}', '${body.loc_id}', '${body.location}');`)
    if (insertToEvent.rowCount === 1) {
      body.distributes.forEach(async element => {
        await client.query(`INSERT INTO distributes VALUES ('${element.quantity}', '${element.item_id}', '${event_id}')`)
      })
      body.volunteers.forEach(async element => {
        console.log('test', element)
        await client.query(`INSERT INTO participates VALUES ('${element}', '${event_id}');`)
      })
    } else {
      response.status(400).json({
        message: "Event Cannot Be Created",
        ID: userId
      })
    }
    response.status(200).json({
      message: "Event Created",
      ID: event_id
    })
  } catch (err) {
    console.log(err)
    response.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    })
  }
}