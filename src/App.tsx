import { useEffect, useState } from "react";
import { onUserStateChange, logout } from "./services/authService";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onUserStateChange(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div className="p-4">
          <h1 className="text-xl">Hola, {user.displayName}</h1>
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
