"use client";
import { createContext } from "react";
import { useAuthStore } from "./store";
import { Loader2Icon } from "lucide-react";

export const AuthContext = createContext<{
  accessToken?: string;
}>({ accessToken: undefined });

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  return (
    <AuthContext.Provider value={{ accessToken }}>
      {hasHydrated ? (
        children
      ) : (
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <Loader2Icon className="w-10 h-10 animate-spin" />
        </div>
      )}
    </AuthContext.Provider>
  );
};
