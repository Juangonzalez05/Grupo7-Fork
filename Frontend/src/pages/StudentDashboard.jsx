import React from 'react';
import './StudentDashboard.css'; 

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <h2 className="dashboard-title">Panel del Estudiante</h2>
      <p className="dashboard-subtitle">Seleccione un curso para ver el horario y el profesor que dictará el curso:</p>

      <div className="course-list">
        {/* Ejemplo de curso 1 */}
        <div className="course-card">
          <h3>Nombre del Curso</h3>
          <p><strong>Profesor:</strong> Nombre del Profesor</p>
          <p><strong>Horario:</strong> 08:00 AM - 10:00 AM</p>
          <button className="generate-button">Generar Informe en PDF</button>
        </div>

        {/* Ejemplo de curso 2 */}
        <div className="course-card">
          <h3>Nombre del Curso 2</h3>
          <p><strong>Profesor:</strong> Nombre del Profesor</p>
          <p><strong>Horario:</strong> 10:00 AM - 12:00 PM</p>
          <button className="generate-button">Generar Informe en PDF</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

