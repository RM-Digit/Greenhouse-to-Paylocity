const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const mapper = require("./services/filedMapper");

const app = express();
const port = 3002;

const Paylocity = require("./services/paylocity");

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.post("/hired", async (req, res) => {
  if (req.body.action !== "hire_candidate" || req.body.payload === undefined)
    return res.status(200).json({ success: true });
  const { application } = req.body.payload;
  const token = await Paylocity.getToken();
  const rquestData = mapper.GreenHouseToPaylocity(application);
  const offices = application.jobs[0].offices?.map((_) => _.id) || [];

  const companyIds = offices.map((id) => mapper.company[id]);
  const response = await Promise.all(
    companyIds.map((id) => Paylocity.createEmployee(token, id, rquestData))
  );
  console.log("response", response);
  return res.status(200).json({ token: token });
});

app.listen(process.env.PORT || port, () => {
  console.log(`App listening at http://localhost:${process.env.PORT || port}`);
});

module.exports = app;
