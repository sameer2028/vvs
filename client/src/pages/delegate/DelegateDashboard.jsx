import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, Phone, GraduationCap, Building2,
  CheckCircle2, Clock, XCircle, CreditCard,
  Landmark, ArrowRight, FileText, Shield
} from 'lucide-react';

const statusSteps = [
  { key: 'registered', label: 'Registered', icon: FileText },
  { key: 'payment', label: 'Payment Submitted', icon: CreditCard },
  { key: 'verified', label: 'Payment Verified', icon: CheckCircle2 },
  { key: 'allocated', label: 'Committee Allocated', icon: Landmark },
];

function getActiveStep(regStatus, paymentStatus) {
  if (regStatus === 'allocated') return 4;
  if (regStatus === 'payment_verified' || paymentStatus === 'verified') return 3;
  if (regStatus === 'payment_pending' || paymentStatus === 'pending') return 2;
  return 1;
}

function StatusTimeline({ activeStep, paymentRejected }) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
      {statusSteps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < activeStep;
        const isActive = stepNumber === activeStep;
        const Icon = step.icon;

        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted
                    ? 'bg-success text-white border-success'
                    : isActive
                    ? 'bg-gold text-white border-gold shadow-md shadow-gold/20'
                    : 'bg-surface text-slate-light border-border'
                } ${paymentRejected && stepNumber === 2 ? 'bg-error text-white border-error' : ''}`}
              >
                {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
              </div>
              <span className={`text-[10px] sm:text-xs mt-2 font-medium text-center max-w-[80px] ${
                isCompleted ? 'text-success' : isActive ? 'text-navy' : 'text-slate-light'
              }`}>
                {step.label}
              </span>
            </div>
            {index < statusSteps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mt-[-20px] ${
                stepNumber < activeStep ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center shrink-0">
        <Icon size={16} className="text-gold" />
      </div>
      <div>
        <p className="text-xs text-slate font-medium">{label}</p>
        <p className="text-sm text-navy font-semibold">{value || '—'}</p>
      </div>
    </div>
  );
}

export default function DelegateDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/delegate/me`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="p-6 bg-error-light text-error rounded-xl">{error}</div>
      </div>
    );
  }

  const reg = data.registration;
  const payment = data.payment;
  const activeStep = getActiveStep(reg.status, payment?.status);
  const paymentRejected = payment?.status === 'rejected';

  const munExpLabels = {
    'first': 'First Time',
    '1-2': '1–2 MUNs',
    '3-5': '3–5 MUNs',
    '5plus': '5+ MUNs'
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                Welcome, {reg.fullName}!
              </h1>
              <p className="text-slate text-sm mt-1">
                Registration ID: <span className="font-mono font-bold text-gold tracking-wider">{reg.registrationId}</span>
              </p>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
              reg.status === 'allocated' ? 'bg-success-light text-success' :
              reg.status === 'payment_verified' ? 'bg-info-light text-info' :
              reg.status === 'payment_rejected' ? 'bg-error-light text-error' :
              reg.status === 'payment_pending' ? 'bg-warning-light text-warning' :
              'bg-surface text-slate'
            }`}>
              {reg.status === 'allocated' && <CheckCircle2 size={14} />}
              {reg.status === 'payment_pending' && <Clock size={14} />}
              {reg.status === 'payment_rejected' && <XCircle size={14} />}
              {reg.status.replace(/_/g, ' ')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm"
      >
        <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-slate mb-6 text-center">
          Your Journey
        </h2>
        <StatusTimeline activeStep={activeStep} paymentRejected={paymentRejected} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-navy mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Registration Details
          </h2>
          <div className="space-y-4">
            <InfoCard icon={User} label="Full Name" value={reg.fullName} />
            <InfoCard icon={Mail} label="Email" value={reg.email} />
            <InfoCard icon={Phone} label="Phone" value={reg.phone} />
            <InfoCard icon={Building2} label="Institution" value={reg.institution} />
            <InfoCard icon={GraduationCap} label="Class / Year" value={reg.classYear} />
            <InfoCard icon={Shield} label="MUN Experience" value={munExpLabels[reg.munExperience] || reg.munExperience} />
          </div>
        </motion.div>

        {/* Committee Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-navy mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Committee Preferences
          </h2>
          <div className="space-y-5">
            <div className="p-4 bg-surface rounded-xl border border-border">
              <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Preference 1</p>
              <p className="text-sm font-bold text-navy">{reg.committeePref1?.name || '—'}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-slate">
                  Portfolio 1: <span className="font-medium text-navy">{reg.portfolioPref1Comm1?.name || '—'}</span>
                </p>
                <p className="text-xs text-slate">
                  Portfolio 2: <span className="font-medium text-navy">{reg.portfolioPref2Comm1?.name || '—'}</span>
                </p>
              </div>
            </div>
            <div className="p-4 bg-surface rounded-xl border border-border">
              <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Preference 2</p>
              <p className="text-sm font-bold text-navy">{reg.committeePref2?.name || '—'}</p>
              <div className="mt-2 space-y-1">
                <p className="text-xs text-slate">
                  Portfolio 1: <span className="font-medium text-navy">{reg.portfolioPref1Comm2?.name || '—'}</span>
                </p>
                <p className="text-xs text-slate">
                  Portfolio 2: <span className="font-medium text-navy">{reg.portfolioPref2Comm2?.name || '—'}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-navy mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Payment Status
          </h2>
          {payment ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  payment.status === 'verified' ? 'bg-success' :
                  payment.status === 'rejected' ? 'bg-error' :
                  'bg-warning animate-pulse'
                }`} />
                <span className={`text-sm font-bold capitalize ${
                  payment.status === 'verified' ? 'text-success' :
                  payment.status === 'rejected' ? 'text-error' :
                  'text-warning'
                }`}>
                  {payment.status}
                </span>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-border space-y-2">
                <p className="text-xs text-slate">Amount: <span className="font-bold text-navy">₹{payment.amount}</span></p>
                <p className="text-xs text-slate">Transaction ID: <span className="font-mono font-bold text-navy">{payment.transactionId}</span></p>
              </div>
              {payment.status === 'rejected' && (
                <div className="p-4 bg-error-light rounded-xl border border-error/20">
                  <p className="text-sm text-error font-medium">
                    Rejection Reason: {payment.rejectionReason || 'Not specified'}
                  </p>
                  <Link
                    to="/delegate/payment"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-error hover:text-error/80 transition-colors"
                  >
                    Resubmit Payment <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-warning-light flex items-center justify-center mx-auto mb-4">
                <CreditCard size={28} className="text-warning" />
              </div>
              <p className="text-sm text-slate mb-4">No payment submitted yet.</p>
              <Link
                to="/delegate/payment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-colors"
              >
                Submit Payment
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Committee Allocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl border border-border p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-navy mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
            Committee Allocation
          </h2>
          {reg.assignedCommittee ? (
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-br from-navy to-navy-light rounded-xl text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Assigned Committee</p>
                <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {reg.assignedCommittee.name}
                </p>
                {reg.assignedCommittee.agenda && (
                  <p className="text-xs text-white/70 mt-2 leading-relaxed">{reg.assignedCommittee.agenda}</p>
                )}
              </div>
              {reg.assignedPortfolio && (
                <div className="p-4 bg-gold-subtle rounded-xl border border-gold/20">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark mb-1">Assigned Portfolio</p>
                  <p className="text-lg font-bold text-navy">{reg.assignedPortfolio.name}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                <Landmark size={28} className="text-slate-light" />
              </div>
              <p className="text-sm text-slate">Committee allocation is pending.</p>
              <p className="text-xs text-slate-light mt-1">You will be notified once your committee is assigned.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
