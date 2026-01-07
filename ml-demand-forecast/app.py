from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load("demand_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    print("Received data:", data)

    # Debug print (VERY IMPORTANT)
    print("Received data:", data)

    required_fields = ["price", "promotion", "day", "month", "day_of_week"]

    for field in required_fields:
        if field not in data:
            return jsonify({
                "error": f"Missing field: {field}"
            }), 400

    try:
        features = np.array([[
            float(data["price"]),
            int(data["promotion"]),
            int(data["day"]),
            int(data["month"]),
            int(data["day_of_week"])
        ]])

        prediction = model.predict(features)

        return jsonify({
            "predicted_demand": int(prediction[0])
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400

app.run()