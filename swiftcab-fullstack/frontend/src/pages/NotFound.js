import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="text-primary text-7xl mb-6">
          <i className="fas fa-map-marked-alt"></i>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray text-xl mb-8 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 