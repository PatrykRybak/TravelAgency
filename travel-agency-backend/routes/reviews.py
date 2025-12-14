from flask import Blueprint, request, jsonify
from extensions import db
from models.review import Review
from flask_jwt_extended import jwt_required

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('', methods=['GET'])
def get_reviews():
    # Opcjonalnie filtr po tour_id
    tour_id = request.args.get('tour_id')
    if tour_id:
        reviews = Review.query.filter_by(tour_id=tour_id).all()
    else:
        reviews = Review.query.all()
    return jsonify([r.to_dict() for r in reviews])

@reviews_bp.route('', methods=['POST'])
def add_review():
    # Publiczny endpoint - każdy może dodać recenzję
    data = request.json
    try:
        new_review = Review(
            nickname=data['nickname'],
            city=data.get('city', ''),
            country=data.get('country', ''),
            rating=data['rating'],
            comment=data['comment'],
            tour_id=data.get('tourId')
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@reviews_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required() # Tylko admin usuwa recenzje
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted'})
