from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    migrate.init_app(app, db)

    from .model.record_model import Record
    from .controller.record_controller import record_bp

    app.register_blueprint(record_bp, url_prefix="/api/records")

    return app