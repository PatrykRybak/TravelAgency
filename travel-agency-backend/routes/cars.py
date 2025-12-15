from flask import Blueprint, request, jsonify
from extensions import db
from models.car import Car

cars_bp = Blueprint('cars', __name__)

@cars_bp.route('', methods=['GET'])
def get_cars():
    # Pobieramy tylko aktywne dla klienta, wszystkie dla admina
    admin_request = request.args.get('admin', 'false') == 'true'
    
    query = Car.query
    if not admin_request:
        query = query.filter_by(is_active=True)
        
    cars = query.order_by(Car.price_per_day.asc()).all()
    return jsonify([c.to_dict() for c in cars])

@cars_bp.route('', methods=['POST'])
def create_car():
    data = request.json
    new_car = Car(
        name=data['name'],
        category=data['category'],
        price_per_day=data['price'],
        seats=data['seats'],
        transmission=data['transmission'],
        image_url=data.get('image', ''),
        features=data.get('features', ''), # Oczekujemy stringa "GPS,AC"
        is_active=data.get('isActive', True)
    )
    db.session.add(new_car)
    db.session.commit()
    return jsonify(new_car.to_dict()), 201

@cars_bp.route('/<int:id>', methods=['PUT'])
def update_car(id):
    car = Car.query.get_or_404(id)
    data = request.json
    
    car.name = data.get('name', car.name)
    car.category = data.get('category', car.category)
    car.price_per_day = data.get('price', car.price_per_day)
    car.seats = data.get('seats', car.seats)
    car.transmission = data.get('transmission', car.transmission)
    car.image_url = data.get('image', car.image_url)
    car.features = data.get('features', car.features)
    car.is_active = data.get('isActive', car.is_active)
    
    db.session.commit()
    return jsonify(car.to_dict())

@cars_bp.route('/<int:id>', methods=['DELETE'])
def delete_car(id):
    car = Car.query.get_or_404(id)
    db.session.delete(car)
    db.session.commit()
    return jsonify({'message': 'Car deleted'})
