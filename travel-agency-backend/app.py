# backend/app.py
from flask import Flask
from config import Config
from extensions import db, jwt, cors

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicjalizacja wtyczek
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, supports_credentials=True, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",
                "http://127.0.0.1:3000"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    # Rejestracja Blueprintów (Modułów)
    from routes.tours import tours_bp
    from routes.auth import auth_bp
    from routes.reviews import reviews_bp
    from routes.cars import cars_bp
    from routes.insurances import insurance_bp
    from routes.newsletter import newsletter_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(tours_bp, url_prefix='/api/tours')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    app.register_blueprint(cars_bp, url_prefix='/api/cars')
    app.register_blueprint(insurance_bp, url_prefix='/api/insurance')
    app.register_blueprint(newsletter_bp, url_prefix='/api/newsletter')

    # Automatyczne tworzenie wszystkich tabel
    with app.app_context():
        # Importujemy modele tutaj, aby SQLAlchemy o nich wiedział przy tworzeniu
        from models.tour import Tour
        from models.user import User
        from models.review import Review
        from models.car import Car
        from models.insurance import Insurance
        from models.newsletter import Newsletter
        
        db.create_all()

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
