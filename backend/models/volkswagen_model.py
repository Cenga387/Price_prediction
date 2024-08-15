from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib

df_numeric = pd.read_csv('volkswagen_cleaned_numeric.csv')
X = df_numeric.drop('price', axis=1).values
y = df_numeric['price'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestRegressor(max_depth=17, min_samples_leaf=8, min_samples_split=4, n_estimators=300)
model.fit(X_train, y_train)

joblib.dump(model, 'random_forest_model.pkl')