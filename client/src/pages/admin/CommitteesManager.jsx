import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Users, Upload, X, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminFetch } from '../../utils/adminFetch';

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

  // Board Members state
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const [boardCommittee, setBoardCommittee] = useState(null);
  const [boardMembers, setBoardMembers] = useState([]);
  const [boardLoading, setBoardLoading] = useState(false);
  const [boardForm, setBoardForm] = useState({ name: '', post: '', photoUrl: '', order: 0 });
  const [editingMember, setEditingMember] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const fetchCommittees = async () => {
    try {
      const response = await adminFetch(`${import.meta.env.VITE_API_URL || ''}/api/committees`);
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

      const response = await adminFetch(url, {
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
      const response = await adminFetch(`${import.meta.env.VITE_API_URL || ''}/api/committees/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete committee');
      setCommittees(committees.filter(c => c._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ── Board Member Handlers ──────────────────────────────────
  const openBoardModal = async (committee) => {
    setBoardCommittee(committee);
    setBoardModalOpen(true);
    setBoardLoading(true);
    try {
      const res = await adminFetch(`${import.meta.env.VITE_API_URL || ''}/api/board-members/${committee._id}`);
      if (res.ok) setBoardMembers(await res.json());
    } catch { setBoardMembers([]); }
    finally { setBoardLoading(false); }
  };

  const closeBoardModal = () => {
    setBoardModalOpen(false);
    setBoardCommittee(null);
    setBoardMembers([]);
    setEditingMember(null);
    setBoardForm({ name: '', post: '', photoUrl: '', order: 0 });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await adminFetch(`${import.meta.env.VITE_API_URL || ''}/api/upload`, {
        method: 'POST', body: fd
      });
      if (res.ok) {
        const data = await res.json();
        setBoardForm(prev => ({ ...prev, photoUrl: data.url }));
      } else { alert('Upload failed'); }
    } catch { alert('Upload error'); }
    finally { setUploadingPhoto(false); }
  };

  const handleBoardSubmit = async (e) => {
    e.preventDefault();
    if (!boardCommittee) return;
    try {
      const url = editingMember
        ? `${import.meta.env.VITE_API_URL || ''}/api/board-members/${editingMember._id}`
        : `${import.meta.env.VITE_API_URL || ''}/api/board-members`;
      const method = editingMember ? 'PUT' : 'POST';
      const payload = { ...boardForm, committeeId: boardCommittee._id, order: Number(boardForm.order) };
      const res = await adminFetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed');
      // Refresh list
      const listRes = await adminFetch(`${import.meta.env.VITE_API_URL || ''}/api/board-members/${boardCommittee._id}`);
      if (listRes.ok) setBoardMembers(await listRes.json());
      setEditingMember(null);
      setBoardForm({ name: '', post: '', photoUrl: '', order: 0 });
    } catch (err) { alert(err.message); }
  };

  const handleBoardEdit = (member) => {
    setEditingMember(member);
    setBoardForm({ name: member.name, post: member.post, photoUrl: member.photoUrl || '', order: member.order || 0 });
  };

  const handleBoardDelete = async (id) => {
    if (!window.confirm('Delete this board member?')) return;
    try {
      await adminFetch(`${import.meta.env.VITE_API_URL || ''}/api/board-members/${id}`, { method: 'DELETE' });
      setBoardMembers(prev => prev.filter(m => m._id !== id));
    } catch { alert('Delete failed'); }
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
              <div className="p-4 border-t border-border bg-surface flex justify-between items-center gap-2">
                <Link 
                  to={`/admin/committees/${committee._id}/portfolios`}
                  className="flex items-center gap-2 text-sm font-medium text-navy hover:text-gold transition-colors"
                >
                  <Users size={16} />
                  Portfolios &rarr;
                </Link>
                <button
                  onClick={() => openBoardModal(committee)}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#2c72b8] hover:text-[#14284b] transition-colors"
                >
                  <UserCircle size={16} />
                  Board
                </button>
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

      {/* ── Board Members Modal ───────────────────────────────── */}
      {boardModalOpen && boardCommittee && (
        <div className="fixed inset-0 bg-navy/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-lg font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                Board Members — {boardCommittee.name}
              </h2>
              <button onClick={closeBoardModal} className="text-slate hover:text-error transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Add / Edit Form */}
              <form onSubmit={handleBoardSubmit} className="bg-surface rounded-xl border border-border p-4 space-y-3">
                <p className="text-sm font-semibold text-navy">
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text" required placeholder="Name"
                    value={boardForm.name}
                    onChange={(e) => setBoardForm({ ...boardForm, name: e.target.value })}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-white text-sm"
                  />
                  <input
                    type="text" required placeholder="Post (e.g. Chairperson)"
                    value={boardForm.post}
                    onChange={(e) => setBoardForm({ ...boardForm, post: e.target.value })}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-white text-sm"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg bg-white cursor-pointer hover:bg-surface transition-colors text-sm">
                    <Upload size={14} className="text-slate" />
                    {uploadingPhoto ? 'Uploading...' : 'Photo'}
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploadingPhoto} />
                  </label>
                  {boardForm.photoUrl && (
                    <img src={boardForm.photoUrl} alt="Preview" className="w-12 h-14 rounded-lg object-cover border border-border shadow-sm" />
                  )}
                  <input
                    type="number" placeholder="Order" min="0"
                    value={boardForm.order}
                    onChange={(e) => setBoardForm({ ...boardForm, order: e.target.value })}
                    className="w-20 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-white text-sm"
                  />
                  <div className="flex-1" />
                  {editingMember && (
                    <button type="button" onClick={() => { setEditingMember(null); setBoardForm({ name: '', post: '', photoUrl: '', order: 0 }); }}
                      className="text-xs text-slate hover:text-error">Cancel</button>
                  )}
                  <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-light transition-colors">
                    {editingMember ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>

              {/* Members List */}
              {boardLoading ? (
                <div className="flex justify-center py-6">
                  <div className="w-6 h-6 border-3 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
              ) : boardMembers.length === 0 ? (
                <p className="text-center text-slate text-sm py-4">No board members added yet.</p>
              ) : (
                <div className="space-y-2">
                  {boardMembers.map((m) => (
                    <div key={m._id} className="flex items-center gap-3 bg-white border border-border rounded-lg p-3">
                      <div className="w-10 h-12 rounded-lg bg-surface border border-border-light flex items-center justify-center overflow-hidden flex-shrink-0">
                        {m.photoUrl ? (
                          <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" />
                        ) : (
                          <UserCircle size={20} className="text-slate-light" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-navy truncate">{m.name}</p>
                        <p className="text-xs text-gold">{m.post}</p>
                      </div>
                      <span className="text-xs text-slate-light">#{m.order || 0}</span>
                      <button onClick={() => handleBoardEdit(m)} className="p-1.5 text-slate hover:text-navy bg-surface hover:bg-border rounded transition-colors">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => handleBoardDelete(m._id)} className="p-1.5 text-slate hover:text-error bg-surface hover:bg-error/10 rounded transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
