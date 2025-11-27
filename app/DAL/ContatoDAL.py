from app.DAL.BaseDAL import BaseDAL
from app.Model.ContatoModel import ContatoModel
from typing import List
from dataclasses import dataclass

@dataclass
class ContatoDAL(BaseDAL):
    def cadastrar(self, contato: ContatoModel):
        try:
            with BaseDAL() as conexao:
                conexao.execute(
                "insert into contato (nome, email, assunto, telefone, segmento, mensagem, data_contato) values (%s, %s,%s,%s,%s,%s,%s);",
                (contato.nome, contato.email, contato.assunto, contato.telefone, contato.segmento, contato.mensagem, contato.data_contato)
                )
        except Exception as excessao:
            raise(excessao)