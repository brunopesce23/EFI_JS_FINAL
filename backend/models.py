from app import db

# INICIAMOS BASE DE DATOS

class Equipo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(100), nullable=False)
    almacenamiento = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(100), nullable=False)
    bateria = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    stock = db.Column(db.String(3), nullable=False) 
    imei = db.Column(db.String(100), nullable=False)
    accesorio = db.Column(db.String(100), nullable=False)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password_hash = db.Column(db.String(300), nullable=False)
    is_admin = db.Column(db.Boolean)

    def to_dict(self):
        return dict(
            username=self.username,
            password=self.password_hash
        )
    
