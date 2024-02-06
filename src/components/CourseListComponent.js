import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/styles.css';

const CourseListComponent = ({ courses }) => {
  return (
    <div className="course-list">
      <h2>Materias Registradas</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>Nombre del Curso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>
                <Link to={`/course/${course.id}`}>Ver Detalles</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseListComponent;
