import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';  
import './ViewCourse.css';  

const ViewCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    try {
      const response = await api.get(`/course/${id}/`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles del curso:', error);
    }
  };

  
  const generatePDF = () => {
    const input = document.getElementById('course-details');
    
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`course_${course.name}.pdf`);
    }).catch((error) => {
      console.error('Error generando el PDF:', error);
    });
  };

  if (!course) {
    return <p className="loading-text">Cargando...</p>;
  }

  return (
    <div className="course-details-container">
      <div id="course-details" className="course-details-card">
        <h1 className="course-title">{course.name}</h1>
        <p><strong>Descripción:</strong> {course.description}</p>
        <p><strong>Profesor:</strong> {course.teacher_name || 'No asignado'}</p>
        <p><strong>Horario:</strong> {course.schedule}</p>
        <p><strong>Fechas:</strong> {course.start_date} - {course.end_date}</p>

        <h2 className="enrolled-students-title">Estudiantes Matriculados</h2>
        {course.students.length > 0 ? (
          <ul className="enrolled-students-list">
            {course.students.map((student) => (
              <li key={student.id}>{student.full_name}</li>
            ))}
          </ul>
        ) : (
          <p>No hay estudiantes matriculados en este curso.</p>
        )}

        <div className="form-buttons">
          <button onClick={() => navigate('/course')} className="button button-primary">
            Volver a la Lista de Cursos
          </button>
          <button onClick={generatePDF} className="button button-secondary">
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;

