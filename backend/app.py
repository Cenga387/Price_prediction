import matplotlib
matplotlib.use('Agg')

from flask import Flask, jsonify, request, render_template, send_from_directory, abort
from flask_cors import CORS
import pandas as pd
import joblib
import seaborn as sns
import matplotlib.pyplot as plt
import os

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
all_three = pd.read_csv('backend/datasets/all_cleaned.csv')
all_three_numeric = pd.read_csv('backend/datasets/all_cleaned_numeric.csv')

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

@app.route('/generate-kde-plot')
def generate_kde_plot():
    # Load your data (example: df_all_numeric)
    # df_all_numeric = pd.read_csv('your_data.csv')  # Load your dataset here

    # Filter the data to remove extreme values
    filtered_df = all_three_numeric[all_three_numeric['price'] <= 100000]

    # Generate the KDE plot
    plt.figure(figsize=(10, 6))
    sns.kdeplot(data=filtered_df, x='price', hue='manufacturer', common_norm=False)
    plt.xlim(0, 100000)
    plt.title('Price Distribution by Manufacturer (Filtered and Limited)')
    plt.xlabel('Price')
    plt.ylabel('Density')

    # Save the plot to the static directory
    plot_path = os.path.join('static', 'kde_plot.png')
    plt.savefig(plot_path)
    plt.close()

    return send_from_directory('../static', 'kde_plot.png')

if __name__ == '__main__':
    app.run(debug=True)