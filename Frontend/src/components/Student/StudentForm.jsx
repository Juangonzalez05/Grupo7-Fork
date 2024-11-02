import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api.js';
// import './StudentForm.css';  

const StudentForm = () => {
  const [student, setStudent] = useState({
    first_name: '',
    last_name: '',
    user_id: '',
    birth_date: '',
    gender: 'male',
    address: '',
    phone_number: '',
    grade: '',  
    enrollment_date: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await api.get(`/student/${id}/`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await api.put(`/student/${id}/`, student);
      } else {
        await api.post('/student/', student);
      }
      navigate('/studentlist');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleBack = () => {
    navigate('/studentlist');
  };

  return (
    <div className="container">
      <h1>{id ? 'Editar' : 'Añadir'} Estudiante</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">Primer nombre:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={student.first_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Apellido:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={student.last_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="user_id">ID Usuario:</label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={student.user_id}
            onChange={handleInputChange}
            required
          />
        </div> 
        <div>
          <label htmlFor="birth_date">Fecha de nacimiento:</label>
          <input
            type="date"
            id="birth_date"
            name="birth_date"
            value={student.birth_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Género:</label>
          <select
            id="gender"
            name="gender"
            value={student.gender}
            onChange={handleInputChange}
          >
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
            <option value="other">Otro</option>
          </select>
        </div>
        <div>
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={student.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Número de teléfono:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={student.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="grade">Grado:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={student.grade}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="enrollment_date">Fecha de inscripción:</label>
          <input
            type="date"
            id="enrollment_date"
            name="enrollment_date"
            value={student.enrollment_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button-container">
          <button type="button" className="back-button" onClick={handleBack}>Atras</button>
          <button type="submit">{id ? 'Actualizar' : 'Añadir'} Estudiante</button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
