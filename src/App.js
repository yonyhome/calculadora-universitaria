import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/styles.css';
import HeaderComponent from './components/HeaderComponent';
import CourseListComponent from './components/CourseListComponent';
import CourseDetailComponent from './components/CourseDetailComponent';
import data from './fake-data.json';
import HistoryAvergeComponent from './components/HistoyAverageComponent';

function App() {
  const [semesterCourses, setSemesterCourses] = useState(data.semester.courses);

  const updateSemesterCourses = (id, newComponents) => {
    const updatedSemesterCourses = [...semesterCourses];
    const index = updatedSemesterCourses.findIndex(course => course.id === id);
    updatedSemesterCourses[index].components = [...newComponents];

    // Recalcular el promedio del curso y actualizar el estado global del semestre
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    updatedSemesterCourses[index].components.forEach(component => {
      totalWeightedGrade += component.grade * component.weight;
      totalWeight += component.weight;
    });

    const newCourseGrade = totalWeight !== 0 ? totalWeightedGrade / totalWeight : 0;
    updatedSemesterCourses[index].grade = newCourseGrade;

    setSemesterCourses(updatedSemesterCourses);
  };

  return (
    <div className="glass-container">
      <Router>
        <div className="App">
          <HeaderComponent semesterName={data.semester.name } />
          <Routes>
            <Route
              path="/"
              element={(
                <>
                  
                  <CourseListComponent
                    courses={semesterCourses}
                    updateSemesterCourses={updateSemesterCourses}
                    semestre={data.semester.name}
                  />
                </>
              )}
            />
            <Route
              path="/course/:id"
              element={<CourseDetailComponent
                courses={data.courses}
                semesterCourses={semesterCourses}
                updateSemesterCourses={updateSemesterCourses}
              />}
            />
            <Route
              path="/average-history"
              element={<HistoryAvergeComponent
                currentPGA={data.currentPGA}
                creditsSoFar={data.creditsSoFar}
                courses={data.courses}
                semester={data.semester}
              />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
