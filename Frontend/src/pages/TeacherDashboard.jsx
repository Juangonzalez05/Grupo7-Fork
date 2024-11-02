import React, { useEffect, useState } from 'react';
import api from '../api/api';
import GradeReport from '../components/Grades/AsignarNotas';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await api.get('course/');
      setCourses(response.data);
    };
    fetchCourses();
  }, []);

  const handleAssign = async (courseId) => {
    try {
      await api.post(`course/${courseId}/assign_teacher/`);
      alert('Te has inscrito al curso con éxito');
    } catch (error) {
      console.error('Error al inscribirse al curso:', error);
    }
  };

  return (
    <div>
      <h1>Mis Cursos Disponibles</h1>
      {courses.map(course => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <p>{course.description}</p>
          <button onClick={() => handleAssign(course.id)}>Inscribirse</button>
        </div>
      ))}
      <h2>Reporte de Calificaciones</h2>
      <GradeReport />
    </div>
  );
};

export default Dashboard;
