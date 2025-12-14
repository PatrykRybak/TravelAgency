from flask import Blueprint, request, jsonify
from extensions import db
from models.newsletter import Newsletter
from flask_jwt_extended import jwt_required

newsletter_bp = Blueprint('newsletter', __name__)

# --- PUBLICZNE: ZAPIS DO NEWSLETTERA ---
@newsletter_bp.route('/subscribe', methods=['POST'])
def subscribe():
    # Brak @jwt_required - każdy może się zapisać
    data = request.json
    
    # Sprawdzamy czy email już istnieje
    if Newsletter.query.filter_by(email=data['email']).first():
        # Zwracamy sukces nawet jak istnieje, żeby nie zdradzać bazy (security through obscurity)
        return jsonify({'message': 'Subscribed successfully'}), 200
        
    try:
        entry = Newsletter(
            email=data['email'],
            first_name=data.get('firstName', ''),
            last_name=data.get('lastName', ''),
            interests=','.join(data.get('interests', []))
        )
        db.session.add(entry)
        db.session.commit()
        return jsonify({'message': 'Subscribed successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# --- CHRONIONE (ADMIN): POBIERANIE LISTY ---
@newsletter_bp.route('', methods=['GET'])
@jwt_required()
def get_subscribers():
    subscribers = Newsletter.query.all()
    return jsonify([sub.to_dict() for sub in subscribers])

# --- CHRONIONE (ADMIN): USUWANIE ---
@newsletter_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_subscriber(id):
    subscriber = Newsletter.query.get_or_404(id)
    db.session.delete(subscriber)
    db.session.commit()
    return jsonify({'message': 'Subscriber deleted'})
