import React, { createContext, useContext, useState, useEffect } from "react";
import { onUserStateChange } from "../modules/auth/services/authService";

interface TenantContextType {
  tenantId: string | null;
}

const TenantContext = createContext<TenantContextType>({ tenantId: null });

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenantId, setTenantId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onUserStateChange((user) => {
      if (user) {
        setTenantId("3fa85f64-5717-4562-b3fc-2c963f66afa6");
      } else {
        setTenantId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <TenantContext.Provider value={{ tenantId }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
