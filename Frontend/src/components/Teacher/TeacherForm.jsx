import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import './Teacherform.css';

const TeacherForm = () => {
  const [teacher, setTeacher] = useState({
    first_name: '',
    last_name: '',
    user_id: '',
    birth_date: '',
    gender: 'male',
    address: '',
    phone_number: '',
    department: '',
    hire_date: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTeacher();
    }
  }, [id]);

  const fetchTeacher = async () => {
    try {
      const response = await api.get(`/teacher/${id}/`);
      setTeacher(response.data);
    } catch (error) {
      console.error('Error fetching teacher:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await api.put(`/teacher/${id}/`, teacher);
      } else {
        await api.post('/teacher/', teacher);
      }
      navigate('/teacherlist');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleBack = () => {
    navigate('/teacherlist');
  };

  return (
    <div className="teacher-form-container">
      <div className="teacher-form-card">
        <h1 className="teacher-form-title">{id ? 'Edit' : 'Add'} Profesor</h1>
        <form onSubmit={handleSubmit} className="teacher-form">
          <div className="form-group">
            <label htmlFor="first_name" className="form-label">Primer nombre:</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={teacher.first_name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="form-label">Apellido:</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={teacher.last_name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_id" className="form-label">ID Usuario:</label>
            <input
              type="text"
              id="user_id"
              name="user_id"
              value={teacher.user_id}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="birth_date" className="form-label">Fecha de nacimiento:</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={teacher.birth_date}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="form-label">Genero:</label>
            <select
              id="gender"
              name="gender"
              value={teacher.gender}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="male">Hombre</option>
              <option value="female">Mujer</option>
              <option value="other">Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Direccion:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={teacher.address}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number" className="form-label">Numero de telefono:</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={teacher.phone_number}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department" className="form-label">Departamento:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={teacher.department}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hire_date" className="form-label">Fecha de creacion:</label>
            <input
              type="date"
              id="hire_date"
              name="hire_date"
              value={teacher.hire_date}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-buttons">
            <button type="button" className="button button-secondary" onClick={handleBack}>Atras</button>
            <button type="submit" className="button button-primary">{id ? 'Update' : 'Add'} Profesor</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
