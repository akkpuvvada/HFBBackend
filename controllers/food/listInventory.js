const model = require("../../models")
const client = model.pool

exports.listFood = async (req, response) => {
  try {
    const data = await client.query(`SELECT * FROM food_item;`)
    response.status(200).json(data.rows)
  } catch (err) {
    response.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    })
  }
}
