const model = require("../../models")
const utils = require("../../utils/randomNumber")

const client = model.pool

exports.partnerRegister = async (req, response) => {
  try {
    const body = req.body
    // const userId = utils.randomNumber(999, 2000)
    const userId = '13410'
    const query_response = await client.query(`INSERT INTO partner_agency VALUES ('${userId}', '${body.address}', '${body.org_name}', '${body.people_count}', '${body.email}', '${body.type}', '${body.phone_number}', crypt('${body.password}', gen_salt('bf')), '${body.username}');`)
    if (query_response.rowCount === 1) {
      response.status(200).json({
        message: "User created",
        ID: userId
      })
    } else {
      response.status(400).json({
        message: "User cannot be created",
        ID: userId
      })
    }
  } catch (err) {
    response.status(500).json({
      error: err?.detail || "Database error occurred while signing in!", //Database connection error
    });
  }
}