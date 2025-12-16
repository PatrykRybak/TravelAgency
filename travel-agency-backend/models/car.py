from extensions import db
from datetime import datetime

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    price_per_day = db.Column(db.Float, nullable=False)
    seats = db.Column(db.Integer, nullable=False)
    transmission = db.Column(db.String(20), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    features = db.Column(db.Text, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'price': self.price_per_day,
            'seats': self.seats,
            'transmission': self.transmission,
            'image': self.image_url,
            'features': self.features.split(',') if self.features else [],
            'isActive': self.is_active
        }
