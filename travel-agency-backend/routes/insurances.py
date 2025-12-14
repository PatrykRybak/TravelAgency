from flask import Blueprint, request, jsonify
from extensions import db
from models.insurance import Insurance
from flask_jwt_extended import jwt_required

insurance_bp = Blueprint('insurances', __name__)

@insurance_bp.route('', methods=['GET'])
def get_insurances():
    plans = Insurance.query.all()
    return jsonify([plan.to_dict() for plan in plans])

@insurance_bp.route('', methods=['POST'])
@jwt_required()
def add_insurance():
    data = request.json
    try:
        new_plan = Insurance(
            name=data['name'],
            price_daily=data['price'],
            description=data.get('description', ''),
            image_url=data.get('image', ''),
            features=data.get('features', ''),
            is_featured=data.get('featured', False)
        )
        db.session.add(new_plan)
        db.session.commit()
        return jsonify(new_plan.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
