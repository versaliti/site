from flask import Flask
from config import Config
import mysql.connector
from mysql.connector import Error

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    try:
        app.db = mysql.connector.connect(
            host=app.config['DB_HOST'],
            user=app.config['DB_USER'],
            password=app.config['DB_PASSWORD'],
            database=app.config['DB_NAME']
        )
        print("✔ Conectado ao banco de dados com sucesso.")
    except Error as e:
        print(f"❌ Erro ao conectar ao banco de dados: {e}")
        app.db = None

    # Registro das rotas via Blueprint
    from .routes import main
    app.register_blueprint(main)

    return app
