from flask import Blueprint, request, jsonify
from flask_cors import CORS
from app.BLL.ContatoBLL import ContatoBLL
from datetime import date

main = Blueprint('main', __name__)
CORS(main)

@main.route('/cadastrar-contato', methods=['POST'])
def cadastrar_publicador():
    contato = request.get_json()
    sucesso = ContatoBLL().cadastrar(
        nome=contato.get('nome'),
        email=contato.get('email'),
        assunto=contato.get('assunto'),
        telefone=contato.get('telefone'),
        segmento=contato.get('segmento'),
        mensagem=contato.get('mensagem'),
        data_contato=date.today()   
    )
    return jsonify({"sucesso": sucesso}), 200 if sucesso else 412
