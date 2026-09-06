import React, { createContext, useContext, useState, useCallback } from 'react';
import type { EmergencyState } from '../utils/types';

interface EmergencyContextType {
  emergency: EmergencyState;
  triggerEmergency: (state: Omit<EmergencyState, 'isActive'>) => void;
  dismissEmergency: () => void;
}

const EmergencyContext = createContext<EmergencyContextType>({
  emergency: { isActive: false },
  triggerEmergency: () => {},
  dismissEmergency: () => {},
});

export function EmergencyProvider({ children }: { children: React.ReactNode }) {
  const [emergency, setEmergency] = useState<EmergencyState>({ isActive: false });

  const triggerEmergency = useCallback((state: Omit<EmergencyState, 'isActive'>) => {
    setEmergency({ ...state, isActive: true, timestamp: new Date().toISOString() });
  }, []);

  const dismissEmergency = useCallback(() => {
    setEmergency({ isActive: false });
  }, []);

  return (
    <EmergencyContext.Provider value={{ emergency, triggerEmergency, dismissEmergency }}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  return useContext(EmergencyContext);
}
