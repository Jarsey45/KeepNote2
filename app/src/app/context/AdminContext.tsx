'use client';

import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
	isAdmin: boolean;
	setIsAdmin: (value: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children, initialIsAdmin }: { children: React.ReactNode; initialIsAdmin: boolean }) {
	const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

	return <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
	const context = useContext(AdminContext);
	if (context === undefined) {
		throw new Error('useAdmin must be used within an AdminProvider');
	}
	return context;
}
