import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetailComponent = ({ courses, semesterCourses }) => {
  // Obtener el parámetro de la URL para encontrar el curso específico
  const { id } = useParams();

  // Buscar el curso en la lista de cursos detallados
  const detailedCourse = courses.find(course => course.id === id);

  // Buscar el curso en la lista de cursos del semestre
  const semesterCourse = semesterCourses.find(course => course.id === id);

  if (!detailedCourse || !semesterCourse) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <div className="course-detail">
      <h2>Detalles del Curso: {detailedCourse.name}</h2>
      <p>Créditos: {semesterCourse.credits}</p>
      <p>Calificación: {semesterCourse.grade}</p>
      <h3>Componentes del Curso:</h3>
      <ul>
        {detailedCourse.components.map(component => (
          <li key={component.id}>
            <p>Nombre: {component.name}</p>
            <p>Calificación: {component.grade}</p>
            <p>Peso: {component.weight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetailComponent;
