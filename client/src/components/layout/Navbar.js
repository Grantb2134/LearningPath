import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav id="nav">
      <Link className="button" to="/">LearningPath</Link>
      <ul>
        <Link className="button" to="/">
          Login
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
