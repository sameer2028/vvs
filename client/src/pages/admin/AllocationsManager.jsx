import { useState, useEffect } from 'react';
import { CheckCircle, Search, Filter, Download } from 'lucide-react';

export default function AllocationsManager() {
  const [delegates, setDelegates] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [portfolios, setPortfolios] = useState({}); // mapped by committeeId
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [selectedDelegate, setSelectedDelegate] = useState(null);
  const [allocationForm, setAllocationForm] = useState({
    committeeId: '',
    portfolioId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch delegates needing allocation or already allocated
      const delRes = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/allocations`, { credentials: 'include',  credentials: 'include' });
      if (!delRes.ok) throw new Error('Failed to fetch allocations');
      const delData = await delRes.json();
      setDelegates(delData);

      // Fetch all active committees
      const comRes = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/committees`, { credentials: 'include',  credentials: 'include' });
      if (!comRes.ok) throw new Error('Failed to fetch committees');
      const comData = await comRes.json();
      setCommittees(comData);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch portfolios dynamically when a committee is selected in the form
  useEffect(() => {
    if (allocationForm.committeeId && !portfolios[allocationForm.committeeId]) {
      fetchPortfolios(allocationForm.committeeId);
    }
  }, [allocationForm.committeeId]);

  const fetchPortfolios = async (committeeId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/portfolios?committeeId=${committeeId}`, { credentials: 'include',  credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch portfolios');
      const data = await res.json();
      setPortfolios(prev => ({ ...prev, [committeeId]: data }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectDelegate = (delegate) => {
    setSelectedDelegate(delegate);
    setAllocationForm({
      committeeId: delegate.assignedCommittee?._id || delegate.committeePref1?._id || '',
      portfolioId: delegate.assignedPortfolio?._id || ''
    });
  };

  const handleAllocate = async (e) => {
    e.preventDefault();
    if (!allocationForm.committeeId || !allocationForm.portfolioId) {
      alert("Please select both a committee and a portfolio.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/allocations/${selectedDelegate._id}`, { credentials: 'include', 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          committeeId: allocationForm.committeeId,
          portfolioId: allocationForm.portfolioId
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to allocate delegate');
      }

      // Update local state without refetching everything
      setDelegates(delegates.map(d => {
        if (d._id === selectedDelegate._id) {
          return {
            ...d,
            status: 'allocated',
            assignedCommittee: committees.find(c => c._id === allocationForm.committeeId),
            assignedPortfolio: portfolios[allocationForm.committeeId]?.find(p => p._id === allocationForm.portfolioId)
          };
        }
        return d;
      }));

      setSelectedDelegate(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pendingAllocations = delegates.filter(d => d.status === 'payment_verified').length;

  const handleExportCSV = () => {
    const headers = ['Name,Reg ID,Status,Pref 1 Comm,Pref 1 Port,Pref 2 Comm,Pref 2 Port,Assigned Comm,Assigned Port'];
    const rows = delegates.map(d => {
      return [
        `"${d.fullName}"`,
        `"${d.registrationId}"`,
        `"${d.status}"`,
        `"${d.committeePref1?.name || ''}"`,
        `"${d.portfolioPref1Comm1?.name || ''}"`,
        `"${d.committeePref2?.name || ''}"`,
        `"${d.portfolioPref1Comm2?.name || ''}"`,
        `"${d.assignedCommittee?.name || ''}"`,
        `"${d.assignedPortfolio?.name || ''}"`
      ].join(',');
    });
    const csvContent = headers.concat(rows).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "allocations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
            Delegate Allocations
          </h1>
          <p className="text-slate text-sm">Assign verified delegates to their final committees and portfolios.</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-navy hover:bg-surface transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-error/10 text-error rounded-xl">{error}</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          
          {/* Left Column: Delegate List */}
          <div className="lg:w-2/3 bg-white border border-border rounded-xl flex flex-col overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
              <div className="font-medium text-navy">
                {pendingAllocations} Pending Allocations
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" size={16} />
                <input 
                  type="text"
                  placeholder="Search delegates..."
                  className="pl-9 pr-4 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-white"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto flex-1">
              {delegates.length === 0 ? (
                <div className="p-8 text-center text-slate">No verified delegates found.</div>
              ) : (
                <ul className="divide-y divide-border">
                  {delegates.map(delegate => (
                    <li 
                      key={delegate._id} 
                      onClick={() => handleSelectDelegate(delegate)}
                      className={`p-4 cursor-pointer transition-colors ${selectedDelegate?._id === delegate._id ? 'bg-gold/10 border-l-4 border-gold' : 'hover:bg-surface border-l-4 border-transparent'}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-navy">{delegate.fullName}</div>
                          <div className="text-xs text-slate font-mono">{delegate.registrationId}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          delegate.status === 'allocated' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning-dark'
                        }`}>
                          {delegate.status === 'allocated' ? 'Allocated' : 'Needs Allocation'}
                        </span>
                      </div>
                      
                      <div className="text-xs text-slate mt-2 space-y-1">
                        <div className="flex gap-2">
                          <span className="font-medium w-12">Pref 1:</span>
                          <span className="truncate">{delegate.committeePref1?.name} ({delegate.portfolioPref1Comm1?.name})</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium w-12">Pref 2:</span>
                          <span className="truncate">{delegate.committeePref2?.name} ({delegate.portfolioPref1Comm2?.name})</span>
                        </div>
                        {delegate.status === 'allocated' && delegate.assignedCommittee && (
                          <div className="flex gap-2 mt-2 pt-2 border-t border-border">
                            <span className="font-medium w-12 text-success">Assigned:</span>
                            <span className="truncate font-medium text-navy">{delegate.assignedCommittee.name} ({delegate.assignedPortfolio?.name})</span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Column: Allocation Panel */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-white border border-border rounded-xl p-5 shadow-sm sticky top-6">
              <h2 className="font-bold text-navy text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Allocation Panel
              </h2>
              
              {!selectedDelegate ? (
                <div className="text-center p-6 text-slate text-sm bg-surface rounded-lg border border-dashed border-border">
                  Select a delegate from the list to assign their committee and portfolio.
                </div>
              ) : (
                <form onSubmit={handleAllocate} className="space-y-4">
                  <div className="mb-4">
                    <div className="text-sm font-medium text-navy mb-1">Allocating for:</div>
                    <div className="p-3 bg-surface rounded-lg border border-border font-medium text-navy">
                      {selectedDelegate.fullName}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Select Committee</label>
                    <select 
                      value={allocationForm.committeeId}
                      onChange={(e) => setAllocationForm({ ...allocationForm, committeeId: e.target.value, portfolioId: '' })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-white"
                      required
                    >
                      <option value="" disabled>-- Select Committee --</option>
                      {committees.map(c => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy mb-1">Select Portfolio</label>
                    <select 
                      value={allocationForm.portfolioId}
                      onChange={(e) => setAllocationForm({ ...allocationForm, portfolioId: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-white"
                      required
                      disabled={!allocationForm.committeeId || !portfolios[allocationForm.committeeId]}
                    >
                      <option value="" disabled>-- Select Portfolio --</option>
                      {portfolios[allocationForm.committeeId]?.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                    {!allocationForm.committeeId && (
                      <p className="text-xs text-slate mt-1">Select a committee first to load portfolios.</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting || !allocationForm.committeeId || !allocationForm.portfolioId}
                      className="w-full py-2.5 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Saving...' : (
                        <>
                          <CheckCircle size={18} />
                          Finalize Allocation
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
