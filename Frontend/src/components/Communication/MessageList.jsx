import React, { useState, useEffect } from 'react';
import api from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        receiver: '',
        subject: '',
        body: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
        fetchMessages();
    }, []);

    // Función para obtener la lista de usuarios
    const fetchUsers = async () => {
        try {
            const response = await api.get('/register/'); // Asegúrate de que este endpoint devuelva los usuarios
            setUsers(response.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    // Función para obtener la lista de mensajes
    const fetchMessages = async () => {
        try {
            const response = await api.get('/communication/');
            setMessages(response.data);
        } catch (error) {
            console.error('Error al obtener mensajes:', error);
        }
    };

    // Maneja el cambio en los campos del formulario
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para enviar el mensaje
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/communication/', {
                receiver: formData.receiver, // Solo el ID del receptor
                subject: formData.subject,
                body: formData.body,
            });
            setMessages([...messages, response.data]);
            setFormData({ receiver: '', subject: '', body: '' });
            alert('Mensaje enviado exitosamente');
        } catch (error) {
            console.error('Error al enviar mensaje:', error.response ? error.response.data : error.message);
        }
    };

    // Modificado para navegar a /home
    const handleBack = () => {
        navigate('/home');
    };

    return (
        <div className="container">
            <header>
                <h1>Mensajes</h1>
            </header>

            <main>
                <h2>Enviar un nuevo mensaje</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="receiver">Destinatario</label>
                        <select id="receiver" name="receiver" value={formData.receiver} onChange={handleInputChange}>
                            <option value="">Seleccionar usuario</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.first_name} {user.last_name} ({user.email})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="subject">Asunto</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="body">Mensaje</label>
                        <textarea
                            id="body"
                            name="body"
                            value={formData.body}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="button-container">
                        <button type="button" className="back-button" onClick={handleBack}>Atrás</button>
                        <button type="submit">Enviar Mensaje</button>
                    </div>
                </form>

                <h2>Mensajes Recibidos</h2>
                <ul>
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <li key={msg.id} className="received-message">
                                <strong>De:</strong> {msg.sender_full_name} <br />
                                <strong>Asunto:</strong> {msg.subject} <br />
                                <strong>Mensaje:</strong> {msg.body}
                            </li>
                        ))
                    ) : (
                        <li className="no-messages">No hay mensajes recibidos</li>
                    )}
                </ul>
            </main>
        </div>
    );
};

export default Messages;
