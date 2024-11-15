from flask import Flask, request, jsonify
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///items.db'  # Caminho do banco de dados
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

CORS(app)



# Modelo de Item
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.String(200), nullable=False)
    data_encontro = db.Column(db.Date, nullable=False)

# Criar as tabelas no banco de dados quando o app for iniciado
with app.app_context():
    db.create_all()

@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()  # Recupera todos os itens
    return jsonify([{
        'id': item.id,
        'nome': item.nome,
        'descricao': item.descricao,
        'data_encontro': item.data_encontro.strftime('%Y-%m-%d')
    } for item in items]), 200

@app.route('/items/filter', methods=['GET'])
def filter_items():
    data_str = request.args.get('data_encontro')  # data no formato 'YYYY-MM-DD'
    if data_str:
        data_encontro = datetime.strptime(data_str, '%Y-%m-%d').date()
        items = Item.query.filter_by(data_encontro=data_encontro).all()
    else:
        items = Item.query.all()

    return jsonify([{
        'id': item.id,
        'nome': item.nome,
        'descricao': item.descricao,
        'data_encontro': item.data_encontro.strftime('%Y-%m-%d')
    } for item in items]), 200

@app.route('/items/<int:id>', methods=['PUT'])
def mark_as_retrived(item_id):
    item = Item.query.get(id)
    if not item:
        return jsonify({'message': 'Item não encontrado!'}), 404

    data = request.get_json()
    item.nome = data.get('nome', item.nome)
    item.descricao = data.get('descricao', item.descricao)
    item.data_encontro = datetime.strptime(data.get('data_encontro'), '%Y-%m-%d').date()

    db.session.commit()

    return jsonify({'message': 'Item atualizado com sucesso!'}), 200

@app.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    # Aqui você precisa remover o item do banco de dados
    item = Item.query.get(id)  # Presumindo que você esteja usando SQLAlchemy
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item removido com sucesso!"}), 200
    return jsonify({"message": "Item não encontrado!"}), 404



@app.route('/items', methods=['POST'])
def add_item():
    data = request.get_json()
    nome = data.get('nome')
    descricao = data.get('descricao')
    data_encontro_str = data.get('data_encontro')

    # Convertendo a string da data para um objeto datetime.date
    data_encontro = datetime.strptime(data_encontro_str, '%Y-%m-%d').date()

    new_item = Item(nome=nome, descricao=descricao, data_encontro=data_encontro)

    db.session.add(new_item)
    db.session.commit()

    return jsonify({'message': 'Item adicionado com sucesso!'}), 201


if __name__ == '__main__':
    app.run(debug=True)
