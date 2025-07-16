from dataclasses import dataclass
from datetime import date
from datetime import datetime

@dataclass

class ContatoModel:
    nome:                          str
    email:                         str
    assunto:                       str
    telefone:                      str
    segmento:                      str
    mensagem:                      str
    data_contato:                  date
    id:                            int = 0