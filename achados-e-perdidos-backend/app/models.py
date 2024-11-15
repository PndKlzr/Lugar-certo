from app import db

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    date_found = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)

    def __repr__(self):
        return f'<Item {self.name}>'

    # Método que converte o objeto em um dicionário
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'date_found': self.date_found,
            'status': self.status,
            'image_url': self.image_url
        }
