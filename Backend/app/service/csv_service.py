import csv
from io import StringIO
from app.service.record_service import RecordService

class CSVService:
    @staticmethod
    def generate_csv():
        records = RecordService.get_records()

        output = StringIO()
        writer = csv.writer(output)

        writer.writerow([
            "id",
            "ethanol",
            "glucose",
            "fructose",
            "titratable_acidity",
            "volatile_acids",
            "malic_acid",
            "tartaric_acid",
            "lactic_acid",
            "ph",
            "density",
            "must_weight_brix",
            "extract",
            "glycerol",
            "yeast_assimilable_nitrogen",
            "created_at"
        ])

        for r in records:
            writer.writerow([
                r.id,
                r.ethanol,
                r.glucose,
                r.fructose,
                r.titratable_acidity,
                r.volatile_acids,
                r.malic_acid,
                r.tartaric_acid,
                r.lactic_acid,
                r.ph,
                r.density,
                r.must_weight_brix,
                r.extract,
                r.glycerol,
                r.yeast_assimilable_nitrogen,
                r.created_at.isoformat() if r.created_at else None
            ])

        return output.getvalue()