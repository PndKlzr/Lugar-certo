import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    nome: '',
    descricao: '',
    data_encontro: '',
  });
  const [filterDate, setFilterDate] = useState('');  // Estado para o filtro de data
  const [loading, setLoading] = useState(false);  // Estado para controle de carregamento

  // Função para carregar os itens ao inicializar o componente
  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/items')
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  }, []);

  // Função para alterar o estado do novo item com base na entrada do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Função para enviar o novo item para o backend via POST
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:5000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(data => {
        setItems([...items, data]);  // Adiciona o novo item à lista
        setNewItem({ nome: '', descricao: '', data_encontro: '' });  // Limpa o formulário
      })
      .catch(error => console.error('Error adding item:', error));
  };

  // Função para filtrar os itens com base na data selecionada
  const handleFilterSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    fetch(`http://127.0.0.1:5000/items/filter?data_encontro=${filterDate}`)
      .then(response => response.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching filtered items:', error);
        setLoading(false);
      });
  };

  // Função para remover item
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/items/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
   <div className="container">
    <h1 className="title">Lugar Certo</h1> {/* Alterado o nome para Lugar Certo */}

    <h3>Cadastrar novo item</h3>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="nome"
          placeholder="Nome do item"
          value={newItem.nome}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={newItem.descricao}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <input
          type="date"
          name="data_encontro"
          value={newItem.data_encontro}
          onChange={handleInputChange}
          required
          className="input-field"
        />
        <button type="submit" className="btn">Adicionar Item</button>
      </form>
      
      {/* Filtro de data */}
      <div className="filter-form">
        <h3>Filtrar por data</h3>
        <form onSubmit={handleFilterSubmit}>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="btn">Filtrar</button>
        </form>
      </div>

      <h2>Itens encontrados:</h2>

      {loading ? <p>Carregando...</p> : (
        items.length === 0 ? (
          <p>Nenhum item encontrado.</p>
        ) : (
          <ul className="item-list">
            {items.map(item => (
              <li key={item.id} className="item">
                <span>
                  <strong>{item.nome}</strong> - {item.descricao} - {item.data_encontro}
                </span>
                <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Remover</button>
              </li>
            ))}
          </ul>
        )
      )}

      
    </div>
  );
};

export default App;
