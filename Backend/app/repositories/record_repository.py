from app.extensions import db
from app.model.record_model import Record

class RecordRepository:
    @staticmethod
    def save(record):
        db.session.add(record)
        db.session.commit()
        return record

    @staticmethod
    def get_all():
        return Record.query.order_by(Record.created_at.desc()).all()