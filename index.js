const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose = require ("mongoose");
const cors = require ("cors");
const dotenv = require ("dotenv");
const helmet = require ("helmet");
const { readdirSync } = require("fs");


dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


/* ROTES */
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 7001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
