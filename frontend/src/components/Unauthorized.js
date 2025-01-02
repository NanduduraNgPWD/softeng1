import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <div className='text-center'>
    <h1>403 - Access Denied</h1>
    <p>You do not have permission to view this page.</p>
    <Link to="/">Go back</Link>
  </div>
);

export default Unauthorized;
