from app.model.record_model import Record
from app.repositories.record_repository import RecordRepository

class RecordService:
    @staticmethod
    def create_record(data):
        record = Record(
            ethanol=data["ethanol"],
            glucose=data["glucose"],
            fructose=data["fructose"],
            titratable_acidity=data["titratable_acidity"],
            volatile_acids=data["volatile_acids"],
            malic_acid=data["malic_acid"],
            tartaric_acid=data["tartaric_acid"],
            lactic_acid=data["lactic_acid"],
            ph=data["ph"],
            density=data["density"],
            must_weight_brix=data["must_weight_brix"],
            extract=data["extract"],
            glycerol=data["glycerol"],
            yeast_assimilable_nitrogen=data["yeast_assimilable_nitrogen"]
        )
        return RecordRepository.save(record)

    @staticmethod
    def get_records():
        return RecordRepository.get_all()