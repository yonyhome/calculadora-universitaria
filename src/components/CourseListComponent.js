import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/styles.css';

const CourseListComponent = ({ courses, semestre }) => {
  return (
    <div className="course-list">
      <h2>Materias Registradas {semestre}</h2>
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
      <Link to="/average-history">
        <button className="recalculate-button">ver promedio historico</button>
      </Link>
    </div>
  );
};

export default CourseListComponent;
