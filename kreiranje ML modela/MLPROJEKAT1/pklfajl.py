import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV, train_test_split
import numpy as np
from sklearn.svm import SVR
from sklearn.neighbors import KNeighborsRegressor
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score
from sklearn.linear_model import LinearRegression
import joblib

data_mercedes_numeric = pd.read_csv("mercedes_cleaned_numeric.csv")

X = data_mercedes_numeric.drop(['price'], axis = 1).values
y= data_mercedes_numeric['price'].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Treniranje RandomForestRegressora sa najboljim hiperparametrima (prekopirati imena hiperparametara samo bez prefixa "regressor__")
model =  RandomForestRegressor(max_depth=17, min_samples_leaf=8, min_samples_split=4, n_estimators=300)
model.fit(X_train, y_train)

joblib.dump(model, 'mercedes_model.pkl')
