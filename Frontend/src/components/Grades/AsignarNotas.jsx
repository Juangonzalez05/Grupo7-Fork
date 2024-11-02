import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import './AsignarNotas.css';
import { FaUsers } from 'react-icons/fa';

const AsignarNota = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/course/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseSelect = (courseId) => {
    navigate(`/asignar-nota/curso/${courseId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="asignar-nota-page">
      <div className="asignar-nota-container">
        <button className="back-button" onClick={handleBack}>
          ← Volver
        </button>

        <h1 className="asignar-nota-title">Asignar Nota a los Estudiantes</h1>
        <p className="asignar-nota-description">Seleccione un curso para ver a los estudiantes y asignarles una calificación.</p>
        
        <div className="course-list">
          {courses.length > 0 ? (
            courses.map(course => (
              <div key={course.id} className="course-card">
                <h2>{course.name}</h2>
                <p>{course.description}</p>
                <button onClick={() => handleCourseSelect(course.id)}>
                  <FaUsers />
                  Ver Estudiantes
                </button>
              </div>
            ))
          ) : (
            <p className="no-courses">No hay cursos disponibles para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AsignarNota;
