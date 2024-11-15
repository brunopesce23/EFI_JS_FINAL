from flask import Blueprint, request, make_response, jsonify
from app import db
from models import Equipo
from schemas import EquipoSchema

equipo_bp = Blueprint('equipos_api', __name__)


@equipo_bp.route('/equipos', methods=['GET', 'POST'])
def equipos():
    if request.method == 'POST':
        data = request.get_json()
        errors = EquipoSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        
        nuevo_equipo = Equipo(
            modelo=data.get('modelo'),
            almacenamiento=data.get('almacenamiento'),
            color=data.get('color'),
            bateria=data.get('bateria'),
            precio=data.get('precio'),
            stock=data.get('stock'),
            imei=data.get('imei'),
            accesorio=data.get('accesorio')
        )
        
        db.session.add(nuevo_equipo)
        db.session.commit()
        return jsonify(EquipoSchema().dump(nuevo_equipo)), 201

    equipos = Equipo.query.all()
    return jsonify(EquipoSchema().dump(equipos, many=True))
