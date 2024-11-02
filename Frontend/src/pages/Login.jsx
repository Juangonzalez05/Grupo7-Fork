import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import './Login.css';  

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
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
      const response = await api.post('auth/', formData);
      console.log('Login exitoso:', response.data);
      localStorage.setItem('token', response.data.access);
      const userRole = response.data.role;
      if (userRole === 'student') {
        navigate('/studentinterface');
      } else if (userRole === 'teacher') {
        navigate('/home');
      } else {
        alert('Rol no autorizado para esta interfaz');
      }
    } catch (error) {
      console.error('Error en el login:', error.response ? error.response.data : error.message);
      alert('Error al iniciar sesión. Revisa tus credenciales.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div>
          <h2 className="login-title">Inicio de Sesión</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <Mail className="input-icon" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-field">
              <Lock className="input-icon" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="submit-button">
              <LogIn className="button-icon" />
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="register-link">
          <button onClick={handleRegisterRedirect} className="register-button">
            <UserPlus className="button-icon" />
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;










