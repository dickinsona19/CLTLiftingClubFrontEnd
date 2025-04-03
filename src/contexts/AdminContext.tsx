import { createContext, useContext, ReactNode } from 'react';
import { create } from 'zustand';

interface AdminUser {
  id: string;
  email: string;
  role: string;
}

interface AdminStore {
  user: AdminUser | null;
  setUser: (user: AdminUser | null) => void;
  selectedUser: any | null;
  setSelectedUser: (user: any | null) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

const AdminContext = createContext<AdminStore | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AdminContext.Provider value={useAdminStore}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};