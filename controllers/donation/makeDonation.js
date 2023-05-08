const model = require("../../models")
const utils = require("../../utils/randomNumber")
const client = model.pool

exports.makeDonation = async (req, response) => {
  try {
    const body = req.body

    body.donations.forEach(async element => {
      const donation_id = utils.randomNumber(999, 2000)
      const inventory_id = utils.randomNumber(999, 2000)
      await client.query(`INSERT INTO donation VALUES ('${donation_id}', ${element.quantity});`)
      await client.query(`INSERT INTO makes VALUES ('${donation_id}', '${body.id}');`)
      await client.query(`INSERT INTO inventory VALUES ('${inventory_id}', ${element.quantity});`)
      await client.query(`INSERT INTO contains VALUES ('${element.item_id}','${inventory_id}');`)
    })

    response.status(200).json({
      message: "Donation Created"
    })
  } catch (err) {
    console.log(err)
    response.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    })
  }
}