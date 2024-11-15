import requests

# URL do endpoint
url = "http://127.0.0.1:5000/items"

# Dados do item a ser cadastrado
data = {
    "code": "ABC123",
    "name": "Chave de Carro",
    "location": "Recepção",
    "date_found": "2024-11-15"
}

# Envia a requisição POST (sem imagem)
response = requests.post(url, data=data)

# Imprime a resposta do servidor
print("Status Code:", response.status_code)
print("Resposta:", response.json())
