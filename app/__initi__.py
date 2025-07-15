from flask import Flask
from config import Config
import mysql.connector

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Conexão com o banco
    app.db = mysql.connector.connect(
        host=app.config['DB_HOST'],
        user=app.config['DB_USER'],
        password=app.config['DB_PASSWORD'],
        database=app.config['DB_NAME']
    )

    from .routes import main
    app.register_blueprint(main)

    return app