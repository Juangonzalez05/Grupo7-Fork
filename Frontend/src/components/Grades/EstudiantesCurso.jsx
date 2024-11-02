import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import './EstudiantesCurso.css';

const EstudiantesCurso = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [grade, setGrade] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const navigate = useNavigate();

  
  useEffect(() => {
    fetchStudents();
  }, [courseId]);

  const fetchStudents = async () => {
    try {
      const response = await api.get(`/grade/course/${courseId}/students/`);
      const studentsData = response.data;
      setStudents(studentsData);
    } catch (error) {
      console.error('Error al cargar los estudiantes y notas:', error);
    }
  };

  const handleGradeChange = (studentId, index, value) => {
    setStudents(prevStudents =>
      prevStudents.map(student => {
        if (student.id === studentId) {
          const updatedGrades = [...student.grades];
          updatedGrades[index] = value; 
          return { ...student, grades: updatedGrades };
        }
        return student;
      })
    );
  };

  
  const handleDeleteGrade = async (studentId, index) => {
    try {
      const gradeId = students.find(student => student.id === studentId).grades_ids[index];

      if (gradeId) {
        await api.delete(`/grade/${gradeId}/`);

        
        setStudents(prevStudents =>
          prevStudents.map(student => {
            if (student.id === studentId) {
              const updatedGrades = [...student.grades];
              const updatedGradesIds = [...student.grades_ids];
              updatedGrades.splice(index, 1); 
              updatedGradesIds.splice(index, 1); 
              return { ...student, grades: updatedGrades, grades_ids: updatedGradesIds };
            }
            return student;
          })
        );

        alert(`Nota con ID ${gradeId} eliminada exitosamente.`);
      } else {
        console.error("No se encontró el ID de la nota para eliminar.");
      }
    } catch (error) {
      if (error.response) {
        console.error('Error al eliminar la nota (res):', error.response.data); 
      } else {
        console.error('Error al eliminar la nota:', error.message); 
      }
    }
  };

  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };


const handleAddGrade = async () => {
  if (!selectedStudent || !grade) {
    alert('Seleccione un estudiante e ingrese una nota válida.');
    return;
  }

  try {
    await api.post('/grade/assign-grade/', {
      student_id: selectedStudent,
      course_id: courseId,
      grade,
      evaluation_date: new Date().toISOString().slice(0, 10), // Fecha de evaluación
    });

    
    alert('Nota asignada exitosamente.');
    setSelectedStudent(null);
    setGrade('');

    
    window.location.reload();  
  } catch (error) {
    if (error.response) {
      console.error('Error al asignar la nota (res):', error.response.data); 
    } else {
      console.error('Error al asignar la nota:', error.message); 
    }
  }
};


  const handleSave = async () => {
    try {
      for (const student of students) {
        for (let index = 0; index < student.grades.length; index++) {
          const gradeId = student.grades_ids[index];
          const newGrade = student.grades[index];

          const payload = {
            grade: newGrade,
            evaluation_date: new Date().toISOString().slice(0, 10),
            student_id: student.id, 
            course_id: courseId     
          };

          console.log(`Datos enviados a la solicitud PUT para el ID ${gradeId}:`, payload);

          if (gradeId) {
            await api.put(`/grade/${gradeId}/`, payload);
          }
        }
      }
      alert('Cambios guardados exitosamente');
      setIsEditing(false); 
      fetchStudents(); 
    } catch (error) {
      if (error.response) {
        console.error('Error al guardar los cambios (res):', error.response.data); 
      } else {
        console.error('Error al guardar los cambios:', error.message); 
      }
    }
  };

  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="estudiantes-curso-page">
      <div className="estudiantes-curso-container">
        <div className="button-container">
          <button className="back-button" onClick={handleBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </button>
          {!isEditing ? (
            <button className="edit-button" onClick={toggleEdit}>Editar Tabla</button>
          ) : (
            <button className="save-button" onClick={handleSave}>Guardar Cambios</button>
          )}
        </div>

        <h1>Estudiantes del Curso</h1>
        {students.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  {students.length > 0 && students[0].grades.map((_, index) => (
                    <th key={index}>Nota {index + 1}</th>
                  ))}
                  {isEditing && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  {student.grades.map((grade, index) => (
                    <td key={`${student.id}-${index}`} className="grade-cell">
                      {isEditing ? (
                        <input
                          type="number"
                          value={grade !== undefined ? grade : ''}
                          onChange={(e) => handleGradeChange(student.id, index, e.target.value)}
                        />
                      ) : (
                        grade !== undefined ? grade : 'Sin Nota'
                      )}
                    </td>
                  ))}
                  {isEditing && (
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteGrade(student.id, student.grades.length - 1)}
                      >
                        Eliminar Nota
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        ) : (
          <p>No hay estudiantes inscritos en este curso.</p>
        )}

        <h2>Asignar Nueva Nota</h2>
        <div className="assign-grade-form">
          <select onChange={(e) => setSelectedStudent(e.target.value)} defaultValue="">
            <option value="" disabled>Seleccionar Estudiante</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.first_name} {student.last_name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Ingrese la nota"
          />
          <button onClick={handleAddGrade}>Agregar Nota</button>
        </div>
      </div>
    </div>
  );
};

export default EstudiantesCurso;
