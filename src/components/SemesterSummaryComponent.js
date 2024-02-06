import React from 'react';
import '../assets/styles/styles.css';
const SemesterSummaryComponent = ({ semesterAverage, cumulativeAverage: creditsofar }) => {
  return (
    <div className="semester-summary">
      <h2>Resumen del Semestre</h2>
      <p>Promedio Acumulado: {semesterAverage}</p>
      <p>Creditos Aprovados: {creditsofar}</p>
    </div>
  );
};

export default SemesterSummaryComponent;
