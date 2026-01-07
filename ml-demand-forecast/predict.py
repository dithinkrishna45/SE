import joblib
import numpy as np

model = joblib.load("demand_model.pkl")

sample_input = np.array([[100, 1, 10, 2, 5]])
prediction = model.predict(sample_input)

print("Predicted Demand:", int(prediction[0]))
