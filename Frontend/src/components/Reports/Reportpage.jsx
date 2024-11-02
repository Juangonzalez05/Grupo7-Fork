import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './Reportpage.css'; 

const ReportPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/course/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error al cargar los cursos:', error);
        setError('Error al cargar los cursos.');
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);
    setReportData(null);
    setError(null);
  };

  const handleGenerateReport = async () => {
    if (!selectedCourse) {
      setError('Por favor, selecciona un curso primero.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/grades/reporte-estudiantes-json/${selectedCourse}/`);
      setReportData(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al cargar el reporte de estudiantes:', error);
      setReportData(null);
      setError('Error al cargar el reporte de estudiantes.');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!selectedCourse) {
      setError('Por favor, selecciona un curso primero.');
      return;
    }

    setPdfLoading(true);
    try {
      const pdfResponse = await api.get(`/grades/reporte-estudiantes/${selectedCourse}/`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([pdfResponse.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_${selectedCourse}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      setError(null);
    } catch (error) {
      console.error('Error al generar el reporte PDF:', error);
      setError('Error al generar el reporte PDF.');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="report-page">
      <div className="report-container">
        <h1 className="report-title">Generar Reporte de Notas</h1>
        <div>
          <select className="course-select" onChange={handleCourseSelect} value={selectedCourse || ''}>
            <option value="" disabled>Selecciona un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        {selectedCourse && (
          <div className="button-container">
            <button className="generate-button" onClick={handleGenerateReport} disabled={loading}>
              {loading ? 'Generando Reporte...' : 'Generar Reporte'}
            </button>
            <button 
              className="generate-button"
              onClick={handleGeneratePDF} 
              disabled={pdfLoading}
            >
              {pdfLoading ? 'Generando PDF...' : 'Generar Reporte PDF'}
            </button>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {reportData && reportData.length > 0 ? (
          <div>
            <h2>Reporte de Notas del Curso</h2>
            <table className="report-table">
              <thead>
                <tr>
                  <th>Nombre del Estudiante</th>
                  <th>Notas</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((student) => (
                  <tr key={student.id}>
                    <td>{student.first_name} {student.last_name}</td>
                    <td>
                      {student.grades.length > 0 ? (
                        student.grades.map((grade, index) => (
                          <span key={index}>Nota {index + 1}: {grade}<br/></span>
                        ))
                      ) : (
                        <span>No hay notas registradas.</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          selectedCourse && !error && <p>Genera el reporte oprimiendo el boton.</p>
        )}
      </div>
    </div>
  );
};

export default ReportPage;









