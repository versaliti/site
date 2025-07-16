import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

class BaseDAL:
    def __init__(self):
        self.__conexao = None
        self.__cursor = None

    def __enter__(self):
        try:
            self.__conexao = mysql.connector.connect(
                host=os.getenv("DB_HOST"),
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                database=os.getenv("DB_NAME")
            )
            self.__cursor = self.__conexao.cursor(dictionary=True)
            # self.__criarBanco()
            return self.__cursor

        except Error as e:
            print(f"Erro ao conectar ao banco MySQL: {e}")
            raise

    def __exit__(self, exc_type, exc_value, traceback):
        if self.__cursor:
            self.__cursor.close()
        if self.__conexao:
            self.__conexao.commit()
            self.__conexao.close()

        if exc_type or exc_value or traceback:
            print(f"Erro: {exc_type}, {exc_value}")

    # def __criarBanco(self):
    #     self.__cursor.execute(
    #         """
    #         CREATE TABLE IF NOT EXISTS contato (
    #             id INT AUTO_INCREMENT PRIMARY KEY,
    #             nome VARCHAR(100) NOT NULL,
    #             email VARCHAR(100) NOT NULL,
    #             assunto VARCHAR(100) NOT NULL,
    #             telefone VARCHAR(30) NOT NULL,
    #             segmento VARCHAR(100) NOT NULL,
    #             mensagem TEXT NOT NULL
    #         );
    #         """
    #     )
