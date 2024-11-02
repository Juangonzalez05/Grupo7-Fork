import React, { useState, useEffect } from 'react';
import api from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import './EnrollStudent.css'; 

const EnrollStudent = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/course/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await api.get('/student/');
      setStudents(response.data);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
    }
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/course/${selectedCourse}/enroll_student/`, { student_id: selectedStudent });
      alert('Estudiante matriculado exitosamente');
      navigate('/course');
    } catch (error) {
      console.error('Error al matricular estudiante:', error);
    }
  };

  return (
    <div className="enroll-student-container">
      <div className="enroll-student-card">
        <h2 className="enroll-student-title">Matricular Estudiante</h2>
        <form onSubmit={handleEnroll} className="enroll-student-form">
          <div className="form-group">
            <label htmlFor="course" className="form-label">Seleccionar Curso:</label>
            <select
              id="course"
              name="course"
              className="form-select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">Seleccionar curso</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="student" className="form-label">Seleccionar Estudiante:</label>
            <select
              id="student"
              name="student"
              className="form-select"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
            >
              <option value="">Seleccionar estudiante</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-buttons">
            <button type="submit" className="button button-primary">Matricular</button>
            <button type="button" className="button button-secondary" onClick={() => navigate('/course')}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollStudent;
