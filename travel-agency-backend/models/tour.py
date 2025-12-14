from extensions import db
from datetime import date

class Tour(db.Model):
    __tablename__ = 'tours'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    duration = db.Column(db.String(50))
    group_size = db.Column(db.String(50))
    rating = db.Column(db.Numeric(3, 1), default=0.0)
    reviews_count = db.Column(db.Integer, default=0)
    image_url = db.Column(db.Text)
    location = db.Column(db.String(100))
    region = db.Column(db.String(50))
    is_featured = db.Column(db.Boolean, default=False)
    
    # --- NOWE POLA ---
    start_date = db.Column(db.Date, nullable=True) # Data początku
    end_date = db.Column(db.Date, nullable=True)   # Data końca
    is_active = db.Column(db.Boolean, default=True) # Czy wycieczka jest widoczna na stronie

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'price': float(self.price),
            'duration': self.duration,
            'groupSize': self.group_size,
            'rating': float(self.rating),
            'reviews': self.reviews_count,
            'image': self.image_url,
            'location': self.location,
            'region': self.region,
            'featured': self.is_featured,
            # Serializacja dat do stringa YYYY-MM-DD
            'startDate': self.start_date.isoformat() if self.start_date else None,
            'endDate': self.end_date.isoformat() if self.end_date else None,
            'isActive': self.is_active
        }
