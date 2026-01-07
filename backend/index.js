const express = require("express");
const cors = require("cors");

const app = express();

/* VERY IMPORTANT */
app.use(cors());
app.use(express.json());   // ⭐ THIS PARSES JSON

/* ROUTES */
const predictRoute = require("./routes/predict");
app.use("/api", predictRoute);

/* TEST ROUTE */
app.post("/test", (req, res) => {
  console.log("TEST BODY:", req.body);
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
