from dataclasses import dataclass

@dataclass

class ContatoModel:
    nome:                          str
    email:                         str
    assunto:                       str
    telefone:                      int
    segmento:                      str
    mensagem:                      str
    id:                            int = 0