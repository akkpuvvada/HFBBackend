const model = require("../../models")
const utils = require("../../utils/randomNumber")
const client = model.pool

exports.addFoodItem = async (req, response) => {
  try {
    const body = req.body
    const itemId = utils.randomNumber(999, 2000)
    const data = await client.query(`INSERT INTO food_item VALUES ('${itemId}', '${body.name}', '${body.ID}','${body.unit}', ${0});`)
    if (data.rowCount === 1) {
      response.status(200).json({
        message: "Food Item added",
        ID: itemId
      })
    } else {
      response.status(400).json({
        message: "Item Cannot be added",
        ID: userId
      })
    }
  } catch (err) {
    response.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    })
  }
}
