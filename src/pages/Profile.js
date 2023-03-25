import React from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <div>
        <Link to="/closet">Closet</Link>
      </div>
      <div>
        <Link to="/outfit">Outfit</Link>
      </div>

    </div>
  );
}

export default Profile;