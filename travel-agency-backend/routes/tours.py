from flask import Blueprint, request, jsonify
from extensions import db
from models.tour import Tour
from flask_jwt_extended import jwt_required
from datetime import datetime

tours_bp = Blueprint('tours', __name__)

# --- PUBLICZNE ---

@tours_bp.route('', methods=['GET'])
def get_tours():
    # Pobieranie parametrów z URL (query string)
    search_query = request.args.get('q', '').strip()
    start_date = request.args.get('startDate')
    end_date = request.args.get('endDate')
    guests = request.args.get('guests', type=int)
    
    query = Tour.query

    if search_query:
        search_term = f"%{search_query}%"
        query = query.filter(
            (Tour.title.ilike(search_term)) | 
            (Tour.location.ilike(search_term))
        )

    if start_date:
        try:
            date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
            query = query.filter(Tour.start_date >= date_obj)
        except ValueError:
            pass

    if end_date:
        try:
            date_obj = datetime.strptime(end_date, '%Y-%m-%d').date()
            query = query.filter(Tour.end_date <= date_obj)
        except ValueError:
            pass

    if guests:
        pass 

    tours = query.order_by(Tour.start_date.asc()).all()
    
    return jsonify([t.to_dict() for t in tours])

@tours_bp.route('/<int:id>', methods=['GET'])
def get_tour(id):
    tour = Tour.query.get_or_404(id)
    return jsonify(tour.to_dict())

# --- PRYWATNE (ADMIN) ---

@tours_bp.route('', methods=['POST'])
@jwt_required()
def add_tour():
    data = request.json
    try:
        # Parsowanie daty jeśli podana
        s_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date() if 'startDate' in data else None
        e_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date() if 'endDate' in data else None

        new_tour = Tour(
            title=data['title'],
            description=data.get('description', ''),
            price=data['price'],
            duration=data.get('duration', '1 day'),
            group_size=data.get('groupSize', 'Any'),
            rating=data.get('rating', 0.0),
            reviews_count=data.get('reviews', 0),
            image_url=data.get('image', ''),
            location=data.get('location', ''),
            region=data.get('region', 'europe'),
            is_featured=data.get('featured', False),
            is_active=data.get('isActive', True),
            start_date=s_date,
            end_date=e_date
        )
        db.session.add(new_tour)
        db.session.commit()
        return jsonify(new_tour.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@tours_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_tour(id):
    tour = Tour.query.get_or_404(id)
    data = request.json

    # Aktualizujemy pola tylko jeśli przyszły w żądaniu
    if 'title' in data:
        tour.title = data['title']
    if 'price' in data:
        tour.price = data['price']
    if 'description' in data:
        tour.description = data['description']
    if 'image' in data:
        tour.image_url = data['image']
    if 'duration' in data:
        tour.duration = data['duration']
    
    # Tutaj jest pies pogrzebany - mapowanie nazw z Reacta na Pythona
    if 'groupSize' in data:
        tour.group_size = data['groupSize']
    if 'isActive' in data:
        tour.is_active = data['isActive']
    if 'featured' in data:
        tour.is_featured = data['featured']
    if 'rating' in data:
        tour.rating = data['rating']

    # Obsługa dat (musimy zamienić string na obiekt date)
    if 'startDate' in data and data['startDate']:
        try:
            tour.start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date()
        except ValueError:
            pass
            
    if 'endDate' in data and data['endDate']:
        try:
            tour.end_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date()
        except ValueError:
            pass

    try:
        db.session.commit()
        return jsonify(tour.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@tours_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_tour(id):
    tour = Tour.query.get_or_404(id)
    db.session.delete(tour)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'})