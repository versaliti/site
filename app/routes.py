from flask import Blueprint, render_template, request, redirect, current_app
from flask import Flask, request, jsonify
from flask_cors import CORS
from BLL.ContatoBLL import ContatoBLL

servidor = Flask(__name__)
CORS(servidor)

@servidor.route('/cadastrar-contato', methods=['POST'])
def cadastrarPublicador():
    contato = request.get_json()
    if ContatoBLL().cadastrar(nome=contato.get('nome'),
                                 email=contato.get('email'),
                                 assunto=contato.get('assunto'),
                                 telefone=contato.get('telefone'),
                                 segmento=contato.get('segmento'),
                                 mensagem=contato.get('mensagem')) is True:
        return jsonify({"sucesso": True}), 200
    else:
        return jsonify({"sucesso": False}), 412

if __name__ == "__main__":
    servidor.run(debug=True, port=5000)