import React, { useState, useEffect } from 'react';
import api from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import './CreateStudent.css';  

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    birth_date: '',
    gender: '',
    address: '',
    phone_number: '',
    grade: '',  
    enrollment_date: '',
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api.post('/student/', formData)
      .then(response => {
        console.log('Estudiante creado exitosamente:', response.data);
        setFormData({
          user_id: '',
          birth_date: '',
          gender: '',
          address: '',
          phone_number: '',
          grade: '',  // Reinicia el campo del grado
          enrollment_date: '',
        });
        alert('Estudiante creado exitosamente');
        navigate('/studentlist');
      })
      .catch(error => {
        console.error('Error al crear estudiante:', error.response ? error.response.data : error.message);
      });
  };

  const handleBack = () => {
    navigate('/studentlist');
  };

  return (
    <div className="container">
      <h1>Crear Estudiante</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_id">Usuario</label>
          <select id="user_id" name="user_id" value={formData.user_id} onChange={handleInputChange}>
            <option value="">Seleccionar usuario</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.first_name} {user.last_name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="birth_date">Fecha nacimiento</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="gender">Genero</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Seleccionar genero</option>
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <div>
          <label htmlFor="address">Direccion</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone_number">Numero de telefono</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="grade">Grado</label>  
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="enrollment_date">Fecha de inscripción</label>
          <input
            type="date"
            id="enrollment_date"
            name="enrollment_date"
            value={formData.enrollment_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="button-container">
          <button type="button" className="back-button" onClick={handleBack}>Atrás</button>
          <button type="submit">Crear Estudiante</button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudent;
