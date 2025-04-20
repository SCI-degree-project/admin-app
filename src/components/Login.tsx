import React from "react";
import { signInWithGoogle } from "../services/authService";

const Login: React.FC = () => {
  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      alert(`Bienvenido ${user.displayName}`);
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Iniciar sesión
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Usa tu cuenta de Google para continuar
        </p>
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Login;
