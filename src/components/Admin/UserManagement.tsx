import React, { useState } from 'react';
import { Search, UserPlus, Edit2, Trash2, Shield, MoreVertical } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Modal from '../Common/Modal';

const UserManagement = () => {
  const [users, setUsers] = useLocalStorage('hb_users', [
    { id: '1', name: 'Dr. Sarah Smith', email: 'sarah@healthbridge.com', role: 'Doctor', status: 'Active' },
    { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Patient', status: 'Active' },
    { id: '3', name: 'Admin User', email: 'admin@healthbridge.com', role: 'Admin', status: 'Active' },
    { id: '4', name: 'Gov Official', email: 'official@gov.in', role: 'Government', status: 'Inactive' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Patient' });

  const filteredUsers = users.filter((u: any) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: Date.now().toString(), status: 'Active' }]);
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Patient' });
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'Patient': return 'badge-info';
      case 'Doctor': return 'badge-brand';
      case 'Government': return 'badge-warning';
      case 'Admin': return 'bg-amber-500/20 text-amber-500 border border-amber-500/30';
      default: return 'badge';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="section-title">User Management</h1>
          <p className="text-[var(--text-secondary)]">Manage platform users and access controls</p>
        </div>
        <button className="btn-primary flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={18} />
          Add User
        </button>
      </header>

      <div className="card p-0 overflow-hidden border border-[var(--border-color)]">
        <div className="p-4 border-b border-[var(--border-color)] flex gap-4 bg-[var(--bg-secondary)]/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input
              type="text"
              placeholder="Search users..."
              className="input-field pl-10 w-full bg-[var(--bg-card)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)]">
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Role</th>
                <th className="table-header">Status</th>
                <th className="table-header text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filteredUsers.map((user: any) => (
                <tr key={user.id} className="hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="table-cell font-medium">{user.name}</td>
                  <td className="table-cell text-[var(--text-secondary)]">{user.email}</td>
                  <td className="table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`flex items-center gap-1.5 text-sm ${user.status === 'Active' ? 'text-emerald-500' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-500'}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="table-cell text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-amber-500 transition-colors" title="Manage Permissions">
                        <Shield size={16} />
                      </button>
                      <button className="p-2 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-blue-500 transition-colors" title="Edit User">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)] hover:text-red-500 transition-colors" title="Delete User"
                        onClick={() => setUsers(users.filter((u: any) => u.id !== user.id))}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-[var(--text-muted)]">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New User">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Full Name</label>
            <input required type="text" className="input-field w-full" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email Address</label>
            <input required type="email" className="input-field w-full" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Role</label>
            <select className="input-field w-full" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})}>
              <option value="Patient">Patient</option>
              <option value="Doctor">Doctor</option>
              <option value="Government">Government</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" className="btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary bg-amber-500 hover:bg-amber-600 text-white">Create User</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagement;
