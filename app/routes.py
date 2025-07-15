from flask import Blueprint, render_template, request, redirect, current_app
from flask import Flask, request, jsonify
from flask_cors import CORS

servidor = Flask(__name__)
CORS(servidor)

@servidor.route('/cadastrar-contato', methods=['POST'])
def formulario():
    contato = request.get_json()
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']

        cursor = current_app.db.cursor()
        query = "INSERT INTO usuarios (nome, email) VALUES (%s, %s)"
        cursor.execute(query, (nome, email))
        current_app.db.commit()
        cursor.close()

        return redirect('/')
    return render_template('formulario.html')
