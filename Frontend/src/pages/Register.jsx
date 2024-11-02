import React, { useState } from 'react';
import api from '../api/api.js';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: '' 
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('register/', formData);
      console.log('Registro exitoso:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
      setError('Error al registrar usuario. Verifica tus datos.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Registro</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          
          <div className="input-group">
            <div className="input-field">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Nombre"
                className="input-text"
                required
              />
            </div>
          </div>

          
          <div className="input-group">
            <div className="input-field">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Apellido"
                className="input-text"
                required
              />
            </div>
          </div>

          
          <div className="input-group">
            <div className="input-field">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-text"
                required
              />
            </div>
          </div>

          
          <div className="input-group">
            <div className="input-field">
              <Lock className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="input-text"
                required
              />
            </div>
          </div>

          
          <div className="input-group">
            <div className="input-field">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-text"
                required
              >
                <option value="" disabled>Seleccionar Rol</option>
                <option value="student">Estudiante</option>
                <option value="teacher">Profesor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>

          
          <button type="submit" className="submit-button">
            <UserPlus className="button-icon" />
            Registrar
          </button>
        </form>

        
        <div className="login-link">
          <Link to="/login" className="login-button">
            <LogIn className="button-icon" />
            ¿Ya tienes una cuenta? Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
