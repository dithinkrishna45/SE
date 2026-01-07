const express = require("express");
const axios = require("axios");
const pool = require("../db");
const router = express.Router();

router.post("/forecast", async (req, res) => {

  const payload = {
    price: Number(req.body.price),
    promotion: Number(req.body.promotion),
    day: Number(req.body.day),
    month: Number(req.body.month),
    day_of_week: Number(req.body.day_of_week)
  };

  try {
    // 1️⃣ Call ML API
    const mlResponse = await axios.post(
      "http://127.0.0.1:5000/predict",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    const predicted = mlResponse.data.predicted_demand;

    // 2️⃣ Save to PostgreSQL
    await pool.query(
      `INSERT INTO predictions 
       (price, promotion, day, month, day_of_week, predicted_demand)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        payload.price,
        payload.promotion,
        payload.day,
        payload.month,
        payload.day_of_week,
        predicted
      ]
    );

    // 3️⃣ Send response
    res.json({
      status: "success",
      predicted_demand: predicted,
      message: "Saved to database"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
});

module.exports = router;
