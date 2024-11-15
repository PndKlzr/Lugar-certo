// src/ListItems.js
import React, { useState, useEffect } from 'react';

const ListItems = () => {
    const [items, setItems] = useState([]);

    // Carregar itens ao iniciar o componente
    useEffect(() => {
        fetch('http://127.0.0.1:5000/items')
            .then(response => response.json())
            .then(data => setItems(data))  // Atualiza a lista de itens
            .catch(error => console.error('Erro ao buscar itens:', error));
    }, []);

// Função para deletar item
const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/items/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message); // Mensagem de sucesso
        setItems(items.filter(item => item.id !== id)); // Atualiza a lista de itens
      })
      .catch(error => console.error('Error deleting item:', error));
  };
    return (
        <div>
            <h2>Itens encontrados:</h2>
            {items.length === 0 ? (
                <p>Nenhum item encontrado.</p>
            ) : (
                <ul>
                    {items.map(item => (
  <li key={item.id}>
    <strong>{item.nome}</strong> - {item.descricao} - {item.data_encontro}

    <button onClick={() => handleDelete(item.id)}>Remover</button>
  </li>
))}
                </ul>
            )}
        </div>
    );
};



export default ListItems;
