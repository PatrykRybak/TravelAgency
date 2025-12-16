from flask import Blueprint, request, jsonify
from extensions import db
from models.user import User
from flask_jwt_extended import (
    create_access_token, 
    jwt_required,
    set_access_cookies, 
    unset_jwt_cookies,
    get_jwt_identity
)

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'User already exists'}), 400
        
    new_user = User(username=data['username'])
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User created'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data.get('username')).first()
    
    if user and user.check_password(data.get('password')):

        access_token = create_access_token(identity=str(user.id))
        
        response = jsonify({"message": "Login successful"})
        set_access_cookies(response, access_token)
        return response, 200
        
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Successfully logged out"})
    unset_jwt_cookies(response)
    return response, 200

@auth_bp.route('/check', methods=['GET'])
@jwt_required()
def check_auth():
    current_user_id = get_jwt_identity()
    return jsonify({"status": "authenticated", "userId": current_user_id}), 200
