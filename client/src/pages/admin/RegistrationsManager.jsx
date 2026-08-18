import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Download, X } from 'lucide-react';

export default function RegistrationsManager() {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReg, setSelectedReg] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/registrations`, { credentials: 'include',  credentials: 'include' });
        if (!response.ok) throw new Error('Failed to fetch registrations');
        const data = await response.json();
        setRegistrations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const filteredData = registrations.filter(reg => 
    reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.registrationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ['Name,Reg ID,Email,Status,Comm Pref 1,Comm Pref 2,Port Pref 1,Port Pref 2'];
    const rows = filteredData.map(reg => {
      return [
        `"${reg.fullName}"`,
        `"${reg.registrationId}"`,
        `"${reg.email}"`,
        `"${reg.status}"`,
        `"${reg.committeePref1?.name || ''}"`,
        `"${reg.committeePref2?.name || ''}"`,
        `"${reg.portfolioPref1Comm1?.name || ''}"`,
        `"${reg.portfolioPref1Comm2?.name || ''}"`
      ].join(',');
    });
    
    const csvContent = headers.concat(rows).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
            Registrations
          </h1>
          <p className="text-slate text-sm">Manage all delegate registrations</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border rounded-lg text-sm font-medium text-navy hover:bg-surface transition-colors"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" size={18} />
            <input 
              type="text"
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold bg-surface"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg bg-surface text-navy hover:bg-border/50 transition-colors">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {isLoading ? (
          <div className="p-10 flex justify-center">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="p-10 text-center text-error">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-navy">
              <thead className="bg-surface text-slate uppercase text-xs">
                <tr>
                  <th className="px-5 py-3 font-medium">Delegate</th>
                  <th className="px-5 py-3 font-medium">Reg ID</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Committee Pref 1</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-slate">No matching registrations.</td>
                  </tr>
                ) : (
                  filteredData.map((reg) => (
                    <tr key={reg._id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-medium text-navy">{reg.fullName}</div>
                        <div className="text-xs text-slate">{reg.email}</div>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs">{reg.registrationId}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reg.status === 'payment_verified' ? 'bg-success/10 text-success' :
                          reg.status === 'payment_pending' ? 'bg-warning/10 text-warning' :
                          reg.status === 'payment_rejected' ? 'bg-error/10 text-error' :
                          'bg-slate/10 text-slate-dark'
                        }`}>
                          {reg.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate">
                        {reg.committeePref1?.name || 'N/A'}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button 
                          onClick={() => setSelectedReg(reg)}
                          className="p-2 text-slate hover:text-navy bg-surface hover:bg-border rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Registration Details Modal */}
      {selectedReg && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                  Registration Details
                </h2>
                <p className="text-slate text-sm">ID: {selectedReg.registrationId}</p>
              </div>
              <button 
                onClick={() => setSelectedReg(null)}
                className="p-2 text-slate hover:text-navy hover:bg-surface rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="space-y-4">
                  <h3 className="font-bold text-navy uppercase tracking-wider text-sm pb-2 border-b border-border">Personal Information</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate text-sm">Full Name:</span>
                    <span className="col-span-2 font-medium">{selectedReg.fullName}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate text-sm">Email:</span>
                    <span className="col-span-2 font-medium">{selectedReg.email}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate text-sm">Phone:</span>
                    <span className="col-span-2 font-medium">{selectedReg.phoneNumber}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate text-sm">Institution:</span>
                    <span className="col-span-2 font-medium">{selectedReg.institution}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate text-sm">Gender:</span>
                    <span className="col-span-2 font-medium">{selectedReg.gender}</span>
                  </div>
                </div>

                {/* Status & Accommodation */}
                <div className="space-y-4">
                  <h3 className="font-bold text-navy uppercase tracking-wider text-sm pb-2 border-b border-border">Status</h3>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <span className="text-slate text-sm">Status:</span>
                    <span className="col-span-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedReg.status === 'payment_verified' ? 'bg-success/10 text-success' :
                        selectedReg.status === 'payment_pending' ? 'bg-warning/10 text-warning' :
                        selectedReg.status === 'payment_rejected' ? 'bg-error/10 text-error' :
                        'bg-slate/10 text-slate-dark'
                      }`}>
                        {selectedReg.status.replace('_', ' ')}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <span className="text-slate text-sm">Role:</span>
                    <span className="col-span-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold/20 text-navy">
                        {selectedReg.allottedRole ? 'Allocated' : 'Pending Allocation'}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-slate text-sm">Accommodation:</span>
                    <span className="col-span-2 font-medium">{selectedReg.accommodationRequired ? 'Yes' : 'No'}</span>
                  </div>
                </div>

                {/* Preferences */}
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <h3 className="font-bold text-navy uppercase tracking-wider text-sm pb-2 border-b border-border">Committee & Portfolio Preferences</h3>
                  
                  <div className="bg-surface/50 p-4 rounded-xl border border-border">
                    <p className="text-xs text-slate uppercase font-bold mb-2">Preference 1</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate text-sm block">Committee:</span>
                        <span className="font-medium">{selectedReg.committeePref1?.name || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-slate text-sm block">Portfolio:</span>
                        <span className="font-medium">{selectedReg.portfolioPref1Comm1?.name || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface/50 p-4 rounded-xl border border-border">
                    <p className="text-xs text-slate uppercase font-bold mb-2">Preference 2</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-slate text-sm block">Committee:</span>
                        <span className="font-medium">{selectedReg.committeePref2?.name || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-slate text-sm block">Portfolio:</span>
                        <span className="font-medium">{selectedReg.portfolioPref1Comm2?.name || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* MUN Experience */}
                <div className="col-span-1 md:col-span-2 space-y-4">
                  <h3 className="font-bold text-navy uppercase tracking-wider text-sm pb-2 border-b border-border">MUN Experience</h3>
                  <div className="bg-surface/50 p-4 rounded-xl border border-border">
                    <p className="text-sm whitespace-pre-wrap">{selectedReg.pastExperience || 'No past experience provided.'}</p>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-border bg-surface/30 flex justify-end">
              <button 
                onClick={() => setSelectedReg(null)}
                className="px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
