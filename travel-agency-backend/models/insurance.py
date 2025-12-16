from extensions import db

class Insurance(db.Model):
    __tablename__ = 'insurances'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price_daily = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.Text)
    features = db.Column(db.Text)
    is_featured = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': float(self.price_daily),
            'description': self.description,
            'image': self.image_url,
            'features': self.features, 
            'featured': self.is_featured
        }
