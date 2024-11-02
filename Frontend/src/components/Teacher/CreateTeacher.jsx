import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import { Calendar, Phone, MapPin, Building, User, Users } from 'lucide-react';
import './Createteacher.css';

const CreateTeacher = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    birth_date: '',
    gender: '',
    address: '',
    phone_number: '',
    department: '',
    hire_date: '',
  });

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/register/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post('/teacher/', formData)
      .then(response => {
        console.log('Profesor creado exitosamente:', response.data);
        setFormData({
          user_id: '',
          birth_date: '',
          gender: '',
          address: '',
          phone_number: '',
          department: '',
          hire_date: '',
        });
        alert('Profesor creado exitosamente');
        navigate('/teacherlist');
      })
      .catch(error => {
        console.error('Error al crear profesor:', error.response ? error.response.data : error.message);
      });
  };

  const handleBack = () => {
    navigate('/teacherlist');
  };

  return (
    <div className="create-teacher-container">
      <div className="create-teacher-card">
        <h2 className="create-teacher-title">Crear Profesor</h2>
        <form onSubmit={handleSubmit} className="create-teacher-form">
          <div className="form-group">
            <label htmlFor="user_id" className="form-label">
              <User className="form-icon" />
              Usuario
            </label>
            <select
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Seleccionar usuario</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.first_name} {user.last_name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="birth_date" className="form-label">
              <Calendar className="form-icon" />
              Fecha nacimiento
            </label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              <Users className="form-icon" />
              Genero
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Seleccionar genero</option>
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              <MapPin className="form-icon" />
              Direccion
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number" className="form-label">
              <Phone className="form-icon" />
              Numero de telefono
            </label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">
              <Building className="form-icon" />
              Departamento
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hire_date" className="form-label">
              <Calendar className="form-icon" />
              Fecha de contratación
            </label>
            <input
              type="date"
              id="hire_date"
              name="hire_date"
              value={formData.hire_date}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="button button-secondary" onClick={handleBack}>
              Volver
            </button>
            <button type="submit" className="button button-primary">
              Crear profesor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacher;
