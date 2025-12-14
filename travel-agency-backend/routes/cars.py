from flask import Blueprint, request, jsonify
from extensions import db
from models.car import Car
from flask_jwt_extended import jwt_required

cars_bp = Blueprint('cars', __name__)

@cars_bp.route('', methods=['GET'])
def get_cars():
    # Admin widzi wszystkie, user tylko aktywne i niezarezerwowane
    show_all = request.args.get('show_all', 'false') == 'true'
    
    query = Car.query
    
    if not show_all:
        # Logika dla klienta: Auto musi być aktywne i NIE zarezerwowane
        query = query.filter_by(is_active=True, is_reserved=False)
        
        # Filtrowanie (kategoria, skrzynia biegów)
        category = request.args.get('category')
        if category:
            query = query.filter_by(category=category)

    cars = query.all()
    return jsonify([car.to_dict() for car in cars])

@cars_bp.route('', methods=['POST'])
@jwt_required()
def add_car():
    data = request.json
    try:
        new_car = Car(
            brand=data['brand'],
            model=data['model'],
            category=data.get('category', 'Economy'),
            price_per_day=data['price'],
            seats=data.get('seats', 4),
            transmission=data.get('transmission', 'Manual'),
            image_url=data.get('image', ''),
            features=','.join(data.get('features', [])), # Zapisujemy listę jako string
            is_active=data.get('isActive', True),
            is_reserved=data.get('isReserved', False)
        )
        db.session.add(new_car)
        db.session.commit()
        return jsonify(new_car.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Endpoint do zmiany statusu rezerwacji (np. po wynajęciu)
@cars_bp.route('/<int:id>/status', methods=['PATCH'])
@jwt_required()
def update_car_status(id):
    car = Car.query.get_or_404(id)
    data = request.json
    
    if 'isReserved' in data:
        car.is_reserved = data['isReserved']
    if 'isActive' in data:
        car.is_active = data['isActive']
        
    db.session.commit()
    return jsonify(car.to_dict())
