import React, { useState } from 'react';
import '../assets/styles/styles.css';

const HistoryAverageComponent = ({ currentPGA, creditsSoFar, semester }) => {
  const [desiredAverage, setDesiredAverage] = useState('');
  const [requiredGrade, setRequiredGrade] = useState('');
  const [error, setError] = useState('');

  const calculateSemesterAverage = () => {
    let totalWeightedGrade = 0;
    let totalCredits = 0;

    semester.courses.forEach(course => {
      if (course.wasEvaluated) {
        totalWeightedGrade += course.grade * course.credits;
        totalCredits += course.credits;
      }
    });

    return totalCredits ? (totalWeightedGrade / totalCredits).toFixed(2) : 0;
  };

  const calculateRequiredGrade = () => {
    const desiredPGA = parseFloat(desiredAverage);
    if (isNaN(desiredPGA) || desiredPGA < 0 || desiredPGA > 5) {
      setError('El promedio deseado debe estar entre 0 y 5.');
      return;
    }

    const totalCredits = creditsSoFar + semester.courses.reduce((total, course) => total + course.credits, 0);
    const currentTotalGrade = currentPGA * creditsSoFar;
    const desiredTotalGrade = desiredPGA * totalCredits;
    const remainingCredits = totalCredits - creditsSoFar;

    if (desiredTotalGrade > 5 * totalCredits || desiredTotalGrade < 0) {
      setError('No es posible alcanzar el promedio deseado.');
      return;
    }

    const remainingTotalGrade = desiredTotalGrade - currentTotalGrade;
    const requiredGrade = remainingTotalGrade / remainingCredits;
    setRequiredGrade(requiredGrade.toFixed(2));
    setError('');
  };

  return (
    <div className="course-list">
      <div className="semester-summary">
        <h2>Historico General</h2>
        <p>Promedio Acumulado: {currentPGA}</p>
        <p>Créditos Aprobados: {creditsSoFar}</p>
        <p>Promedio Semestre Actual: {calculateSemesterAverage()}</p>
        <div className="input-container">
          <label>Promedio Deseado:</label>
          <input
            type="number"
            value={desiredAverage}
            onChange={(e) => setDesiredAverage(e.target.value)}
          />
          <button className="calculate-button" onClick={calculateRequiredGrade}>
            Calcular Nota Necesaria
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {requiredGrade && (
          <p>
            <strong>Nota Necesaria:</strong> {requiredGrade}
          </p>
        )}
      </div>
    </div>
  );
};

export default HistoryAverageComponent;
