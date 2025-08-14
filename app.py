from sqlalchemy import text
from flask import Flask, request, jsonify, render_template, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
import os
import pandas as pd
import joblib
from datetime import datetime, timedelta


MODEL_PATH = os.path.join("models", "potato_model.pkl")
SCALER_PATH = os.path.join("models", "scaler.pkl")
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH) 

def predict_potato_price(fertilizer_price, petrol_price, current_price, date, rainfall_data):
    
    date = datetime.strptime(date, '%Y-%m-%d')

    input_data = pd.DataFrame({
        'ds': [pd.to_datetime(date)],
        'Fertilizer': [fertilizer_price],
        'Petrol Price': [petrol_price],
        'District Name': [0],  
        'Lag_Price': [current_price],
        'Rainfall': [rainfall_data]
    })


    input_data = input_data.apply(pd.to_numeric, errors='coerce')
    input_data = input_data.fillna(0)


    feature_columns = ['ds', 'Fertilizer', 'Petrol Price', 'District Name', 'Lag_Price', 'Rainfall']
    input_data = input_data.reindex(columns=feature_columns, fill_value=0)


    input_data_scaled = scaler.transform(input_data)


    prediction = model.predict(input_data_scaled)

    return prediction[0]



app = Flask(__name__)
app.secret_key = "supersecretkey"  # Change this in production

# PostgreSQL Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Deba%401234@localhost/agriprophets'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# User Model
class Users(db.Model):
    username = db.Column(db.String(50), primary_key=True)  
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)  
    type = db.Column(db.String(10), nullable=False, default='user')  
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

# Create tables
with app.app_context():
    db.create_all()

# 🔹 Route: Home Page
@app.route('/')
def index():
    return render_template('index.html')

# 🔹 Route: Login Page
@app.route('/login')
def login():
    return render_template('login.html')

# 🔹 Route: Register Page
@app.route('/register')
def register():
    return render_template('register.html')

# 🔹 Route: Admin Page (Restricted)
@app.route('/admin')
def admin_page():
    if "user" not in session or session["type"] != "admin":
        return redirect(url_for("login"))
    return render_template("admin.html")

# 🔹 Route: Prediction Page (Restricted)
@app.route('/predict')
def predict():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template('predict.html')

# 🔹 Route: Report Page (Restricted)
@app.route('/report')
def report():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template('report.html')

# 🔹 Route: Check User Session (For JavaScript Validation)
@app.route('/check_session')
def check_session():
    return jsonify({'logged_in': 'user' in session})

# 🔹 Route: Handle User Login (POST)
@app.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        user = Users.query.filter_by(username=data['username']).first()
        print(data["password"],user.password_hash)
        if user.password_hash != data['password']:
            return jsonify({'message': 'Invalid username or password!'}), 401

        # Store session data
        session["user"] = user.username
        session["type"] = user.type

        # Redirect based on user type
        if user.type == 'admin':
            return jsonify({'message': 'Login successful!', 'redirect': url_for('admin_page')})
        return jsonify({'message': 'Login successful!', 'redirect': url_for('predict')})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Internal server error!',}), 500

# 🔹 Route: Handle User Logout
@app.route('/logout')
def logout():
    session.pop("user", None)
    session.pop("type", None)
    return redirect(url_for("login"))

# 🔹 Route: Handle User Registration (POST)
@app.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        if data:
            print("✅ Received Data:", data)  # Step 1: Check if data is received
        else:
            print("error")
        required_fields = ['username', 'name', 'email', 'phone', 'password']
        if not all(field in data for field in required_fields):
            print("❌ Missing required fields!")  # Debug print
            return jsonify({'message': 'Missing required fields'}), 400
        
        print("🔍 Checking if user already exists...")  # Step 2

        existing_user = Users.query.filter(
            (Users.username == data['username']) | (Users.email == data['email'])
        ).first()
        if existing_user:
            print("❌ Username or email already exists!")
            return jsonify({'message': 'Username or email already exists!'}), 409

        
        hashed_password = data['password']

        print("🆕 Creating new user...")  # Step 4
        new_user = Users(
            username=data['username'],
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            password_hash=hashed_password,
            type=data.get('type', 'user')
        )

        print("🗂️ Adding user to session...")  # Step 5
        db.session.add(new_user)

        print("✅ Committing to database...")  # Step 6
        db.session.commit()
        print("🎉 Commit successful!")

        return jsonify({'message': 'User registered successfully!'}), 201

    except Exception as e:
        print(f"🔥 Error: {e}")  # Debug print
        return jsonify({'message': 'Internal server error!'}), 500
    
@app.route('/predict_process', methods=['POST'])
def predict_process():
    try:
        data = request.get_json()
        crop_name = data.get("crop_name")

        # ✅ Get today's date as the starting point
        base_date = datetime.strptime("2024-01-01", "%Y-%m-%d")

        # ✅ Fetch Required Data from Database
        fertilizer_price = db.session.execute(text("SELECT price FROM Fertilizer LIMIT 1")).scalar()
        petrol_price = db.session.execute(text("SELECT price FROM Petrol LIMIT 1")).scalar()
        rainfall = db.session.execute(text("SELECT rainfall FROM Rain LIMIT 1")).scalar()
        lag_price = db.session.execute(text("SELECT price FROM Potato LIMIT 1")).scalar()
        db.session.commit()  # ✅ Ensure transaction is complete

        # ✅ Ensure no missing data
        if None in (fertilizer_price, petrol_price, rainfall, lag_price):
            return jsonify({"message": "Required data is missing from the database!"}), 500

        # ✅ Generate predictions for the next 7 days using recursive lag price
        predictions = []
        for i in range(7):
            future_date = (base_date + timedelta(days=i)).strftime("%Y-%m-%d")
            
            # ✅ Use the last predicted price as lag price for the next day
            predicted_price = predict_potato_price(fertilizer_price, petrol_price, lag_price, future_date, rainfall)

            if predicted_price is not None:
                predictions.append({
                    "date": future_date,
                    "prediction": round(float(predicted_price),2)
                })

                # ✅ Update lag price for the next iteration
                lag_price = predicted_price  
        print(predictions)
        return jsonify({
            "crop_name": crop_name,
            "predictions": predictions
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Internal server error!"}), 500


@app.route('/update_prices', methods=['POST'])
def update_prices():
    try:
        data = request.get_json()

        fertilizer_price = data.get("fertilizer_price")
        petrol_price = data.get("petrol_price")
        rainfall = data.get("rainfall")
        potato_price = data.get("potato_price")


        db.session.execute(text("UPDATE Fertilizer SET price = :price"), {"price": fertilizer_price})
        db.session.execute(text("UPDATE Petrol SET price = :price"), {"price": petrol_price})
        db.session.execute(text("UPDATE Rain SET rainfall = :rainfall"), {"rainfall": rainfall})
        db.session.execute(text("UPDATE Potato SET price = :price"), {"price": potato_price})

        db.session.commit()  # ✅ Save changes to database

        return jsonify({"message": "Prices updated successfully!"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error updating prices"}), 500


# Run Flask App
if __name__ == "__main__":
    app.run(debug=True)
