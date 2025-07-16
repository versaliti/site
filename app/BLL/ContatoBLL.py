from datetime import date
from DAL.ContatoDAL import ContatoDAL
from Model.ContatoModel import ContatoModel

class ContatoBLL:
    def cadastrar(self, nome: str, email: str, assunto: str, telefone: str, segmento: str, mensagem: str, data_contato:date):
        try:
            if nome is None or nome == "":
                raise Exception("O nome para contato é obrigatório!")
            
            if email is None:
                raise Exception("O email para contato é obrigatória!")
            
            if assunto is None or assunto == "":
                raise Exception("O assunto para contato é obrigatório!")
            
            if telefone is None or telefone == "":
                raise Exception("O telefone para contato é obrigatório!")
            
            if segmento is None or segmento == "":
                raise Exception("O segmento para contato é obrigatório!")
            
            if mensagem is None or mensagem == "":
                raise Exception("As informações sobre a necessidade para contato são obrigatórias!")
            
            
            contato = ContatoModel(
                nome=nome,
                email=email,
                assunto=assunto,
                telefone=telefone,
                segmento=segmento,
                mensagem=mensagem,
                data_contato=data_contato
            )

            ContatoDAL().cadastrar(contato)
            return True
        
        except Exception as excessao:
            print(excessao)
            return False