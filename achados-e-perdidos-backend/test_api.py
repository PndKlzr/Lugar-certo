import requests

url = 'http://127.0.0.1:5000/items'

# Dados do item a ser adicionado
data = {
    'code': '12345',
    'name': 'Chave',
    'location': 'Coordenação',
    'date_found': '2024-11-01'
}
files = {
    
}

# Envia a solicitação POST
response = requests.post(url, data=data, files=files)

print(f'Status Code: {response.status_code}')
print(f'Response Text: {response.text}')
