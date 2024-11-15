import sqlite3

def init_db(app):
    # Conexão com o banco de dados SQLite
    conn = sqlite3.connect('achados_perdidos.db')
    cursor = conn.cursor()

    # Criação da tabela de itens
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            date_found TEXT NOT NULL,
            image_path TEXT,
            status TEXT NOT NULL DEFAULT 'available'
        )
    ''')
    conn.commit()
    conn.close()
