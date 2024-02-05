// CourseListComponent.js
import React from 'react';
import { Link } from 'react-router-dom';

const CourseListComponent = ({ courses }) => {
  return (
    <div className="course-list">
      <h2>Materias Registradas</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {/* Enlace que lleva al usuario a la vista de detalles del curso */}
            <Link to={`/course/${course.id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseListComponent;
