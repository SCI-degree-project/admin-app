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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Iniciar sesión con Google</h1>
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default Login;
