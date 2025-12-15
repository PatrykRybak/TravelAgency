from extensions import db
from datetime import datetime

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False) # 0-5
    comment = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'city': self.city,
            'country': self.country,
            'rating': self.rating,
            'comment': self.comment,
            'isActive': self.is_active,
            'createdAt': self.created_at.isoformat()
        }
