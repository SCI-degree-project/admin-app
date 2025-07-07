import React, { createContext, useContext, useState, useEffect } from "react";
import { onUserStateChange } from "../modules/auth/services/authService";

interface TenantContextType {
  tenantId: string | null;
  role: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenantId: null,
  role: null,
});

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onUserStateChange(async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        const claims = token.claims;

        setTenantId(claims.tenantId || null);
        setRole(claims.role || null);
      } else {
        setTenantId(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <TenantContext.Provider value={{ tenantId, role }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
