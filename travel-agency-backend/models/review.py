from extensions import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100))
    country = db.Column(db.String(100))
    rating = db.Column(db.Integer, nullable=False) # Ilość gwiazdek (1-5)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    
    # Opcjonalnie: Powiązanie z wycieczką (jeśli null = recenzja ogólna)
    tour_id = db.Column(db.Integer, db.ForeignKey('tours.id'), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'nickname': self.nickname,
            'location': f"{self.city}, {self.country}" if self.city and self.country else self.city,
            'rating': self.rating,
            'text': self.comment, # Mapujemy na 'text' jak w froncie
            'date': self.created_at.isoformat(),
            'tourId': self.tour_id
        }
