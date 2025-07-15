from datetime import date
from DAL.PublicadorDAL import PublicadorDAL
from Model.ContatoModel import ContatoModel

class PublicadorBLL:
    def cadastrar(self, nome: str, data_nascimento: date, numero_celular: str, numero_emergencia: str, data_batismo:date = None, privilegio_campo: str = None, privilegio_congregacao: str = None, observacao: str = None):
        try:
            if nome is None or nome == "":
                raise Exception("O nome do publicador é obrigatório!")
            
            if data_nascimento is None:
                raise Exception("A data de nascimento é obrigatória!")
            
            if numero_celular is None or numero_celular == "":
                raise Exception("O número de celular é obrigatório e deve ter 11 caracteres!")
            
            if numero_emergencia is None or numero_emergencia == "":
                raise Exception("O número de emergencia é obrigatório e deve ter 11 caracteres!")
            
            if privilegio_campo is None or privilegio_campo == "":
                privilegio_campo = None
            
            if privilegio_congregacao is None or privilegio_congregacao == "":
                privilegio_congregacao = None
            
            if observacao is None or observacao == "":
                observacao = None
            
            publicador = PublicadorModel(
                nome=nome,
                data_nascimento=data_nascimento,
                data_batismo=data_batismo,
                numero_celular=numero_celular,
                numero_emergencia=numero_emergencia,
                privilegio_campo=privilegio_campo,
                privilegio_congregacao=privilegio_congregacao,
                observacao=observacao
            )

            PublicadorDAL().cadastrar(publicador)
            return True
        
        except Exception as excessao:
            print(excessao)
            return False