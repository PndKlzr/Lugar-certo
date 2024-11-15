from flask import request, jsonify
from app.models import Item

# Inicialização das rotas
def init_routes(app, db):
    # Rota para obter todos os itens
    @app.route('/items', methods=['GET'])
    def get_items():
        try:
            items = Item.query.all()  # Consulta todos os itens
            return jsonify([item.to_dict() for item in items])  # Retorna os itens no formato JSON
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    # Rota para adicionar um novo item
    @app.route('/items', methods=['POST'])
    def add_item():
        try:
            data = request.get_json()  # Recebe os dados do corpo da requisição
            new_item = Item(
                name=data['name'],
                location=data['location'],
                date_found=data['date_found'],
                status=data['status'],
                image_url=data.get('image_url')  # O URL da imagem pode ser opcional
            )
            db.session.add(new_item)
            db.session.commit()
            return jsonify(new_item.to_dict()), 201  # Retorna o novo item criado
        except Exception as e:
            return jsonify({"error": str(e)}), 400
