const model = require("../../models")
const client = model.pool

const getPartnerData = async (partnerId) => {

}

exports.listEvents = async (req, response) => {
  try {
    const data = await client.query(`SELECT event_id, location, date, time, org_name FROM event, partner_agency WHERE partner_agency.partner_id= event.partner_id;`)
    response.status(200).json(data.rows)
  } catch (err) {
    response.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    })
  }
}
