const model = require("../../models")
const client = model.pool

exports.getPartnerById = async (req, response) => {
  try {
    const data = await client.query(`SELECT partner_id, address, org_name, people_count, email, type, phone_number FROM partner_agency WHERE partner_id = '${req?.query?.id}'`)
    response.status(200).json(data.rows)
  } catch (err) {
    response.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    })
  }
}
