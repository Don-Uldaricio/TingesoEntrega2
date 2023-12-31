import React from 'react';
import { Link } from 'react-router-dom'; // Asumiendo que estás usando react-router para la navegación

const NavBar = () => {
  return (
    <nav className="flex bg-blue-600 text-white p-3 justify-center font-bold">
      <ul className="flex flex-row w-[60%]">
        <li><Link to="/">Top Education</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
