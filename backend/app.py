from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

with open('models/volkswagen_model.pkl', 'rb') as file:
        volkswagen_model = joblib.load(file)

with open('models/audi_model.pkl', 'rb') as file:
        audi_model = joblib.load(file)

with open('models/mercedes_model.pkl', 'rb') as file:
        mercedes_model = joblib.load(file)
    
volkswagen_all_columns = pd.read_csv('datasets/volkswagen_cleaned.csv')
audi_all_columns = pd.read_csv('datasets/audi_cleaned.csv')
mercedes_all_columns = pd.read_csv('datasets/mercedes_cleaned.csv')

def validate_and_convert_param(param, param_name, param_type=float):
    """Validate and convert a request parameter to a specified type."""
    value = request.args.get(param_name)
    if value is None:
        raise ValueError(f"Missing required parameter: {param_name}")
    try:
        return param_type(value)
    except ValueError:
        raise ValueError(f"Invalid value for parameter: {param_name}")


def filter_and_predict(df, model, displacement, mileage, year, kilowatts, rim_size):
    # Make a prediction
    prediction = model.predict([[displacement, mileage, kilowatts, year, rim_size]])[0].round(2)
    
    # Define ranges for filtering
    mileage_min = mileage - 20000
    mileage_max = mileage + 20000
    kilowatts_min = kilowatts - 50
    kilowatts_max = kilowatts + 50
    price_min = prediction * 0.85 
    price_max = prediction * 1.15
    min_year = year - 5
    max_year = year + 5 

    # Filter the dataset based on the input ranges
    filtered_df = df[
        (df['displacement'] == displacement) &
        (df['mileage'] >= mileage_min) & (df['mileage'] <= mileage_max) &
        (df['year'] >= min_year) & (df['year'] <= max_year) &
        (df['kilowatts'] >= kilowatts_min) & (df['kilowatts'] <= kilowatts_max) &
        (df['price'] >= price_min) & (df['price'] <= price_max) 
       
    ]

    # Get the first 12 rows of the filtered dataset
    filtered_data = filtered_df.head(12).to_dict(orient='records')

    return prediction, filtered_data


@app.route('/volkswagen', methods=['GET'])
def volkswagen():
    try:
        displacement = validate_and_convert_param('displacement', 'displacement', float)
        mileage = validate_and_convert_param('mileage', 'mileage', int)
        year = validate_and_convert_param('year', 'year', int)
        kilowatts = validate_and_convert_param('kilowatts', 'kilowatts', int)
        rim_size = validate_and_convert_param('rimSize', 'rimSize', int)

        prediction, filtered_data = filter_and_predict(
            volkswagen_all_columns, volkswagen_model, displacement, mileage, year, kilowatts, rim_size
        )

        return jsonify({'model': prediction, 'cars': filtered_data})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@app.route('/audi', methods=['GET'])
def audi():
    try:
        displacement = validate_and_convert_param('displacement', 'displacement', float)
        mileage = validate_and_convert_param('mileage', 'mileage', int)
        year = validate_and_convert_param('year', 'year', int)
        kilowatts = validate_and_convert_param('kilowatts', 'kilowatts', int)
        rim_size = validate_and_convert_param('rimSize', 'rimSize', int)

        prediction, filtered_data = filter_and_predict(
            audi_all_columns, audi_model, displacement, mileage, year, kilowatts, rim_size
        )

        return jsonify({'model': prediction, 'cars': filtered_data})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@app.route('/mercedes', methods=['GET'])
def mercedes():
    try:
        displacement = validate_and_convert_param('displacement', 'displacement', float)
        mileage = validate_and_convert_param('mileage', 'mileage', int)
        year = validate_and_convert_param('year', 'year', int)
        kilowatts = validate_and_convert_param('kilowatts', 'kilowatts', int)
        rim_size = validate_and_convert_param('rimSize', 'rimSize', int)

        prediction, filtered_data = filter_and_predict(
            mercedes_all_columns, mercedes_model, displacement, mileage, year, kilowatts, rim_size
        )

        return jsonify({'model': prediction, 'cars': filtered_data})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)