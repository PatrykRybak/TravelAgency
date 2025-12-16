from extensions import db
from datetime import datetime

class Inquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    item_type = db.Column(db.String(20), nullable=False)
    item_id = db.Column(db.String(50), nullable=False)
    item_title = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(20), default='new')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'itemType': self.item_type,
            'itemId': self.item_id,
            'itemTitle': self.item_title,
            'status': self.status,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M')
        }
