import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import './EditCourse.css';

const EditCourse = () => {
  const { id } = useParams();
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
    fetchCourseDetails();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/teacher/');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error al obtener profesores:', error);
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await api.get(`/course/${id}/`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error al obtener detalles del curso:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/course/${id}/`, formData);
      alert('Curso actualizado exitosamente');
      navigate('/course');
    } catch (error) {
      console.error('Error al actualizar curso:', error);
    }
  };

  const handleBack = () => {
    navigate('/course');
  };

  return (
    <div className="edit-course-container">
      <h1 className="edit-course-title">Editar Curso</h1>
      <form onSubmit={handleSubmit} className="edit-course-form">
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="button-group">
          <button type="submit" className="submit-button">Actualizar Curso</button>
          <button type="button" onClick={handleBack} className="back-button">Volver Atrás</button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;