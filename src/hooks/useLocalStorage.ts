import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value;
      localStorage.setItem(key, JSON.stringify(newValue));
      return newValue;
    });
  }, [key]);

  return [storedValue, setValue];
}

export function useRealTimeData<T>(key: string, intervalMs: number = 3000): T | null {
  const [data, setData] = useState<T | null>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const item = localStorage.getItem(key);
        if (item) setData(JSON.parse(item));
      } catch { /* ignore */ }
    }, intervalMs);
    return () => clearInterval(interval);
  }, [key, intervalMs]);

  return data;
}

export function useSimulatedVitals() {
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: { systolic: 130, diastolic: 82 },
    spo2: 96,
    temperature: 36.8,
    glucose: 142,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: Math.max(40, Math.min(180, prev.heartRate + Math.round(Math.random() * 6 - 3))),
        bloodPressure: {
          systolic: Math.max(70, Math.min(200, prev.bloodPressure.systolic + Math.round(Math.random() * 4 - 2))),
          diastolic: Math.max(40, Math.min(120, prev.bloodPressure.diastolic + Math.round(Math.random() * 4 - 2))),
        },
        spo2: Math.max(80, Math.min(100, prev.spo2 + Math.round(Math.random() * 2 - 1))),
        temperature: Math.max(35, Math.min(40, +(prev.temperature + (Math.random() * 0.2 - 0.1)).toFixed(1))),
        glucose: Math.max(50, Math.min(400, prev.glucose + Math.round(Math.random() * 6 - 3))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return vitals;
}

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('Now');
        clearInterval(interval);
        return;
      }
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${hours}h ${mins}m ${secs}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
