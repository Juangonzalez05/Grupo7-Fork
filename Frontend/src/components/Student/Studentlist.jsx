
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Edit, Trash2 } from 'lucide-react';
import api from '../../api/api.js';
import './Studentlist.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/student/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error al buscar estudiantes:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/student/${id}/`);
      fetchStudents();
    } catch (error) {
      console.error('Error eliminando estudiante:', error);
    }
  };

  const handleBack = () => {
    navigate('/home'); 
  };

  return (
    <div className="student-list-page">
      <div className="student-list-container">
        <h1 className="student-list-title">Estudiantes</h1>
        <div className="button-container">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft className="button-icon" />
            Atrás
          </button>
          <button className="add-button" onClick={() => navigate('/createstudent')}>
            <UserPlus className="button-icon" />
            Añadir estudiante
          </button>
        </div>
        <ul className="student-list">
          {students.map(student => (
            <li key={student.id} className="student-item">
              <div className="student-info">
                <span className="student-name">{student.full_name}</span>
                <span className="student-grade">{student.grade}</span>
              </div>
              <div className="action-buttons">
                <button className="edit-button" onClick={() => navigate(`/updatestudent/${student.id}`)}>
                  <Edit className="button-icon" />
                  Editar
                </button>
                <button className="delete-button" onClick={() => deleteStudent(student.id)}>
                  <Trash2 className="button-icon" />
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentList;












