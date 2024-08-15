from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.neighbors import KNeighborsRegressor

app = Flask(__name__)
CORS(app)

# Load the datasets when the app starts
df_numeric = pd.read_csv('../cleaned_only_numeric.csv')
df_all = pd.read_csv('../cleaned_every_column.csv')

# Assume 'target' is the column we want to predict
X = df_numeric.drop('price', axis=1).values
y = df_numeric['price'].values

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

@app.route('/get-data', methods=['GET'])
def get_data():
    # Get the first 15 rows of the first dataset
    data = df_all.head(15).to_dict(orient='records')
    columns = df_all.columns.tolist()
    return jsonify({'data': data, 'columns': columns})

@app.route('/filter-data', methods=['POST'])
def filter_data():
    filters = request.json
    filtered_df = df_all.copy()

    for column, criteria in filters.items():
        if criteria['min'] is not None:
            filtered_df = filtered_df[filtered_df[column] >= criteria['min']]
        if criteria['max'] is not None:
            filtered_df = filtered_df[filtered_df[column] <= criteria['max']]
        if criteria.get('selected') is not None:
            filtered_df = filtered_df[filtered_df[column] == criteria['selected']]
    
    filtered_data = filtered_df.head(15).to_dict(orient='records')
    return jsonify({'data': filtered_data, 'columns': filtered_df.columns.tolist()})


@app.route('/random-forest', methods=['GET'])
def random_forest():
    model = RandomForestRegressor(max_depth=17, min_samples_leaf=8, min_samples_split=4, n_estimators=300)
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    # Predikcija cijene za tražene specifikacije 	displacement, kilowatts, mileage, year, rimSize
    cijena = model.predict([[2.7, 300, 100_000, 2015, 10]])
    cijena_rounded = cijena[0].round(2)
    return jsonify({'model': 'Random Forest Regressor', 'mean_squared_error': mse, 'r2_score': r2, 'Predikcija_cijene': cijena_rounded})

@app.route('/knn-regression', methods=['GET'])
def knn_regression():
    model = KNeighborsRegressor()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    # Predikcija cijene za tražene specifikacije 	displacement, kilowatts, mileage, year, rimSize
    cijena = model.predict([[2.7, 300, 100_000, 2015, 10]])
    cijena_rounded = cijena[0].round(2)
    return jsonify({'model': 'KNeighborsRegressor', 'mean_squared_error': float(mse), 'r2_score': float(r2), 'Predikcija_cijene': cijena_rounded})


@app.route('/linear-regression', methods=['GET'])
def linear_regression():
    model = LinearRegression()
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)
    # Predikcija cijene za tražene specifikacije 	displacement, kilowatts, mileage, year, rimSize
    cijena = model.predict([[2.7, 300, 100_000, 2015, 10]])
    cijena_rounded = cijena[0].round(2)
    return jsonify({'model': 'Linear Regression', 'mean_squared_error': mse, 'r2_score': r2, 'Predikcija_cijene': cijena_rounded})


if __name__ == '__main__':
    app.run(debug=True)
