from flask import Blueprint, request, jsonify
from extensions import db
from models.tour import Tour
from flask_jwt_extended import jwt_required
from datetime import datetime
from sqlalchemy import cast, Integer, or_

tours_bp = Blueprint('tours', __name__)

@tours_bp.route('', methods=['GET'])
def get_tours():
    search_query = request.args.get('q', '').strip()
    start_date = request.args.get('startDate')
    end_date = request.args.get('endDate')
    guests = request.args.get('guests')
    is_admin = request.args.get('admin', 'false') == 'true'
    only_featured = request.args.get('featured', 'false') == 'true'
    
    query = Tour.query

    if not is_admin:
        query = query.filter(Tour.is_active == True)

    if only_featured:
        query = query.filter(Tour.is_featured == True)

    if search_query:
        search_term = f"%{search_query}%"
        query = query.filter(
            or_(
                Tour.title.ilike(search_term),
                Tour.location.ilike(search_term)
            )
        )

    if start_date and start_date != '':
        try:
            date_obj = datetime.strptime(start_date, '%Y-%m-%d').date()
            query = query.filter(Tour.start_date >= date_obj)
        except ValueError:
            print(f"Invalid start_date format: {start_date}")

    if end_date and end_date != '':
        try:
            date_obj = datetime.strptime(end_date, '%Y-%m-%d').date()
            query = query.filter(Tour.end_date <= date_obj)
        except ValueError:
             print(f"Invalid end_date format: {end_date}")

    if guests and guests != '':
        try:
            guests_int = int(guests)
            query = query.filter(cast(Tour.group_size, Integer) >= guests_int)
        except ValueError:
            pass

    tours = query.order_by(Tour.start_date.asc()).all()
    
    return jsonify([t.to_dict() for t in tours])

@tours_bp.route('/<int:id>', methods=['GET'])
def get_tour(id):
    tour = Tour.query.get_or_404(id)
    return jsonify(tour.to_dict())

@tours_bp.route('', methods=['POST'])
@jwt_required()
def add_tour():
    data = request.json
    try:
        s_date = None
        if data.get('startDate'):
            s_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date()
            
        e_date = None
        if data.get('endDate'):
            e_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date()

        new_tour = Tour(
            title=data['title'],
            description=data.get('description', ''),
            price=data['price'],
            duration=data.get('duration', '1 day'),
            group_size=data.get('groupSize', '10'),
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
        print(f"Error adding tour: {e}")
        return jsonify({'error': str(e)}), 400

@tours_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_tour(id):
    tour = Tour.query.get_or_404(id)
    data = request.json

    if 'title' in data: tour.title = data['title']
    if 'price' in data: tour.price = data['price']
    if 'description' in data: tour.description = data['description']
    if 'image' in data: tour.image_url = data['image']
    if 'duration' in data: tour.duration = data['duration']
    if 'groupSize' in data: tour.group_size = data['groupSize']
    if 'location' in data: tour.location = data['location']
    if 'region' in data: tour.region = data['region']
    if 'isActive' in data: tour.is_active = data['isActive']
    if 'featured' in data: tour.is_featured = data['featured']
    if 'rating' in data: tour.rating = data['rating']

    if 'startDate' in data:
        if data['startDate']:
            try:
                tour.start_date = datetime.strptime(data['startDate'], '%Y-%m-%d').date()
            except ValueError:
                pass
        else:
            tour.start_date = None

    if 'endDate' in data:
        if data['endDate']:
            try:
                tour.end_date = datetime.strptime(data['endDate'], '%Y-%m-%d').date()
            except ValueError:
                pass
        else:
            tour.end_date = None

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
