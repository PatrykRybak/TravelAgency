from extensions import db

class Car(db.Model):
    __tablename__ = 'cars'
    
    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(100), nullable=False) # np. Toyota
    model = db.Column(db.String(100), nullable=False) # np. Yaris
    category = db.Column(db.String(50)) # Economy, SUV, Luxury
    price_per_day = db.Column(db.Numeric(10, 2), nullable=False)
    seats = db.Column(db.Integer)
    transmission = db.Column(db.String(20)) # Automatic, Manual
    image_url = db.Column(db.Text)
    features = db.Column(db.Text) # Przechowujemy jako tekst po przecinku lub JSON
    
    # Logika dostępności
    is_reserved = db.Column(db.Boolean, default=False) # Czy auto jest aktualnie zajęte
    is_active = db.Column(db.Boolean, default=True)    # Czy auto w ogóle jest w ofercie (admin hide)

    def to_dict(self):
        return {
            'id': self.id,
            'name': f"{self.brand} {self.model}",
            'category': self.category,
            'price': float(self.price_per_day),
            'seats': self.seats,
            'transmission': self.transmission,
            'image': self.image_url,
            'features': self.features.split(',') if self.features else [],
            'isReserved': self.is_reserved,
            'isActive': self.is_active
        }
