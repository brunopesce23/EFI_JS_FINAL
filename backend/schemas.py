from app import ma
from marshmallow import validates, ValidationError
from models import User, Equipo

# Esquema para el modelo User
class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    id = ma.auto_field()
    username = ma.auto_field()
    password_hash = ma.auto_field()
    is_admin = ma.auto_field()

class UserMinimalSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    username = ma.auto_field()

class EquipoSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Equipo

    id = ma.auto_field()
    modelo = ma.auto_field()
    almacenamiento = ma.auto_field()
    color = ma.auto_field()
    bateria = ma.auto_field()
    precio = ma.auto_field()
    stock = ma.auto_field()
    imei = ma.auto_field()
    accesorio = ma.auto_field()

class EquipoMinimalSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Equipo

    modelo = ma.auto_field()

    @validates('precio')
    def validate_precio(self, value):
        if value < 0:
            raise ValidationError("El precio no puede ser negativo.")
