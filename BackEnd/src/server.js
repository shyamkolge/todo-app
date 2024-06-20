const app = require('./app.js');
const dotenv = require('dotenv');
const connectDB = require("./db/index.js");

dotenv.config();

const PORT = process.env.PORT || 8080;

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log("Server is started at PORT number : ", PORT);
    })
  )
  .catch((error) => console.error(error));
