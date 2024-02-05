import React from 'react';

const HeaderComponent = ({ semesterName }) => {
  return (
    <div className="header">
      <h1>{semesterName}</h1>
    </div>
  );
};

export default HeaderComponent;
