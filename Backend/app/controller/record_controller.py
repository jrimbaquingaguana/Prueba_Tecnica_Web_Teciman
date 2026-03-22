from flask import Blueprint, request, jsonify
from app.service.record_service import RecordService
from app.service.email_service import EmailService

record_bp = Blueprint("record_bp", __name__)

@record_bp.route("/", methods=["POST"])
def create_record():
    data = request.get_json()
    record = RecordService.create_record(data)

    return jsonify({
        "message": "Record created successfully",
        "id": record.id
    }), 201

@record_bp.route("/", methods=["GET"])
def get_records():
    records = RecordService.get_records()

    return jsonify([
        {
            "id": r.id,
            "ethanol": r.ethanol,
            "glucose": r.glucose,
            "fructose": r.fructose,
            "titratable_acidity": r.titratable_acidity,
            "volatile_acids": r.volatile_acids,
            "malic_acid": r.malic_acid,
            "tartaric_acid": r.tartaric_acid,
            "lactic_acid": r.lactic_acid,
            "ph": r.ph,
            "density": r.density,
            "must_weight_brix": r.must_weight_brix,
            "extract": r.extract,
            "glycerol": r.glycerol,
            "yeast_assimilable_nitrogen": r.yeast_assimilable_nitrogen,
            "created_at": r.created_at.isoformat() if r.created_at else None
        }
        for r in records
    ]), 200

@record_bp.route("/send-email", methods=["POST"])
def send_email():
    try:
        data = request.get_json()
        recipient_email = data.get("email", "").strip() if data else ""

        if not recipient_email:
            return jsonify({
                "message": "El correo de destino es obligatorio."
            }), 400

        result = EmailService.send_records(recipient_email)

        return jsonify({
            "message": "Email sent successfully",
            "provider_response": result
        }), 200
    except Exception as e:
        return jsonify({
            "message": "No se pudo enviar el email",
            "error": str(e)
        }), 500