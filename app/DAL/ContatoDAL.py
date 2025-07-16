from DAL.BaseDAL import BaseDAL
from Model.ContatoModel import ContatoModel
from typing import List
from dataclasses import dataclass

@dataclass
class PublicadorDAL(BaseDAL):
    def cadastrar(self, contato: ContatoModel):
        try:
            with BaseDAL() as conexao:
                conexao.execute(
                "insert into contato (nome, email, assunto, telefone, segmento, mensagem, data_contato) values (?, ?,?,?,?,?,?);",
                (contato.nome, contato.email, contato.assunto, contato.telefone, contato.segmento, contato.mensagem, contato.data_contato)
                )
        except Exception as excessao:
            raise(excessao)