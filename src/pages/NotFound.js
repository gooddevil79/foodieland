import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = function () {
  return (
    <div>
      <h2>Page Not Found! 404 @_@</h2>
      <p>
        Go to the <Link to={'/'}>Homepage</Link>.
      </p>
    </div>
  );
};

export default NotFound;
