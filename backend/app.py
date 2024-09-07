from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib
import logging
import numpy as np
import openai
from openai import OpenAI
from openai import OpenAIError
import os
from dotenv import load_dotenv
from scipy.stats import gaussian_kde

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

instructions = """You are a specialized car expert assistant designed to provide accurate and helpful information about cars. Your primary focus is to assist users with car-related queries. Your tasks include, but are not limited to:

                    General Car Information:

                    Provide details about various car models, makes, and their features.
                    Explain different types of engines, transmissions, and drivetrain systems.
                    Offer insights into car maintenance, including routine checks and common repairs.
                    Car Buying and Selling:

                    Advise on what to consider when buying a new or used car.
                    Provide information about car valuations, including factors that affect a car’s price.
                    Help users understand the pros and cons of different car models and trims.
                    Car Performance and Specifications:

                    Explain car performance metrics such as horsepower, torque, fuel efficiency, and acceleration.
                    Provide comparisons between different car models or brands based on performance criteria.
                    Troubleshooting and Diagnostics:

                    Assist with common car problems and potential causes.
                    Suggest possible solutions or next steps for troubleshooting car issues.
                    Car Safety and Regulations:

                    Offer information on car safety features and ratings.
                    Provide guidance on vehicle regulations and safety standards.
                    Customization and Accessories:

                    Explain options for car customization and aftermarket accessories.
                    Advise on the benefits and drawbacks of various upgrades.
                    Interaction Style:

                    Accuracy: Ensure that all information provided is accurate and up-to-date.
                    Clarity: Use clear and concise language, avoiding technical jargon when possible. If technical terms are necessary, provide explanations.
                    Helpfulness: Aim to provide practical and actionable advice. If a question is outside your expertise, inform the user politely and suggest where they might find the information.
                    Engagement: Engage with users in a friendly and professional manner. Encourage users to ask follow-up questions if they need more information.

                    Boundaries:

                    Do not provide medical, legal, or financial advice unless it directly relates to car ownership or maintenance.
                    If a query is not related to cars, politely inform the user that your expertise is focused solely on car-related topics.
                    By adhering to these instructions, you will provide users with a comprehensive, accurate, and user-friendly experience while focusing solely on car-related topics."""
  
app = Flask(__name__)
CORS(app)


logging.basicConfig(level=logging.INFO)

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
all_cars = pd.read_csv('datasets/all_cleaned.csv')

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
    min_year = year - 1
    max_year = year + 1

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

@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        # Get the user input from the request
        user_input = request.json.get('message', '')
        logging.info(f"Received message: {user_input}")
        
        if not user_input:
            return jsonify({'error': 'No input provided'}), 400
        
        # Generate a response from the assistant
        chat_completion = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {"role": "system", "content": instructions},
                {"role": "user", "content": user_input},
                {"role": "assistant", "content": "Hi, I'm an AI chatbot that is an expert in cars. How can I help you today?"}
            ],
            max_tokens=1000,
            temperature=0.3,
            n=1
        )

        
        # Extract the response text
        response_text = chat_completion.choices[0].message.content.strip()
        logging.info(f"OpenAI Response: {response_text}")
        
        # Return the response to the frontend
        return jsonify({'response': response_text})

    except OpenAIError as e:
        logging.error(f"OpenAI API error: {str(e)}")
        return jsonify({'error': 'Failed to communicate with OpenAI'}), 500

    except Exception as e:
        logging.error(f"Server error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

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
    try: 
        if manufacturer == 'volkswagen':
            model = volkswagen_all_columns['model'].unique().tolist()
            logging.info(f"Volkswagen DataFrame: {volkswagen_all_columns.columns}")

        elif manufacturer == 'audi':
            model = audi_all_columns['model'].unique().tolist()
        elif manufacturer == 'mercedes':
            model = mercedes_all_columns['model'].unique().tolist()
        else:
            return jsonify({'error': 'Manufacturer not found'}), 404
    except Exception as e:
        logging.error(f"Error fetching Volkswagen models: {str(e)}")
        return jsonify({'error': str(e)}), 500
    logging.info(f"Manufacturer parameter: '{manufacturer}'")  
    return jsonify({'model': model})

@app.route('/filter-options', methods=['GET'])
def filter_options():
    try:
        manufacturer = request.args.get('manufacturer', '').lower()
        logging.info(f"Manufacturer parameter: '{manufacturer}'")

        models = request.args.get('models', '').split(',')
        if not models:
            return jsonify({'error': 'No models provided'}), 400

        df = get_dataset_by_manufacturer(manufacturer)
        logging.info(f"Selected dataset for manufacturer '{manufacturer}': {df.shape}")

        df = df[df['model'].isin(models)]

        doors = df['doors'].unique().tolist()
        fuel = df['fuel'].unique().tolist()
        color = df['color'].unique().tolist()
        transmission = df['transmission'].unique().tolist()

        return jsonify({
            'doors': doors,
            'fuel': fuel,
            'color': color,
            'transmission': transmission
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/filter', methods=['GET'])
def filter_by_manufacturer_and_model():
    try:
        manufacturer = request.args.get('manufacturer', '').lower()
        models = request.args.get('model', '').split(',')
        doors = request.args.get('doors', '').split(',')
        fuel = request.args.get('fuel', '').split(',')
        color = request.args.get('color', '').split(',')
        transmission = request.args.get('transmission', '').split(',')
        displacement_min = float(request.args.get('displacementRangeMin', ''))
        displacement_max = float(request.args.get('displacementRangeMax', ''))
        kilowatts_min = float(request.args.get('kilowattsRangeMin', ''))
        kilowatts_max = float(request.args.get('kilowattsRangeMax', ''))
        mileage_min = float(request.args.get('mileageRangeMin', ''))
        mileage_max = float(request.args.get('mileageRangeMax', ''))
        price_min = float(request.args.get('priceRangeMin', ''))
        price_max = float(request.args.get('priceRangeMax', ''))
        year_min = int(request.args.get('yearRangeMin', ''))
        year_max = int(request.args.get('yearRangeMax', ''))
        cruise_control = request.args.get('cruiseControl', '').upper() == 'TRUE'
        air_condition = request.args.get('airCondition', '').upper() == 'TRUE'
        navigation = request.args.get('navigation', '').upper() == 'TRUE'
        registration = request.args.get('registration', '').upper() == 'TRUE'
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 12))

        print(f"Parameters: {request.args}")

        # Select the appropriate dataset based on the manufacturer
        df = get_dataset_by_manufacturer(manufacturer)
        logging.info(f"Selected dataset for manufacturer '{manufacturer}': {df.shape}")

        # Apply filters only if they are provided
        if models and models[0]:
            df = df[df['model'].str.lower().isin([model.lower() for model in models])]
        if doors and doors[0]:
            df = df[df['doors'].isin(doors)]
        if fuel and fuel[0]:
            df = df[df['fuel'].str.lower().isin([f.lower() for f in fuel])]
        if color and color[0]:
            df = df[df['color'].str.lower().isin([c.lower() for c in color])]
        if transmission and transmission[0]:
            df = df[df['transmission'].str.lower().isin([t.lower() for t in transmission])]
        if displacement_min and displacement_max:
            df = df[(df['displacement'] >= displacement_min) & (df['displacement'] <= displacement_max)]
        if kilowatts_min and kilowatts_max:
            df = df[(df['kilowatts'] >= kilowatts_min) & (df['kilowatts'] <= kilowatts_max)]
        if mileage_min and mileage_max:
            df = df[(df['mileage'] >= mileage_min) & (df['mileage'] <= mileage_max)]
        if price_min and price_max:
            df = df[(df['price'] >= price_min) & (df['price'] <= price_max)]
        if year_min and year_max:
            df = df[(df['year'] >= year_min) & (df['year'] <= year_max)]
        if cruise_control is not None:
            df = df[df['cruiseControl'] == cruise_control]
        if air_condition is not None:
            df = df[df['airCondition'] == air_condition]
        if navigation is not None:
            df = df[df['navigation'] == navigation]
        if registration is not None:
            df = df[df['registration'] == registration]

        print(f"Filtered DataFrame Shape: {df.shape}")

        # Paginate the filtered dataset
        start = (page - 1) * limit
        end = start + limit
        filtered_data = df.iloc[start:end].to_dict(orient='records')

        return jsonify({
            'cars': filtered_data,
            'total': df.shape[0]  # Return the total number of cars that match the filters
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
