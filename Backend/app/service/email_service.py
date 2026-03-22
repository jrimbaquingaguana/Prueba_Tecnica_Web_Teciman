import os
import re
import base64
import requests
from .csv_service import CSVService

class EmailService:
    @staticmethod
    def is_valid_email(email):
        pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
        return re.match(pattern, email) is not None

    @staticmethod
    def send_records(recipient):
        if not EmailService.is_valid_email(recipient):
            raise Exception("El correo electrónico no es válido.")

        csv_data = CSVService.generate_csv()

        url = "https://send.api.mailtrap.io/api/send"
        token = os.getenv("MAILTRAP_API_TOKEN")
        sender_email = os.getenv("MAIL_DEFAULT_SENDER")
        sender_name = os.getenv("MAIL_DEFAULT_SENDER_NAME", "Mailtrap Test")

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }

        encoded_csv = base64.b64encode(csv_data.encode("utf-8")).decode("utf-8")

        payload = {
            "from": {
                "email": sender_email,
                "name": sender_name
            },
            "to": [
                {
                    "email": recipient
                }
            ],
            "subject": "Wine Analysis Records",
            "text": "Adjunto se envía el archivo CSV con los registros de análisis.",
            "category": "Integration Test",
            "attachments": [
                {
                    "filename": "records.csv",
                    "content": encoded_csv,
                    "type": "text/csv",
                    "disposition": "attachment"
                }
            ]
        }

        response = requests.post(url, headers=headers, json=payload, timeout=30)

        if response.status_code not in (200, 201):
            raise Exception(f"Mailtrap error: {response.status_code} - {response.text}")

        return response.json()