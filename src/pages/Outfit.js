import React from 'react';
import { Link } from 'react-router-dom';

function Outfit() {
  return (
    <div>
      <h1>Outfit</h1>
      <div>
        <Link to="/closet">Closet</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </div>

  );
}

export default Outfit;