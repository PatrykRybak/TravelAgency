from extensions import db

class Insurance(db.Model):
    __tablename__ = 'insurances'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False) # Basic, Premium...
    price_daily = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.Text)
    features = db.Column(db.Text) # Lista JSON lub tekst po przecinku
    is_featured = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': float(self.price_daily),
            'description': self.description,
            'image': self.image_url,
            # Zakładamy prosty format features: "Medical:50k,Bagage:1k"
            # W prawdziwym app lepiej użyć typu JSON w bazie
            'features': self.features, 
            'featured': self.is_featured
        }
