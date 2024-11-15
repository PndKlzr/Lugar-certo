// src/AddItem.js
import React, { useState } from 'react';

const AddItem = () => {
    const [newItem, setNewItem] = useState({
        nome: '',
        descricao: '',
        data_encontro: '',
    });

    // Alterar o estado do novo item com base na entrada do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    // Enviar o novo item para o backend via POST
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:5000/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem), // Envia os dados com as chaves corretas
        })
            .then(response => response.json())
            .then(data => {
                alert('Item adicionado com sucesso!');
                setNewItem({ nome: '', descricao: '', data_encontro: '' }); // Limpa o formulário
            })
            .catch(error => console.error('Erro ao adicionar item:', error));
    };

    return (
        <div>
            <h3>Cadastrar novo item</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome do item"
                    value={newItem.nome}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="descricao"
                    placeholder="Localização"
                    value={newItem.descricao}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="date"
                    name="data_encontro"
                    value={newItem.data_encontro}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Adicionar Item</button>
            </form>
        </div>
    );
};

export default AddItem;
