import React from 'react';

const SemesterSummaryComponent = ({ semesterAverage, cumulativeAverage }) => {
  return (
    <div className="semester-summary">
      <h2>Resumen del Semestre</h2>
      <p>Promedio del Semestre: {semesterAverage}</p>
      <p>Promedio Acumulado: {cumulativeAverage}</p>
    </div>
  );
};

export default SemesterSummaryComponent;
