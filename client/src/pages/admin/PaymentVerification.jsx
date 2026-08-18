import { useState, useEffect } from 'react';
import { Check, X as XIcon, ExternalLink } from 'lucide-react';

export default function PaymentVerification() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const response = await fetch('/api/admin/payments/pending');
      if (!response.ok) throw new Error('Failed to fetch pending payments');
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (paymentId, status) => {
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, rejectionReason: status === 'rejected' ? 'Invalid screenshot or transaction ID' : '' })
      });
      
      if (!response.ok) throw new Error('Failed to update payment status');
      
      // Remove the processed payment from the queue
      setPayments(payments.filter(p => p._id !== paymentId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
          Payment Verification Queue
        </h1>
        <p className="text-slate text-sm">Review uploaded screenshots and approve registrations.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-error/10 text-error rounded-xl">{error}</div>
      ) : payments.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} />
          </div>
          <h2 className="text-xl font-bold text-navy mb-2">All Caught Up!</h2>
          <p className="text-slate">There are no pending payments to verify right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {payments.map((payment) => (
            <div key={payment._id} className="bg-white border border-border rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
              
              {/* Screenshot Column */}
              <div className="md:w-2/5 bg-surface p-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border">
                {payment.screenshotUrl ? (
                  <a href={payment.screenshotUrl} target="_blank" rel="noopener noreferrer" className="relative group block w-full aspect-[3/4] max-h-64 rounded-lg overflow-hidden border border-border/50">
                    <img 
                      src={payment.screenshotUrl} 
                      alt="Payment Screenshot" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-navy/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <ExternalLink className="text-white" size={24} />
                    </div>
                  </a>
                ) : (
                  <div className="w-full aspect-[3/4] max-h-64 rounded-lg bg-border flex items-center justify-center text-slate text-sm text-center p-4">
                    No Screenshot Uploaded
                  </div>
                )}
              </div>

              {/* Details Column */}
              <div className="md:w-3/5 p-5 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono bg-surface px-2 py-1 rounded text-slate-dark">
                      {payment.registrationId?.registrationId || 'Unknown ID'}
                    </span>
                    <span className="text-xs font-medium text-warning flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse"></div>
                      Pending
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-navy mb-4">
                    {payment.registrationId?.fullName || 'Unknown Delegate'}
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between pb-2 border-b border-border/50">
                      <span className="text-slate">Amount</span>
                      <span className="font-semibold text-navy">₹{payment.amount || 1500}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border/50">
                      <span className="text-slate">Transaction ID</span>
                      <span className="font-mono text-navy font-medium select-all">{payment.transactionId}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-border/50">
                      <span className="text-slate">Email</span>
                      <span className="text-navy">{payment.registrationId?.email}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-slate">Date Submitted</span>
                      <span className="text-navy">{new Date(payment.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                  <button 
                    onClick={() => handleVerify(payment._id, 'rejected')}
                    className="flex-1 py-2 flex items-center justify-center gap-2 text-error border border-error/20 hover:bg-error/5 rounded-lg transition-colors font-medium text-sm"
                  >
                    <XIcon size={16} />
                    Reject
                  </button>
                  <button 
                    onClick={() => handleVerify(payment._id, 'verified')}
                    className="flex-1 py-2 flex items-center justify-center gap-2 bg-success text-white hover:bg-success/90 rounded-lg transition-colors font-medium text-sm shadow-sm"
                  >
                    <Check size={16} />
                    Verify
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
