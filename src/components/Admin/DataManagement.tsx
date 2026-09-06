import React, { useState, useEffect } from 'react';
import { Database, Download, Upload, RefreshCw, AlertTriangle, FileJson, Server } from 'lucide-react';
import toast from 'react-hot-toast';

const DataManagement = () => {
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    const cols = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('hb_')) {
        const data = localStorage.getItem(key) || '[]';
        let parsed = [];
        try { parsed = JSON.parse(data); } catch (e) {}
        cols.push({
          name: key,
          count: Array.isArray(parsed) ? parsed.length : 1,
          size: (data.length / 1024).toFixed(2)
        });
      }
    }
    setCollections(cols.sort((a, b) => b.count - a.count));
  }, []);

  const handleBackup = () => {
    const backupData: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('hb_')) {
        backupData[key] = localStorage.getItem(key) || '';
      }
    }
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `healthbridge_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast.success('Backup downloaded successfully');
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        Object.keys(data).forEach(key => {
          if (key.startsWith('hb_')) {
            localStorage.setItem(key, data[key]);
          }
        });
        toast.success('Data restored successfully. Please reload.');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        toast.error('Invalid backup file');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if(window.confirm('Are you sure you want to reset all data? This cannot be undone.')){
      Object.keys(localStorage).forEach(key => {
        if(key.startsWith('hb_')) localStorage.removeItem(key);
      });
      toast.success('Data reset. Reloading...');
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h1 className="section-title">Data Management</h1>
        <p className="text-[var(--text-secondary)]">Manage database collections, backups, and integrity</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex flex-col items-center text-center p-6 cursor-pointer hover:border-blue-500 transition-all hover:-translate-y-1" onClick={handleBackup}>
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
            <Download size={32} />
          </div>
          <h3 className="font-semibold mb-2 text-lg">Export Backup</h3>
          <p className="text-sm text-[var(--text-secondary)]">Download all platform data as JSON</p>
        </div>
        
        <label className="card flex flex-col items-center text-center p-6 cursor-pointer hover:border-emerald-500 transition-all hover:-translate-y-1 relative">
          <input type="file" accept=".json" className="hidden" onChange={handleRestore} />
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-500">
            <Upload size={32} />
          </div>
          <h3 className="font-semibold mb-2 text-lg">Restore Data</h3>
          <p className="text-sm text-[var(--text-secondary)]">Upload a previous JSON backup</p>
        </label>

        <div className="card flex flex-col items-center text-center p-6 cursor-pointer hover:border-red-500 transition-all hover:-translate-y-1" onClick={handleReset}>
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 text-red-500">
            <AlertTriangle size={32} />
          </div>
          <h3 className="font-semibold mb-2 text-red-500 text-lg">Factory Reset</h3>
          <p className="text-sm text-[var(--text-secondary)]">Clear all local storage data</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
          <Server className="text-amber-500" />
          Local Collections Overview
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)]">
                <th className="table-header">Collection Name</th>
                <th className="table-header text-right">Records</th>
                <th className="table-header text-right">Size (KB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {collections.map((col) => (
                <tr key={col.name} className="hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="table-cell font-mono text-sm flex items-center gap-3">
                    <FileJson size={16} className="text-blue-500" />
                    {col.name}
                  </td>
                  <td className="table-cell text-right font-medium">{col.count}</td>
                  <td className="table-cell text-right text-[var(--text-secondary)]">{col.size}</td>
                </tr>
              ))}
              {collections.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-[var(--text-muted)]">No data collections found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
