import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

export default function PortfolioManager() {
  const { id } = useParams();
  const [committee, setCommittee] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  
  const [formData, setFormData] = useState({ name: '' });

  const fetchData = async () => {
    try {
      // We don't have a GET /api/committees/:id endpoint (only slug), so we'll fetch all and filter for now, 
      // or fetch the portfolios directly which populates the committee details.
      const response = await fetch(`/api/portfolios?committeeId=${id}`);
      if (!response.ok) throw new Error('Failed to fetch portfolios');
      const data = await response.json();
      
      setPortfolios(data);
      if (data.length > 0) {
        setCommittee(data[0].committeeId);
      } else {
        // Fallback: If no portfolios exist, we need the committee name.
        // Let's fetch all committees to find this one.
        const commResponse = await fetch('/api/committees');
        const commData = await commResponse.json();
        const found = commData.find(c => c._id === id);
        if (found) setCommittee(found);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleOpenModal = (portfolio = null) => {
    if (portfolio) {
      setEditingPortfolio(portfolio);
      setFormData({ name: portfolio.name });
    } else {
      setEditingPortfolio(null);
      setFormData({ name: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPortfolio(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPortfolio ? `/api/portfolios/${editingPortfolio._id}` : '/api/portfolios';
      const method = editingPortfolio ? 'PUT' : 'POST';
      
      const payload = {
        name: formData.name,
        committeeId: id
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save portfolio');
      
      await fetchData();
      handleCloseModal();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (portfolioId, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const response = await fetch(`/api/portfolios/${portfolioId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete portfolio');
      setPortfolios(portfolios.filter(p => p._id !== portfolioId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin/committees" className="inline-flex items-center gap-2 text-sm text-slate hover:text-navy transition-colors mb-4">
          <ArrowLeft size={16} />
          Back to Committees
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {committee?.name || 'Committee'} Portfolios
            </h1>
            <p className="text-slate text-sm">Manage countries and roles for this committee</p>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-navy text-white rounded-lg font-medium hover:bg-navy-light transition-colors"
          >
            <Plus size={18} />
            Add Portfolio
          </button>
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-error/10 text-error rounded-xl">{error}</div>
      ) : (
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center bg-surface">
            <span className="font-medium text-navy text-sm">
              Total: {portfolios.length} Portfolios
            </span>
          </div>
          
          <ul className="divide-y divide-border">
            {portfolios.length === 0 ? (
              <li className="p-8 text-center text-slate">No portfolios added yet.</li>
            ) : (
              portfolios.map(portfolio => (
                <li key={portfolio._id} className="p-4 flex items-center justify-between hover:bg-surface/50 transition-colors">
                  <div className="font-medium text-navy">{portfolio.name}</div>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(portfolio)} className="p-2 text-slate hover:text-navy bg-white border border-border hover:border-navy/30 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(portfolio._id, portfolio.name)} className="p-2 text-slate hover:text-error bg-white border border-border hover:border-error/30 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-navy/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                {editingPortfolio ? 'Edit Portfolio' : 'Add Portfolio'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate hover:text-error transition-colors">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-navy mb-1">Portfolio Name *</label>
                <input 
                  type="text" 
                  required
                  autoFocus
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-surface"
                  placeholder="e.g. Delegate of France"
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-border rounded-lg text-slate-dark hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-navy text-white rounded-lg font-medium hover:bg-navy-light transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
