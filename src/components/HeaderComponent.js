import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link
import arrowUpIcon from '../assets/img/arrow.png'; // Importa tu icono
import '../assets/styles/styles.css';

const HeaderComponent = ({ semesterName}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Animación de desplazamiento suave
    });
  };

  return (
    <div className="header">
      <h1>{semesterName}</h1>
      <Link to="/">
        <img
          src={arrowUpIcon}
          alt="Scroll to top"
          className="scroll-to-top"
          onClick={scrollToTop}
        />
      </Link>
    </div>
  );
};

export default HeaderComponent;
