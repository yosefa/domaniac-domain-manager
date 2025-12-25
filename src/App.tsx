import React, { useState, useEffect, useMemo } from 'react';
import { Domain, Stats } from './types';
import StatsOverview from './components/StatsOverview';
import DomainCard from './components/DomainCard';
import Modal from './components/Modal';
import DomainForm from './components/DomainForm';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { fetchDomains, createDomain, updateDomain, deleteDomain } from './utils/api';

const DomainManager: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<Domain | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'expiryDate' | 'price' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadDomains();
    }
  }, [isAuthenticated]);

  const loadDomains = async () => {
    try {
      setLoading(true);
      const fetchedDomains = await fetchDomains();
      setDomains(fetchedDomains);
    } catch (error) {
      console.error('Failed to load domains:', error);
      showNotification('Failed to load domains', 'error');
    } finally {
      setLoading(false);
    }
  };

  const stats: Stats = useMemo(() => {
    const now = new Date();
    let totalCost = 0;
    let expiringSoon = 0;
    let expired = 0;

    domains.forEach(d => {
      totalCost += d.price;
      const exp = new Date(d.expiryDate);
      const diff = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      if (diff < 0) expired++;
      else if (diff <= 30) expiringSoon++;
    });

    return {
      totalDomains: domains.length,
      totalCost,
      expiringSoon,
      expired
    };
  }, [domains]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddDomain = async (data: Omit<Domain, 'id'>) => {
    try {
      const newDomain = await createDomain(data);
      setDomains(prev => [...prev, newDomain]);
      setIsAddModalOpen(false);
      showNotification(`Domain ${newDomain.name} added successfully!`, 'success');
    } catch (error: any) {
      showNotification(error.message || 'Failed to add domain', 'error');
    }
  };

  const handleUpdateDomain = async (data: Omit<Domain, 'id'>) => {
    if (!editingDomain) return;

    try {
      const updatedDomain = await updateDomain(editingDomain.id, data);
      setDomains(prev => prev.map(d => d.id === editingDomain.id ? { ...updatedDomain, id: editingDomain.id } : d));
      setEditingDomain(undefined);
      setIsAddModalOpen(false);
      showNotification('Domain updated successfully!', 'success');
    } catch (error: any) {
      showNotification(error.message || 'Failed to update domain', 'error');
    }
  };

  const handleDeleteDomain = async (id: string) => {
    if (confirm('Are you sure you want to delete this domain?')) {
      try {
        await deleteDomain(id);
        setDomains(prev => prev.filter(d => d.id !== id));
        showNotification('Domain removed.', 'success');
      } catch (error: any) {
        showNotification(error.message || 'Failed to delete domain', 'error');
      }
    }
  };

  const filteredDomains = useMemo(() => {
    let result = domains.filter(d =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.registrar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortField) {
      result = [...result].sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'name':
            comparison = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            break;
          case 'expiryDate':
            comparison = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [domains, searchTerm, sortField, sortOrder]);

  const handleSortClick = (field: 'name' | 'expiryDate' | 'price') => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const clearSort = () => {
    setSortField(null);
    setSortOrder('asc');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans pb-20">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <i className="fas fa-network-wired text-white text-sm"></i>
              </div>
              <span className="font-bold text-xl tracking-tight">Domaniac</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 hidden sm:block">
                <i className="fas fa-user mr-2"></i>
                {user?.email}
              </span>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
              >
                <i className="fas fa-plus"></i> Add Domain
              </button>
              <button
                onClick={logout}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notification Toast */}
        {notification && (
          <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-2xl z-50 animate-fade-in-up flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
            <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
            {notification.message}
          </div>
        )}

        {/* Stats */}
        <StatsOverview stats={stats} />

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-4 top-3 text-gray-500"></i>
            <input
              type="text"
              placeholder="Search domains, registrars, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2.5 pl-11 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm hidden sm:block">Sort:</span>
            <div className="flex bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <button
                onClick={() => handleSortClick('name')}
                className={`px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 ${sortField === 'name'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                  }`}
              >
                <i className="fas fa-font"></i>
                <span className="hidden sm:inline">Name</span>
                {sortField === 'name' && (
                  <i className={`fas fa-arrow-${sortOrder === 'asc' ? 'up' : 'down'} text-xs`}></i>
                )}
              </button>
              <button
                onClick={() => handleSortClick('expiryDate')}
                className={`px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 border-l border-gray-700 ${sortField === 'expiryDate'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                  }`}
              >
                <i className="fas fa-calendar"></i>
                <span className="hidden sm:inline">Expiry</span>
                {sortField === 'expiryDate' && (
                  <i className={`fas fa-arrow-${sortOrder === 'asc' ? 'up' : 'down'} text-xs`}></i>
                )}
              </button>
              <button
                onClick={() => handleSortClick('price')}
                className={`px-3 py-2 text-sm font-medium transition-all flex items-center gap-1.5 border-l border-gray-700 ${sortField === 'price'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                  }`}
              >
                <i className="fas fa-dollar-sign"></i>
                <span className="hidden sm:inline">Price</span>
                {sortField === 'price' && (
                  <i className={`fas fa-arrow-${sortOrder === 'asc' ? 'up' : 'down'} text-xs`}></i>
                )}
              </button>
            </div>
            {sortField && (
              <button
                onClick={clearSort}
                className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded-lg transition-all"
                title="Clear sort"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <i className="fas fa-spinner fa-spin text-4xl text-indigo-500 mb-4"></i>
            <p className="text-gray-400">Loading domains...</p>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDomains.map(domain => (
              <DomainCard
                key={domain.id}
                domain={domain}
                onEdit={(d) => { setEditingDomain(d); setIsAddModalOpen(true); }}
                onDelete={handleDeleteDomain}
              />
            ))}

            {filteredDomains.length === 0 && !loading && (
              <div className="col-span-full py-20 text-center text-gray-500">
                <i className="fas fa-folder-open text-4xl mb-4 opacity-50"></i>
                <p>No domains found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => { setIsAddModalOpen(false); setEditingDomain(undefined); }}
        title={editingDomain ? 'Edit Domain' : 'Add New Domain'}
      >
        <DomainForm
          initialData={editingDomain}
          onSubmit={editingDomain ? handleUpdateDomain : handleAddDomain}
          onCancel={() => { setIsAddModalOpen(false); setEditingDomain(undefined); }}
        />
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AuthProvider>
      <AuthContent showRegister={showRegister} setShowRegister={setShowRegister} />
    </AuthProvider>
  );
};

const AuthContent: React.FC<{ showRegister: boolean; setShowRegister: (show: boolean) => void }> = ({ showRegister, setShowRegister }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-indigo-500 mb-4"></i>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showRegister ? (
      <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginPage onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return <DomainManager />;
};

export default App;