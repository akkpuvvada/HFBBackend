const bcrypt = require("bcrypt")
const model = require("../models")
const jwt = require("jsonwebtoken");

const client = model.pool

exports.login = async (req, response) => {
  const { email, password } = req.body
  try {
    const data = await client.query(`SELECT * FROM employee WHERE email= $1;`, [email])
    const user = data?.rows;
    if (user.length === 0) {
      response.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error",
          });
        } else if (result === true) { //Checking if credentials match
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );
          response.status(200).json({
            message: "User signed in!",
            token: token,
          });
        }
        else {
          //Declaring the errors
          if (result != true)
            response.status(400).json({
              error: "Enter correct password!",
            });
        }
      })
    }
    // response.status(200).json(data?.rows);
  } catch (err) {
    console.log(err)
    response.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
}