import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent';
import CourseListComponent from './components/CourseListComponent';
import SemesterSummaryComponent from './components/SemesterSummaryComponent';
import CourseDetailComponent from './components/CourseDetailComponent';
import data from './fake-data.json';

function App() {
  return (
    <Router>
      <div className="App">
        <HeaderComponent semesterName={data.semester.name} />
        <Routes>
          <Route path="/">
            <Route
              index
              element={<CourseListComponent courses={data.semester.courses} />}
            />
            <Route
              path="/"
              element={<SemesterSummaryComponent
                semesterAverage={data.currentPGA}
                cumulativeAverage={data.creditsSoFar} />}
            />
          </Route>
          <Route
            path="/course/:id"
            element={<CourseDetailComponent
              courses={data.courses}
              semesterCourses={data.semester.courses}
            />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
