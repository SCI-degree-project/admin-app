import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">Página no encontrada</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export { NotFound };
