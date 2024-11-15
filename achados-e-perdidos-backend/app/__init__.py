from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Cria a instância do Flask
app = Flask(__name__)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Cria a instância do SQLAlchemy
db = SQLAlchemy(app)

# Importa as rotas e o modelo
from app import routes, models

# Função para inicializar o banco de dados
def init_db():
    with app.app_context():  # Garante que estamos dentro do contexto da aplicação
        db.create_all()  # Cria as tabelas no banco de dados

if __name__ == '__main__':
    init_db()  # Chama a função para criar o banco de dados
    app.run(debug=True)
