import React, { useState, useEffect } from 'react';
import api from '../../api/api.js';  
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    teacher_id: '',
    schedule: '',
    start_date: '',
    end_date: '',
  });
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/teacher/');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error al obtener profesores:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/course/', formData);
      alert('Curso creado exitosamente');
      navigate('/course');  
    } catch (error) {
      console.error('Error al crear curso:', error);
    }
  };

  return (
    <div className="container">
      <h1>Crear Curso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre del Curso:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="teacher_id">Profesor:</label>
          <select
            id="teacher_id"
            name="teacher_id"
            value={formData.teacher_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccionar profesor</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.full_name} 
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="schedule">Horario:</label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="start_date">Fecha de Inicio:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end_date">Fecha de Fin:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Crear Curso</button>
      </form>
    </div>
  );
};

export default CreateCourse;
