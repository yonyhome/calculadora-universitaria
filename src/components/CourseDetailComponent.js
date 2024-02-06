import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/styles/styles.css';

const CourseDetailComponent = ({ courses, semesterCourses, updateSemesterCourses }) => {
  const { id } = useParams();
  const detailedCourse = courses.find(course => course.id === id);
  const semesterCourse = semesterCourses.find(course => course.id === id);

  const [tempCourseComponents, setTempCourseComponents] = useState(null);
  const [initialCourseComponents, setInitialCourseComponents] = useState([]);
  const [courseAverage, setCourseAverage] = useState(0);

  useEffect(() => {
    // Al cargar el componente, almacenamos los valores originales del curso
    const initialComponents = detailedCourse?.components || [];
    setInitialCourseComponents(initialComponents);
    setTempCourseComponents(initialComponents);
    setCourseAverage(calculateCourseAverage(initialComponents));
  }, [detailedCourse]);

  const calculateCourseAverage = (components) => {
    if (!components || components.length === 0) {
      return 0; // Valor predeterminado si no hay componentes
    }
  
    let totalWeightedGrade = 0;
    let totalWeight = 0;
  
    components.forEach(component => {
      totalWeightedGrade += component.grade * component.weight;
      totalWeight += component.weight;
    });
  
    return totalWeight !== 0 ? totalWeightedGrade / totalWeight : 0;
  };

  const handleGradeChange = (index, newGrade) => {
    const updatedComponents = [...tempCourseComponents];
    updatedComponents[index].grade = parseFloat(newGrade);
    setTempCourseComponents(updatedComponents);
  };

  const handleWeightChange = (index, newWeight) => {
    const updatedComponents = [...tempCourseComponents];
    updatedComponents[index].weight = parseFloat(newWeight);
    setTempCourseComponents(updatedComponents);
  };

  const handleRecalculate = () => {
    if (!tempCourseComponents) return;

    // Validaciones de notas y pesos
    const totalWeight = tempCourseComponents.reduce((acc, component) => acc + component.weight, 0);
    const isWeightValid = totalWeight === 100;
    const isGradeValid = tempCourseComponents.every(component => component.grade >= 0 && component.grade <= 5);

    if (!isWeightValid || !isGradeValid) {
      alert('Los datos ingresados no son válidos. Por favor, corríjalos.');
      // Restaurar los valores iniciales
      setTempCourseComponents(initialCourseComponents.map(component => ({ ...component })));
      window.location.reload();
      return;
    }

    // Lógica de actualización
    updateSemesterCourses(id, tempCourseComponents);
    setCourseAverage(calculateCourseAverage(tempCourseComponents));
    alert('El promedio del curso se ha actualizado correctamente.');
  };

  const renderComponentList = () => {
    return (
      <table className="course-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Calificación</th>
            <th>Peso</th>
            <th>Evaluado</th>
          </tr>
        </thead>
        <tbody>
          {tempCourseComponents && tempCourseComponents.map((component, index) => (
            <tr key={component.id}>
              <td>{component.name}</td>
              <td>
                <input
                  type="number"
                  value={component.grade}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                  disabled={component.wasEvaluated}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={component.weight}
                  onChange={(e) => handleWeightChange(index, e.target.value)}
                  disabled={component.wasEvaluated}
                />
              </td>
              <td>
                <input type="checkbox" checked={component.wasEvaluated} disabled />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderRecalculateButton = () => {
    if (!tempCourseComponents) return null;
  
    const hasUngradedComponents = tempCourseComponents.some(component => !component.wasEvaluated);
    
    if (!hasUngradedComponents) return null;
  
    return (
      <button className="recalculate-button" onClick={handleRecalculate}>Simular Promedio</button>
    );
  };
  
  return (
    <div className="course-list">
      <div className="course-detail">
        <h2>Detalles del Curso: {detailedCourse?.name}</h2>
        <p className="left-align"><strong>Créditos:</strong> {semesterCourse?.credits}</p>
        <p className="left-align"><strong>Calificación:</strong> {courseAverage}</p>
        
        <h3>Componentes del Curso:</h3>
        {renderComponentList()}
  
        {renderRecalculateButton()}
      </div>
    </div>
  );
}  

export default CourseDetailComponent;
