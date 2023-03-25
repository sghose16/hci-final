import React from 'react';
import { Link } from 'react-router-dom';

function Closet() {
  return (
    <div>
      <h1>Closet</h1>
      <div>
        <Link to="/outfit">Outfit</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default Closet;