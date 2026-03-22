from datetime import datetime
from app.extensions import db

class Record(db.Model):
    __tablename__ = "records"

    id = db.Column(db.Integer, primary_key=True)
    ethanol = db.Column(db.Float, nullable=False)
    glucose = db.Column(db.Float, nullable=False)
    fructose = db.Column(db.Float, nullable=False)
    titratable_acidity = db.Column(db.Float, nullable=False)
    volatile_acids = db.Column(db.Float, nullable=False)
    malic_acid = db.Column(db.Float, nullable=False)
    tartaric_acid = db.Column(db.Float, nullable=False)
    lactic_acid = db.Column(db.Float, nullable=False)
    ph = db.Column(db.Float, nullable=False)
    density = db.Column(db.Float, nullable=False)
    must_weight_brix = db.Column(db.Float, nullable=False)
    extract = db.Column(db.Float, nullable=False)
    glycerol = db.Column(db.Float, nullable=False)
    yeast_assimilable_nitrogen = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)