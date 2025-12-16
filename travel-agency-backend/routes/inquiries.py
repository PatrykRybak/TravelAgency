from flask import Blueprint, request, jsonify
from extensions import db
from models.inquiry import Inquiry
from flask_jwt_extended import jwt_required

inquiries_bp = Blueprint('inquiries', __name__)

@inquiries_bp.route('', methods=['POST'])
def create_inquiry():
    data = request.json
    
    if not data.get('email') or not data.get('itemTitle'):
        return jsonify({'error': 'Missing required fields'}), 400

    new_inquiry = Inquiry(
        email=data['email'],
        item_type=data.get('type', 'unknown'),
        item_id=str(data.get('id', '0')),
        item_title=data['itemTitle'],
        status='new'
    )
    
    try:
        db.session.add(new_inquiry)
        db.session.commit()
        return jsonify(new_inquiry.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@inquiries_bp.route('', methods=['GET'])
@jwt_required()
def get_inquiries():
    inquiries = Inquiry.query.order_by(Inquiry.created_at.desc()).all()
    return jsonify([i.to_dict() for i in inquiries])

@inquiries_bp.route('/<int:id>/status', methods=['PUT'])
@jwt_required()
def update_status(id):
    inquiry = Inquiry.query.get_or_404(id)
    data = request.json
    
    if 'status' in data:
        inquiry.status = data['status']
        
    db.session.commit()
    return jsonify(inquiry.to_dict())

@inquiries_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_inquiry(id):
    inquiry = Inquiry.query.get_or_404(id)
    db.session.delete(inquiry)
    db.session.commit()
    return jsonify({'message': 'Deleted'})
