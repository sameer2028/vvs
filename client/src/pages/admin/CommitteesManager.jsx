import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommitteesManager() {
  const [committees, setCommittees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'youth_parliament',
    capacity: 50,
    description: '',
    agenda: ''
  });

  const fetchCommittees = async () => {
    try {
      const response = await fetch('/api/committees');
      if (!response.ok) throw new Error('Failed to fetch committees');
      const data = await response.json();
      setCommittees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommittees();
  }, []);

  const handleOpenModal = (committee = null) => {
    if (committee) {
      setEditingCommittee(committee);
      setFormData({
        name: committee.name,
        slug: committee.slug,
        category: committee.category || 'youth_parliament',
        capacity: committee.capacity || 50,
        description: committee.description || '',
        agenda: committee.agenda || ''
      });
    } else {
      setEditingCommittee(null);
      setFormData({ name: '', slug: '', category: 'youth_parliament', capacity: 50, description: '', agenda: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCommittee(null);
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: !editingCommittee ? generateSlug(name) : prev.slug
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCommittee ? `/api/committees/${editingCommittee._id}` : '/api/committees';
      const method = editingCommittee ? 'PUT' : 'POST';
      
      const payload = { ...formData, capacity: Number(formData.capacity) };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to save committee');
      }

      await fetchCommittees();
      handleCloseModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This will also delete all its portfolios.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/committees/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete committee');
      setCommittees(committees.filter(c => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
            Committee Management
          </h1>
          <p className="text-slate text-sm">Create, edit, and manage MUN committees</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-navy text-white rounded-lg font-medium hover:bg-navy-light transition-colors"
        >
          <Plus size={18} />
          New Committee
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-error/10 text-error rounded-xl">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {committees.map((committee) => (
            <div key={committee._id} className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                    committee.category === 'youth_parliament' ? 'bg-blue-100 text-blue-700' : 
                    committee.category === 'global_diplomacy' ? 'bg-purple-100 text-purple-700' :
                    'bg-slate/10 text-slate-dark'
                  }`}>
                    {committee.category.replace('_', ' ')}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => handleOpenModal(committee)} className="p-1.5 text-slate hover:text-navy bg-surface hover:bg-border rounded transition-colors">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(committee._id, committee.name)} className="p-1.5 text-slate hover:text-error bg-surface hover:bg-error/10 rounded transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {committee.name}
                </h3>
                <div className="text-xs font-medium text-slate mb-3">Capacity: {committee.capacity || 50} Delegates</div>
                <p className="text-sm text-slate line-clamp-2 mb-3">
                  {committee.description || 'No description provided.'}
                </p>
              </div>
              <div className="p-4 border-t border-border bg-surface flex justify-between items-center">
                <Link 
                  to={`/admin/committees/${committee._id}/portfolios`}
                  className="flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-colors"
                >
                  <Users size={16} />
                  Manage Portfolios &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-navy/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                {editingCommittee ? 'Edit Committee' : 'Create Committee'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate hover:text-error transition-colors">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Committee Name *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-surface"
                  placeholder="e.g. UN General Assembly"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">URL Slug *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Category *</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-surface"
                  >
                    <option value="youth_parliament">Youth Parliament</option>
                    <option value="global_diplomacy">Global Diplomacy</option>
                    <option value="media">Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Agenda *</label>
                <input 
                  type="text" 
                  required
                  value={formData.agenda}
                  onChange={(e) => setFormData({...formData, agenda: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-surface"
                  placeholder="e.g. Discussing global climate policies"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-navy mb-1">Capacity *</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-surface"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Description *</label>
                <textarea 
                  rows="4"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-surface resize-none"
                  placeholder="Detailed description of the committee..."
                ></textarea>
              </div>
            </form>
            
            <div className="px-6 py-4 border-t border-border bg-surface flex justify-end gap-3">
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="px-4 py-2 border border-border rounded-lg text-slate-dark hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                onClick={handleSubmit}
                className="px-4 py-2 bg-navy text-white rounded-lg font-medium hover:bg-navy-light transition-colors"
              >
                {editingCommittee ? 'Save Changes' : 'Create Committee'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
