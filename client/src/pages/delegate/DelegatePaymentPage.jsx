import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, CreditCard, CheckCircle2, Copy, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DelegatePaymentPage() {
  const [settings, setSettings] = useState(null);
  const [transactionId, setTransactionId] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { delegate } = useAuth();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include',  credentials: 'include' });
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const copyUpi = () => {
    if (settings?.upiId) {
      navigator.clipboard.writeText(settings.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUploadScreenshot = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/upload/payment`, { credentials: 'include', 
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      setScreenshotUrl(data.url);
    } catch (err) {
      setError('Failed to upload screenshot: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!screenshotUrl) {
      setError('Please upload a payment screenshot.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/payments`, { credentials: 'include', 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationId: delegate._id,
          amount: settings?.registrationFee || 1500,
          transactionId,
          screenshotUrl
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Payment submission failed');

      navigate('/delegate');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!settings) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <Link
        to="/delegate"
        className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-navy transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-navy mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          Submit Payment
        </h1>
        <p className="text-sm text-slate mb-6">
          Pay the registration fee of <span className="font-bold text-navy">₹{settings.registrationFee}</span> using UPI and submit the proof below.
        </p>

        {/* UPI Details */}
        <div className="p-5 bg-gradient-to-br from-surface to-ivory rounded-xl border border-border mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate mb-3">Pay via UPI</p>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 px-4 py-3 bg-white rounded-lg border border-border font-mono text-sm text-navy font-bold">
              {settings.upiId || 'vkm@upi'}
            </div>
            <button
              onClick={copyUpi}
              className="flex items-center gap-1.5 px-4 py-3 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {settings.upiQrUrl && (
            <div className="flex justify-center">
              <img src={settings.upiQrUrl} alt="UPI QR Code" className="w-48 h-48 object-contain rounded-lg border border-border" />
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 bg-error-light text-error text-sm rounded-lg mb-4">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">UPI Transaction ID / Reference No.</label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g. 123456789012"
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-1.5">Payment Screenshot</label>
            <div className="w-full h-48 bg-surface border-2 border-dashed border-border rounded-xl overflow-hidden relative group">
              {screenshotUrl ? (
                <img src={screenshotUrl} alt="Payment screenshot" className="w-full h-full object-contain" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate">
                  <CreditCard size={32} className="mb-2 text-slate-light" />
                  <span className="text-sm font-medium">No screenshot uploaded</span>
                </div>
              )}
              <label className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                <Upload size={24} className="mb-1" />
                <span className="text-sm font-medium">{screenshotUrl ? 'Change Screenshot' : 'Upload Screenshot'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadScreenshot}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4
              bg-gold text-navy font-bold rounded-xl
              hover:bg-gold-light transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Submit Payment Proof
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Upload overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium text-navy">Uploading screenshot...</span>
          </div>
        </div>
      )}
    </div>
  );
}
