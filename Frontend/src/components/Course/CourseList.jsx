import React, { useState, useEffect } from 'react';
import api from '../../api/api.js';  
import { useNavigate } from 'react-router-dom';
import './CourseList.css';

const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/course/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      try {
        await api.delete(`/course/${id}/`);
        fetchCourses();
      } catch (error) {
        console.error('Error al eliminar curso:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editcourse/${id}`);
  };

  const handleView = (id) => {
    navigate(`/viewcourse/${id}`);
  };

  const handleEnrollStudent = () => {
    navigate('/enrollstudent');
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleCreateCourse = () => {
    navigate('/createcourse'); 
  };

  return (
    <div className="container">
      <header>
        <h1>Lista de Cursos</h1>
      </header>

      <main>
        <div className="buttons-container">
          <button 
            className="button-enroll" 
            onClick={handleEnrollStudent}
          >
            Matricular Estudiante
          </button>
          <button 
            className="button-create-course" 
            onClick={handleCreateCourse}
          >
            Crear Curso
          </button>
          <button 
            className="button-back" 
            onClick={handleBackToHome}
          >
            Atras
          </button>
        </div>

        <table className="course-table" aria-label="Tabla de cursos disponibles">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Profesor</th>
              <th scope="col">Horario</th>
              <th scope="col">Fechas</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>{course.teacher_name || 'No asignado'}</td>
                  <td>{course.schedule}</td>
                  <td>{course.start_date} - {course.end_date}</td>
                  <td>
                    <button 
                      className="button-view"
                      aria-label={`Ver curso ${course.name}`} 
                      onClick={() => handleView(course.id)}
                    >
                      Ver Curso
                    </button>
                    <button 
                      className="button-edit"
                      aria-label={`Editar curso ${course.name}`} 
                      onClick={() => handleEdit(course.id)}
                    >
                      Editar
                    </button>
                    <button 
                      className="button-delete"
                      aria-label={`Eliminar curso ${course.name}`} 
                      onClick={() => handleDelete(course.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-courses">No hay cursos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ListCourses;
