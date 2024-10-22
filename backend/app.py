from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib
import numpy as np
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


with open('models/volkswagen_model.pkl', 'rb') as file:
    volkswagen_model = joblib.load(file)

with open('models/audi_model.pkl', 'rb') as file:
    audi_model = joblib.load(file)

with open('models/skoda_model.pkl', 'rb') as file:
    skoda_model = joblib.load(file)

volkswagen_all_columns = pd.read_csv('datasets/volkswagen_cleaned.csv')
audi_all_columns = pd.read_csv('datasets/audi_cleaned.csv')
skoda_all_columns = pd.read_csv('datasets/skoda_cleaned.csv')
all_cars = pd.read_csv('datasets/all_cleaned.csv')

df_all_numeric = pd.read_csv('datasets/all_cleaned_numeric.csv')


def get_dataset_by_manufacturer(manufacturer):
    if manufacturer == 'volkswagen':
        return volkswagen_all_columns
    elif manufacturer == 'audi':
        return audi_all_columns
    elif manufacturer == 'skoda':
        return skoda_all_columns
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


def filter_and_predict(df, model, displacement, kilowatts, mileage, year, transmission_encoded, type_encoded):

    prediction = model.predict([[displacement, kilowatts, mileage, year, transmission_encoded, type_encoded]])[0].round(2)
    
    transmission_map = {0: 'Manuelni', 1: 'Polu-automatik', 2: 'Automatik'}
    transmission = transmission_map.get(transmission_encoded, 'Unknown')

    type_map = {
        'volkswagen': {0: 'Off-road', 1: 'Oldtimer', 2: 'Cabriolet', 3: 'Malo auto', 4: 'Monovolumen', 5: 'Sportski/kupe', 6: 'Limuzina', 7: 'Caddy', 8: 'Kombi', 9: 'SUV', 10: 'Pickup'},
        'audi': {0: 'Oldtimer', 1: 'Cabriolet', 2: 'Malo auto', 3: 'Limuzina', 4: 'Karavan', 5: 'Sportski/kupe', 6: 'SUV'},
        'skoda': {0: 'Malo auto', 1: 'Caddy', 2: 'Limuzina', 3: 'Karavan', 4: 'Sportski/kupe', 5: 'SUV'}
    }

    if df.equals(volkswagen_all_columns):
        type = type_map['volkswagen'].get(type_encoded, 'Unknown')
    elif df.equals(audi_all_columns):
        type = type_map['audi'].get(type_encoded, 'Unknown')
    elif df.equals(skoda_all_columns):
        type = type_map['skoda'].get(type_encoded, 'Unknown')
    else:
        type = 'Unknown'

    mileage_min = mileage - 35000
    mileage_max = mileage + 35000
    price_min = prediction * 0.85
    price_max = prediction * 1.15
    min_year = year - 2
    max_year = year + 2

  
    filtered_df = df[
        (df['mileage'] >= mileage_min) & (df['mileage'] <= mileage_max) &
        (df['transmission'] == transmission) &
        (df['type'] == type) &
        (df['year'] >= min_year) & (df['year'] <= max_year) &
        (df['price'] >= price_min) & (df['price'] <= price_max) 
    ]
    sorted_filtered_df = filtered_df.sort_values(by='price', ascending=True)

   
    filtered_data = sorted_filtered_df.head(12).to_dict(orient='records')

    return prediction, filtered_data

@app.route('/search', methods=['GET'])
def search():
    try:
        keywords = request.args.get('keywords', '').lower()
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 12))
        
        if not keywords:
            return jsonify({'error': 'No keywords provided'}), 400
        
        keyword_list = keywords.split()
        
        keyword_to_dataset = {
            'golf': volkswagen_all_columns,
            'golf 7': volkswagen_all_columns,
            'passat': volkswagen_all_columns,
            'arteon': volkswagen_all_columns,
            'scirocco': volkswagen_all_columns,
            'tiguan': volkswagen_all_columns,
            'bora': volkswagen_all_columns,
            'polo': volkswagen_all_columns,
            'golf plus': volkswagen_all_columns,
            'caddy': volkswagen_all_columns,
            'touran': volkswagen_all_columns,
            'passat cc': volkswagen_all_columns,
            'jetta': volkswagen_all_columns,
            'sharan': volkswagen_all_columns,
            'amarok': volkswagen_all_columns,
            't5': volkswagen_all_columns,
            't-roc': volkswagen_all_columns,
            'touareg': volkswagen_all_columns,
            'id.4': volkswagen_all_columns,
            'id.5': volkswagen_all_columns,
            'id.3': volkswagen_all_columns,
            't4': volkswagen_all_columns,
            'buba / beetle': volkswagen_all_columns,
            't6': volkswagen_all_columns,
            't7': volkswagen_all_columns,
            'up!': volkswagen_all_columns,
            't-cross': volkswagen_all_columns,
            'e-golf': volkswagen_all_columns,
            'fox': volkswagen_all_columns,
            'phaeton': volkswagen_all_columns,
            't2': volkswagen_all_columns,
            'crafter': volkswagen_all_columns,
            'lupo': volkswagen_all_columns,
            'taigo': volkswagen_all_columns,
            'lt': volkswagen_all_columns,
            'buggy': volkswagen_all_columns,
            'vento': volkswagen_all_columns,
            'eos': volkswagen_all_columns,
            'corrado': volkswagen_all_columns,
            't3': volkswagen_all_columns,
            'cc': volkswagen_all_columns,
            'routan': volkswagen_all_columns,
            'atlas': volkswagen_all_columns,
            '181': volkswagen_all_columns,
            'xl1': volkswagen_all_columns,
            't1': volkswagen_all_columns,
            'audi': audi_all_columns,
            '50': audi_all_columns,
            '80': audi_all_columns,
            '90': audi_all_columns,
            '100': audi_all_columns,
            'a1': audi_all_columns,
            'a2': audi_all_columns,
            'a3': audi_all_columns,
            'a4': audi_all_columns,
            'a4 allroad': audi_all_columns,
            'a5': audi_all_columns,
            'a6': audi_all_columns,
            'a6 allroad': audi_all_columns,
            'a7': audi_all_columns,
            'a8': audi_all_columns,
            'b4': audi_all_columns,
            'cabriolet': audi_all_columns,
            's1': audi_all_columns,
            's3': audi_all_columns,
            's4': audi_all_columns,
            's5': audi_all_columns,
            's6': audi_all_columns,
            's7': audi_all_columns,
            's8': audi_all_columns,
            'sq3': audi_all_columns,
            'q2': audi_all_columns,
            'q3': audi_all_columns,
            'q4 e-tron': audi_all_columns,
            'q5': audi_all_columns,
            'q7': audi_all_columns,
            'q8': audi_all_columns,
            'q8 e-tron': audi_all_columns,
            'sq5': audi_all_columns,
            'sq7': audi_all_columns,
            'sq8': audi_all_columns,
            'rs3': audi_all_columns,
            'rs4': audi_all_columns,
            'rs5': audi_all_columns,
            'rs6': audi_all_columns,
            'rs7': audi_all_columns,
            'rsq3': audi_all_columns,
            'rsq8': audi_all_columns,
            'r8': audi_all_columns,
            'tt': audi_all_columns,
            'tt_rs': audi_all_columns,
            'e_tron_gt': audi_all_columns,
            'skoda': skoda_all_columns,
            '105': skoda_all_columns,
            '120': skoda_all_columns,
            '130': skoda_all_columns,
            'citigo': skoda_all_columns,
            'enyaq': skoda_all_columns,
            'enyaq coupé': skoda_all_columns,
            'fabia rs': skoda_all_columns,
            'fabia': skoda_all_columns,
            'favorit': skoda_all_columns,
            'felicia': skoda_all_columns,
            'octavia': skoda_all_columns,
            'octavia rs': skoda_all_columns,
            'octavia scout': skoda_all_columns,
            'octavia tour': skoda_all_columns,
            'praktik': skoda_all_columns,
            'roomster': skoda_all_columns,
            'rapid': skoda_all_columns,
            'scala': skoda_all_columns,
            'spaceback': skoda_all_columns,
            'yeti': skoda_all_columns,
            'superb': skoda_all_columns,
            'kodiaq': skoda_all_columns,
            'karoq': skoda_all_columns,
            'kamiq': skoda_all_columns
        }

        df = all_cars

        for keyword in keyword_list:
            if keyword in keyword_to_dataset:
                df = keyword_to_dataset[keyword]
                break

        filtered_df = df[df['title'].str.lower().str.contains(keywords)]

        start = (page - 1) * limit
        end = start + limit
        paginated_df = filtered_df.iloc[start:end]


        search_results = paginated_df.head(24).to_dict(orient='records')

        return jsonify({'cars': search_results})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        user_input = request.json.get('message', '')
        
        if not user_input:
            return jsonify({'error': 'No input provided'}), 400
        
        chat_completion = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {"role": "system", "content": instructions},
                {"role": "user", "content": user_input},
                {"role": "assistant", "content": "Hi, I'm an AI chatbot that is an expert in cars. How can I help you today?"}
            ],
            max_tokens=500,
            temperature=0.3,
            n=1
        )

        
        # Extract the response text
        response_text = chat_completion.choices[0].message.content.strip()
        
        # Return the response to the frontend
        return jsonify({'response': response_text})

    except OpenAIError as e:
        return jsonify({'error': 'Failed to communicate with OpenAI'}), 500

    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/volkswagen', methods=['GET'])
def volkswagen():
    try:
        displacement = validate_and_convert_param('displacement', 'displacement', float)
        kilowatts = validate_and_convert_param('kilowatts', 'kilowatts', int)
        mileage = validate_and_convert_param('mileage', 'mileage', int)
        year = validate_and_convert_param('year', 'year', int)
        transmission = validate_and_convert_param('transmission', 'transmission', int)
        type = validate_and_convert_param('type', 'type', int)

        prediction, filtered_data = filter_and_predict(
            volkswagen_all_columns, volkswagen_model, displacement, kilowatts, mileage, year, transmission, type
        )

        return jsonify({'model': prediction, 'cars': filtered_data})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@app.route('/audi', methods=['GET'])
def audi():
    try:
        displacement = validate_and_convert_param('displacement', 'displacement', float)
        kilowatts = validate_and_convert_param('kilowatts', 'kilowatts', int)
        mileage = validate_and_convert_param('mileage', 'mileage', int)
        year = validate_and_convert_param('year', 'year', int)
        transmission = validate_and_convert_param('transmission', 'transmission', int)
        type = validate_and_convert_param('type', 'type', int)

        prediction, filtered_data = filter_and_predict(
            audi_all_columns, audi_model, displacement, kilowatts, mileage, year, transmission, type
        )

        return jsonify({'model': prediction, 'cars': filtered_data})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

@app.route('/skoda', methods=['GET'])
def skoda():
    try:
        displacement = validate_and_convert_param('displacement', 'displacement', float)
        kilowatts = validate_and_convert_param('kilowatts', 'kilowatts', int)
        mileage = validate_and_convert_param('mileage', 'mileage', int)
        year = validate_and_convert_param('year', 'year', int)
        transmission = validate_and_convert_param('transmission', 'transmission', int)
        type = validate_and_convert_param('type', 'type', int)

        prediction, filtered_data = filter_and_predict(
            skoda_all_columns, skoda_model, displacement, kilowatts, mileage, year, transmission, type
        )

        return jsonify({'model': prediction, 'cars': filtered_data})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/car-stats', methods=['GET'])
def car_stats():

    count1 = volkswagen_all_columns.shape[0]
    count2 = audi_all_columns.shape[0]
    count3 = skoda_all_columns.shape[0]

    data = {
        "labels": ["Volkswagen", "Audi", "Škoda"],
        "values": [count1, count2, count3]
    }
    return jsonify(data)

@app.route('/api/car-stats4', methods=['GET'])
def car_stats4():

    label_list = []
    value_list = []

    for type in volkswagen_all_columns["type"].unique():
        count = volkswagen_all_columns[volkswagen_all_columns["type"]==type].shape[0]
        value_list.append(count)
        label_list.append(type)

    data = {
        "labels": label_list,
        "values": value_list
    }
    return jsonify(data)

@app.route('/api/car-stats5', methods=['GET'])
def car_stats5():

    label_list = []
    value_list = []

    for type in audi_all_columns["type"].unique():
        count = audi_all_columns[audi_all_columns["type"]==type].shape[0]
        value_list.append(count)
        label_list.append(type)

    data = {
        "labels": label_list,
        "values": value_list
    }
    return jsonify(data)

@app.route('/api/car-stats6', methods=['GET'])
def car_stats6():

    label_list = []
    value_list = []

    for type in skoda_all_columns["type"].unique():
        count = skoda_all_columns[skoda_all_columns["type"]==type].shape[0]
        value_list.append(count)
        label_list.append(type)

    data = {
        "labels": label_list,
        "values": value_list
    }
    return jsonify(data)

@app.route('/api/car-stats2', methods=['GET'])
def car_stats2():
    filtered_df = all_cars[all_cars['price'] <= 1_000_000]

    volkswagen_data = filtered_df[filtered_df['manufacturer'] == 'Volkswagen']['price']
    audi_data = filtered_df[filtered_df['manufacturer'] == 'Audi']['price']
    skoda_data = filtered_df[filtered_df['manufacturer'] == 'Škoda']['price']

    kde_volkswagen = gaussian_kde(volkswagen_data)
    kde_audi = gaussian_kde(audi_data)
    kde_skoda = gaussian_kde(skoda_data)

    price_points = np.arange(5000, 100001, 5000)

    scale_factor = 1e5  

    label_data = []
    volkswagen_data = []
    audi_data = []
    skoda_data = []

    for x_point in price_points:
        y_point_volkswagen = kde_volkswagen(x_point)[0] * scale_factor
        y_point_audi = kde_audi(x_point)[0] * scale_factor
        y_point_skoda = kde_skoda(x_point)[0] * scale_factor
    
        data_entry1 = str(x_point)
        label_data.append(data_entry1)

        data_entry2 = round(y_point_volkswagen, 2)
        volkswagen_data.append(data_entry2)

        data_entry3 = round(y_point_audi, 2)
        audi_data.append(data_entry3)

        data_entry4 = round(y_point_skoda, 2)
        skoda_data.append(data_entry4)
    
    labels = []
    for x in range(20):
        labels.append(label_data[x])
    
    volkswagens = []
    for x in range(20):
        volkswagens.append(volkswagen_data[x])
    
    audis = []
    for x in range(20):
        audis.append(audi_data[x])
    
    skodas = []
    for x in range(20):
        skodas.append(skoda_data[x])

    data = {
        "labels": labels,
        "volkswagen": volkswagens,
        "audi": audis,
        "skoda": skodas
    }

    return jsonify(data)

@app.route('/api/car-stats3', methods=['GET'])
def car_stats3():
    x_axis = request.args.get('x_axis', 'year').lower() 
    
    x_axis_mapping = {
        'year': 'year',
        'kilowatts': 'kilowatts',
        'mileage': 'mileage',
        'displacement': 'displacement',
        'transmission': 'transmission', 
        'type': 'type'
    }
    
    if x_axis not in x_axis_mapping:
        return jsonify({'error': 'Invalid x_axis parameter'}), 400
    
    x_axis_column = x_axis_mapping[x_axis]
    
    filtered_df = all_cars[all_cars['price'] <= 1_000_000]

    def get_stats_by_manufacturer(manufacturer):
        manufacturer_df = filtered_df[filtered_df['manufacturer'] == manufacturer]
        return manufacturer_df[x_axis_column].describe().round(2).to_dict()

    volkswagen_stats = get_stats_by_manufacturer('Volkswagen')
    audi_stats = get_stats_by_manufacturer('Audi')
    skoda_stats = get_stats_by_manufacturer('Škoda')
    
    if x_axis in ['transmission', 'type']:
        x_values = sorted(filtered_df[x_axis_column].unique())
        binned_x_values = x_values 
        bin_size = None  
    else:
        x_values = sorted(filtered_df[x_axis_column].unique())
        if len(x_values) > 30 and x_axis in ['kilowatts', 'mileage', 'displacement']:
            bin_edges = np.linspace(min(x_values), max(x_values), num=31) 
            binned_x_values = []
            bin_size = bin_edges[1] - bin_edges[0]  
            for i in range(len(bin_edges) - 1):
                bin_range_values = [x for x in x_values if bin_edges[i] <= x < bin_edges[i + 1]]
                if bin_range_values:
                    avg_x_value = np.mean(bin_range_values)
                    if x_axis == 'kilowatts':
                        rounded_value = int(np.ceil(avg_x_value / 5) * 5)
                    elif x_axis == 'mileage':
                        rounded_value = int(np.ceil(avg_x_value / 1000) * 1000)
                    elif x_axis == 'displacement':
                        rounded_value = round(avg_x_value, 1)
                    binned_x_values.append(rounded_value)
        else:
            binned_x_values = sorted(x_values)
            bin_size = None  
    
    filtered_labels = []
    volkswagen_prices = []
    audi_prices = []
    skoda_prices = []

    for x_value in binned_x_values:
        if bin_size and x_axis in ['kilowatts', 'mileage', 'displacement']:
            filtered_data = filtered_df[(filtered_df[x_axis_column] >= x_value - bin_size / 2) & 
                                        (filtered_df[x_axis_column] < x_value + bin_size / 2)]
        else:
            filtered_data = filtered_df[filtered_df[x_axis_column] == x_value]
        
        volkswagen_avg_price = filtered_data[filtered_data['manufacturer'] == 'Volkswagen']['price'].mean()
        audi_avg_price = filtered_data[filtered_data['manufacturer'] == 'Audi']['price'].mean()
        skoda_avg_price = filtered_data[filtered_data['manufacturer'] == 'Škoda']['price'].mean()

        if (not pd.isna(volkswagen_avg_price) and volkswagen_avg_price != 0) or \
           (not pd.isna(audi_avg_price) and audi_avg_price != 0) or \
           (not pd.isna(skoda_avg_price) and skoda_avg_price != 0):
            filtered_labels.append(str(x_value))  
            volkswagen_prices.append(round(volkswagen_avg_price if not pd.isna(volkswagen_avg_price) else 0, 2))
            audi_prices.append(round(audi_avg_price if not pd.isna(audi_avg_price) else 0, 2))
            skoda_prices.append(round(skoda_avg_price if not pd.isna(skoda_avg_price) else 0, 2))

    data = {
        "labels": filtered_labels, 
        "volkswagen": volkswagen_prices,
        "audi": audi_prices,
        "skoda": skoda_prices,
        "stats": {
            "volkswagen": volkswagen_stats,
            "audi": audi_stats,
            "skoda": skoda_stats
        }
    }

    return jsonify(data)


@app.route('/<manufacturer>/models', methods=['GET'])
def get_models_by_manufacturer(manufacturer):
    manufacturer = manufacturer.lower()

    if manufacturer == 'volkswagen':
        models = volkswagen_all_columns['model'].unique().tolist()
    elif manufacturer == 'audi':
        models = audi_all_columns['model'].unique().tolist()
    elif manufacturer == 'skoda':
        models = skoda_all_columns['model'].unique().tolist()
    else:
        return jsonify({'error': 'Manufacturer not found'}), 404

    return jsonify({'models': models})

@app.route('/filter-options', methods=['GET'])
def filter_options():
    try:
        manufacturer = request.args.get('manufacturer', '').lower()

        models = request.args.get('models', '').split(',')
        if not models:
            return jsonify({'error': 'No models provided'}), 400

        df = get_dataset_by_manufacturer(manufacturer)

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

@app.route('/default-filter-options', methods=['GET'])
def default_filter_options():
    try:
        doors = all_cars['doors'].unique().tolist()
        fuel = all_cars['fuel'].unique().tolist()
        color = all_cars['color'].unique().tolist()
        transmission = all_cars['transmission'].unique().tolist()
        models = all_cars['model'].unique().tolist()

        return jsonify({
            'doors': doors,
            'fuel': fuel,
            'color': color,
            'transmission': transmission,
            'models': models
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
        navigation = request.args.get('navigation', '').upper()  == 'TRUE'
        registration = request.args.get('registration', '').upper() == 'TRUE'
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 12))

        print(f"Parameters: {request.args}")

        df = get_dataset_by_manufacturer(manufacturer)

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
        if cruise_control in ['TRUE', 'FALSE']:
            df = df[df['cruiseControl'] == (cruise_control == 'TRUE')]
        if air_condition in ['TRUE', 'FALSE']:
            df = df[df['airCondition'] == (air_condition == 'TRUE')]
        if navigation in ['TRUE', 'FALSE']:
            df = df[df['navigation'] == (navigation == 'TRUE')]
        if registration in ['TRUE', 'FALSE']:
            df = df[df['registration'] == (registration == 'TRUE')]

        print(f"Filtered DataFrame Shape: {df.shape}")

        start = (page - 1) * limit
        end = start + limit
        filtered_data = df.iloc[start:end].to_dict(orient='records')

        return jsonify({
            'cars': filtered_data,
            'total': df.shape[0]  
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
