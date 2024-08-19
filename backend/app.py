from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

with open('backend/models/volkswagen_model.pkl', 'rb') as file:
        volkswagen_model = joblib.load(file)

with open('backend/models/audi_model.pkl', 'rb') as file:
        audi_model = joblib.load(file)

with open('backend/models/mercedes_model.pkl', 'rb') as file:
        mercedes_model = joblib.load(file)
    
volkswagen_all_columns = pd.read_csv('backend/datasets/volkswagen_cleaned.csv')
audi_all_columns = pd.read_csv('backend/datasets/audi_cleaned.csv')
mercedes_all_columns = pd.read_csv('backend/datasets/mercedes_cleaned.csv')

@app.route('/volkswagen', methods=['GET'])
def volkswagen():
    displacement = float(request.args.get('displacement'))
    mileage = int(request.args.get('mileage'))
    year = int(request.args.get('year'))
    kilowatts = int(request.args.get('kilowatts'))
    rim_size = int(request.args.get('rimSize'))

    predictions = volkswagen_model.predict([[displacement, mileage, kilowatts, year, rim_size]])
    predictions_rounded = predictions[0].round(2)
    return jsonify({'model': predictions_rounded})

@app.route('/audi', methods=['GET'])
def audi():
    displacement = float(request.args.get('displacement'))
    mileage = int(request.args.get('mileage'))
    year = int(request.args.get('year'))
    kilowatts = int(request.args.get('kilowatts'))
    rim_size = int(request.args.get('rimSize'))

    predictions = audi_model.predict([[displacement, mileage, kilowatts, year, rim_size]])
    predictions_rounded = predictions[0].round(2)
    return jsonify({'model': predictions_rounded})

@app.route('/mercedes', methods=['GET'])
def mercedes():
    displacement = float(request.args.get('displacement'))
    mileage = int(request.args.get('mileage'))
    year = int(request.args.get('year'))
    kilowatts = int(request.args.get('kilowatts'))
    rim_size = int(request.args.get('rimSize'))

    predictions = mercedes_model.predict([[displacement, mileage, kilowatts, year, rim_size]])
    predictions_rounded = predictions[0].round(2)
    return jsonify({'model': predictions_rounded})


if __name__ == '__main__':
    app.run(debug=True)