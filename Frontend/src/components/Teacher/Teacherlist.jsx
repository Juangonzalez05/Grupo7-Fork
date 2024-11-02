import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
import { ArrowLeft, UserPlus, Edit, Trash2 } from 'lucide-react';
import './Teacherlist.css';

const TeacherList = () => {
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
      console.error('Error al buscar profesor:', error);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await api.delete(`/teacher/${id}/`);
      fetchTeachers();
    } catch (error) {
      console.error('Error eliminando profesor:', error);
    }
  };

  const handleBack = () => {
    navigate('/home'); 
  };

  return (
    <div className="teacher-list-page">
      <div className="teacher-list-container">
        <h1 className="teacher-list-title">Profesores</h1>
        <div className="button-container">
          <button className="back-button" onClick={handleBack}>
            <ArrowLeft className="button-icon" />
            Atrás
          </button>
          <button className="add-button" onClick={() => navigate('/createteacher')}>
            <UserPlus className="button-icon" />
            Añadir profesor
          </button>
        </div>
        <ul className="teacher-list">
          {teachers.map(teacher => (
            <li key={teacher.id} className="teacher-item">
              <div className="teacher-info">
                {teacher.full_name} - {teacher.department}
              </div>
              <div className="action-buttons">
                <button className="edit-button" onClick={() => navigate(`/updateteacher/${teacher.id}`)}>
                  <Edit className="button-icon" />
                  Editar
                </button>
                <button className="delete-button" onClick={() => deleteTeacher(teacher.id)}>
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

export default TeacherList;
