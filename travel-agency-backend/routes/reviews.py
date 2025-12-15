from flask import Blueprint, request, jsonify
from extensions import db
from models.review import Review

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('', methods=['GET'])
def get_reviews():
    admin_request = request.args.get('admin', 'false') == 'true'
    
    if admin_request:
        reviews = Review.query.order_by(Review.created_at.desc()).all()
    else:
        reviews = Review.query.filter_by(is_active=True).order_by(Review.created_at.desc()).limit(3).all()
        
    return jsonify([r.to_dict() for r in reviews])

@reviews_bp.route('', methods=['POST'])
def create_review():
    data = request.json
    new_review = Review(
        username=data['username'],
        city=data['city'],
        country=data['country'],
        rating=data.get('rating', 5),
        comment=data['comment'],
        is_active=data.get('isActive', True)
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify(new_review.to_dict()), 201

@reviews_bp.route('/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted'})

@reviews_bp.route('/<int:id>', methods=['PUT'])
def update_review(id):
    review = Review.query.get_or_404(id)
    data = request.json
    
    review.username = data.get('username', review.username)
    review.city = data.get('city', review.city)
    review.country = data.get('country', review.country)
    review.rating = data.get('rating', review.rating)
    review.comment = data.get('comment', review.comment)
    review.is_active = data.get('isActive', review.is_active)
    
    db.session.commit()
    return jsonify(review.to_dict())
