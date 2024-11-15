
### Como adicionar o README diretamente no GitHub

1. **Acesse seu repositório no GitHub**.
2. Na página do repositório, clique no botão **"Add file"** (Adicionar arquivo) e depois em **"Create new file"** (Criar novo arquivo).
3. No campo de nome do arquivo, digite `README.md`.
4. No campo de conteúdo, cole o seguinte conteúdo abaixo (copie e cole diretamente):

```markdown
# Lugar Certo - Sistema de Achados e Perdidos

## Descrição

O **Lugar Certo** é um sistema de **achados e perdidos**. Ele permite que usuários cadastrem itens encontrados, visualizem os itens já cadastrados, filtrem os itens por data e removam itens da lista.

Este projeto utiliza:

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Banco de Dados**: SQLite (pode ser substituído por outros bancos, dependendo da configuração)

---

## Funcionalidades

- **Cadastrar um item encontrado**: Permite ao usuário adicionar um item perdido, incluindo nome, descrição e data de encontro.
- **Visualizar itens cadastrados**: Exibe todos os itens encontrados e cadastrados.
- **Filtrar itens por data**: Permite filtrar os itens encontrados com base na data de encontro.
- **Remover itens**: Permite a remoção de itens que já foram retirados.

---

## Como rodar o projeto

### 1. Clonar o repositório

Primeiro, clone este repositório no seu computador:

```bash
git clone https://github.com/SEU_USUARIO/lugar-certo.git
cd lugar-certo
```

### 2. Rodando o Backend (Flask)

1. **Instalar dependências**:

   Para rodar o backend, você precisa do Python instalado na sua máquina. Após clonar o repositório, instale as dependências do backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Rodar o servidor do Flask**:

   Depois de instalar as dependências, inicie o servidor Flask:

   ```bash
   python app.py
   ```

   Isso fará o Flask rodar no `http://127.0.0.1:5000/`.

### 3. Rodando o Frontend (React)

1. **Instalar dependências**:

   Navegue até a pasta do frontend e instale as dependências do React:

   ```bash
   cd ../achados-e-perdidos-frontend
   npm install
   ```

2. **Rodar o servidor do React**:

   Após instalar as dependências, inicie o servidor React:

   ```bash
   npm start
   ```

   Isso fará o React rodar no `http://localhost:3000/`.

### 4. Acessando a aplicação

- Após rodar ambos os servidores, abra seu navegador e acesse o **frontend** em `http://localhost:3000/`. A partir daí, você poderá interagir com a aplicação.

---


Agora você terá o arquivo **README.md** configurado corretamente no seu repositório no GitHub! Isso vai permitir que outras pessoas saibam como rodar e contribuir para o seu projeto.
