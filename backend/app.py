from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
from scipy.stats import gaussian_kde

app = Flask(__name__)
CORS(app)

# Load models
with open('models/volkswagen_model.pkl', 'rb') as file:
    volkswagen_model = joblib.load(file)

with open('models/audi_model.pkl', 'rb') as file:
    audi_model = joblib.load(file)

with open('models/mercedes_model.pkl', 'rb') as file:
    mercedes_model = joblib.load(file)

volkswagen_all_columns = pd.read_csv('datasets/volkswagen_cleaned.csv')
audi_all_columns = pd.read_csv('datasets/audi_cleaned.csv')
mercedes_all_columns = pd.read_csv('datasets/mercedes_cleaned.csv')
all_cars = pd.read_csv('datasets/all_cars.csv')

df_all_numeric = pd.read_csv('datasets/all_cleaned_numeric.csv')


def get_dataset_by_manufacturer(manufacturer):
    if manufacturer == 'volkswagen':
        return volkswagen_all_columns
    elif manufacturer == 'audi':
        return audi_all_columns
    elif manufacturer == 'mercedes':
        return mercedes_all_columns
    else:
        return all_cars

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
    prediction = model.predict([[displacement, kilowatts, mileage, year, rim_size]])[0].round(2)
    
    # Define ranges for filtering
    displacement_min = displacement - 0.5
    displacement_max = displacement + 0.5
    mileage_min = mileage - 35000
    mileage_max = mileage + 35000
    price_min = prediction * 0.85 
    price_max = prediction * 1.15
    min_year = year - 3
    max_year = year + 3

    # Filter the dataset based on the input ranges
    filtered_df = df[
        (df['displacement'] >= displacement_min) & (df['displacement'] <= displacement_max) &
        (df['mileage'] >= mileage_min) & (df['mileage'] <= mileage_max) &
        (df['year'] >= min_year) & (df['year'] <= max_year) &
        (df['price'] >= price_min) & (df['price'] <= price_max) 
       
    ]
    sorted_filtered_df = filtered_df.sort_values(by='price', ascending=False)

    # Get the first 12 rows of the sorted dataset
    filtered_data = sorted_filtered_df.head(12).to_dict(orient='records')

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
    
@app.route('/api/car-stats', methods=['GET'])
def car_stats():

    count1 = volkswagen_all_columns.shape[0]
    count2 = audi_all_columns.shape[0]
    count3 = mercedes_all_columns.shape[0]

    data = {
        "labels": ["Volkswagen", "Audi", "Mercedes"],
        "values": [count1, count2, count3]
    }
    return jsonify(data)

@app.route('/api/car-stats2', methods=['GET'])
def car_stats2():

    # Assuming df_all_numeric is your DataFrame with filtered prices <= 100,000
    # Filter the data for each manufacturer
    filtered_df = df_all_numeric[df_all_numeric['price'] <= 1_000_000]

    volkswagen_data = filtered_df[filtered_df['manufacturer'] == 'Volkswagen']['price']
    audi_data = filtered_df[filtered_df['manufacturer'] == 'Audi']['price']
    mercedes_data = filtered_df[filtered_df['manufacturer'] == 'Mercedes-Benz']['price']

    # Fit KDE for each manufacturer's price data
    kde_volkswagen = gaussian_kde(volkswagen_data)
    kde_audi = gaussian_kde(audi_data)
    kde_mercedes = gaussian_kde(mercedes_data)

    # Define the price points of interest
    price_points = np.arange(5000, 100001, 5000)

    # Scale factor based on the graph's y-axis (adjust as needed)
    scale_factor = 1e5  # Example scaling factor to match the graph

    # Initialize the list to store the formatted data
    label_data = []
    volkswagen_data = []
    audi_data = []
    mercedes_data = []

    # Evaluate the KDE at each price point and store the results in the desired format
    for x_point in price_points:
        y_point_volkswagen = kde_volkswagen(x_point)[0] * scale_factor
        y_point_audi = kde_audi(x_point)[0] * scale_factor
        y_point_mercedes = kde_mercedes(x_point)[0] * scale_factor
    
        data_entry1 = str(x_point)
        label_data.append(data_entry1)

        data_entry2 = round(y_point_volkswagen, 2)
        volkswagen_data.append(data_entry2)

        data_entry3 = round(y_point_audi, 2)
        audi_data.append(data_entry3)

        data_entry4 = round(y_point_mercedes, 2)
        mercedes_data.append(data_entry4)
    
    labels = []
    for x in range(20):
        labels.append(label_data[x])
    
    volkswagens = []
    for x in range(20):
        volkswagens.append(volkswagen_data[x])
    
    audis = []
    for x in range(20):
        audis.append(audi_data[x])
    
    mercedeses = []
    for x in range(20):
        mercedeses.append(mercedes_data[x])

    data = {
        "labels": labels,
        "volkswagen": volkswagens,
        "audi": audis,
        "mercedes": mercedeses
    }

    return jsonify(data)

@app.route('/api/car-stats3', methods=['GET'])
def car_stats3():
    x_axis = request.args.get('x_axis', 'year').lower()  # Default to 'year' if not provided
    
    # Map the x_axis parameter to the correct database column name
    x_axis_mapping = {
        'year': 'year',
        'kilowatts': 'kilowatts',
        'mileage': 'mileage',
        'displacement': 'displacement',
        'rimsize': 'rimSize'  # Correct the mapping for rimSize
    }
    
    if x_axis not in x_axis_mapping:
        return jsonify({'error': 'Invalid x_axis parameter'}), 400
    
    x_axis_column = x_axis_mapping[x_axis]
    
    # Assuming df_all_numeric is your DataFrame
    # Filter the data for each manufacturer with price
    filtered_df = df_all_numeric[df_all_numeric['price'] <= 1_000_000]
    
    # Extract the unique values for the selected x-axis and sort them
    x_values = sorted(filtered_df[x_axis_column].unique())
    
    # Determine the number of bins (max 30) if necessary
    if len(x_values) > 30 and x_axis in ['kilowatts', 'mileage', 'displacement']:
        # Calculate bin size based on the length of x_values and max bins
        bin_size = len(x_values) // 30
        
        # Bin the x values by averaging within each bin
        binned_x_values = []
        for i in range(0, len(x_values), bin_size):
            avg_x_value = np.mean(x_values[i:i + bin_size])
            
            if x_axis == 'kilowatts':
                # Round up to the nearest 5 for kilowatts
                rounded_value = int(np.ceil(avg_x_value / 5) * 5)
            elif x_axis == 'mileage':
                # Round up to the nearest 1000 for mileage
                rounded_value = int(np.ceil(avg_x_value / 1000) * 1000)
            elif x_axis == 'displacement':
                # Round to the nearest 0.1 for displacement
                rounded_value = round(avg_x_value, 1)
            
            binned_x_values.append(rounded_value)
    else:
        # Use the values directly for 'year', 'displacement', and 'rimSize'
        binned_x_values = x_values
        bin_size = 1  # Set a default value for bin_size when it's not used

    # Initialize the lists to store average prices per x-axis value for each manufacturer
    filtered_labels = []
    volkswagen_prices = []
    audi_prices = []
    mercedes_prices = []

    for x_value in binned_x_values:
        if x_axis in ['kilowatts', 'mileage', 'displacement'] and len(x_values) > 30:
            # Apply binning logic only when necessary
            filtered_data = filtered_df[(filtered_df[x_axis_column] >= x_value - bin_size / 2) & 
                                        (filtered_df[x_axis_column] < x_value + bin_size / 2)]
        else:
            filtered_data = filtered_df[filtered_df[x_axis_column] == x_value]
        
        # Calculate the average price for each manufacturer
        volkswagen_avg_price = filtered_data[filtered_data['manufacturer'] == 'Volkswagen']['price'].mean()
        audi_avg_price = filtered_data[filtered_data['manufacturer'] == 'Audi']['price'].mean()
        mercedes_avg_price = filtered_data[filtered_data['manufacturer'] == 'Mercedes-Benz']['price'].mean()

        # Filter out x_values where all prices are NaN or 0
        if (not pd.isna(volkswagen_avg_price) and volkswagen_avg_price != 0) or \
           (not pd.isna(audi_avg_price) and audi_avg_price != 0) or \
           (not pd.isna(mercedes_avg_price) and mercedes_avg_price != 0):
            filtered_labels.append(str(int(x_value)) if x_axis in ['year', 'rimsize'] else str(x_value))
            volkswagen_prices.append(round(volkswagen_avg_price if not pd.isna(volkswagen_avg_price) else 0, 2))
            audi_prices.append(round(audi_avg_price if not pd.isna(audi_avg_price) else 0, 2))
            mercedes_prices.append(round(mercedes_avg_price if not pd.isna(mercedes_avg_price) else 0, 2))

    data = {
        "labels": filtered_labels,  # Use the filtered labels
        "volkswagen": volkswagen_prices,
        "audi": audi_prices,
        "mercedes": mercedes_prices
    }

    return jsonify(data)


@app.route('/<manufacturer>/models', methods=['GET'])
def get_models_by_manufacturer(manufacturer):
    manufacturer = manufacturer.lower()

    if manufacturer == 'volkswagen':
        cars = volkswagen_all_columns.to_dict(orient='records')
    elif manufacturer == 'audi':
        cars = audi_all_columns.to_dict(orient='records')
    elif manufacturer == 'mercedes':
        cars = mercedes_all_columns.to_dict(orient='records')
    else:
        return jsonify({'error': 'Manufacturer not found'}), 404

    return jsonify({'cars': cars})

@app.route('/filter', methods=['GET'])
def filter_by_manufacturer_and_model():
    try:
        manufacturer = request.args.get('manufacturer', '').lower()
        models = request.args.get('model', '').split(',')
        doors = request.args.get('doors', '').split(',')
        fuel = request.args.get('fuel', '').split(',')
        color = request.args.get('color', '').split(',')
        transmission = request.args.get('transmission', '').split(',')
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 12))

        print(f"Parameters: {request.args}")

        # Select the appropriate dataset based on the manufacturer
        df = get_dataset_by_manufacturer(manufacturer)

        # Apply filters
        if models:
            df = df[df['model'].isin(models)]
        if doors:
            df = df[df['doors'].isin(doors)]
        if fuel:
            df = df[df['fuel'].isin(fuel)]
        if color:
            df = df[df['color'].isin(color)]
        if transmission:
            df = df[df['transmission'].isin(transmission)]

        print(f"Filtered DataFrame Shape: {df.shape}")


        # Paginate the filtered dataset
        start = (page - 1) * limit
        end = start + limit
        filtered_data = df.iloc[start:end].to_dict(orient='records')

        return jsonify({
            'cars': filtered_data,
            'total': len(filtered_data)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
