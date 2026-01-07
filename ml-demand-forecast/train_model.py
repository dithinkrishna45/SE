import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib


df = pd.read_csv("sales_data.csv")
df['date'] = pd.to_datetime(df['date'])

df['day'] = df['date'].dt.day
df['month'] = df['date'].dt.month
df['day_of_week'] = df['date'].dt.dayofweek

df = df.drop(['date', 'product_id'], axis=1)

X = df.drop('quantity', axis=1)
y = df['quantity']

model = RandomForestRegressor()
model.fit(X, y)
joblib.dump(model, "demand_model.pkl")

print("Model trained successfully!")