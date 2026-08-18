import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Stepper from './Stepper';

const steps = [
  'Personal',
  'Identity',
  'Committees',
  'Portfolios',
  'Additional',
  'Payment'
];

export default function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    institution: '',
    classYear: '',
    studentIdUrl: '',
    committeePref1: '',
    committeePref2: '',
    portfolioPref1Comm1: '',
    portfolioPref2Comm1: '',
    portfolioPref1Comm2: '',
    portfolioPref2Comm2: '',
    munExperience: '',
    referralCode: '',
    marketingSource: '',
    needsAccommodation: false,
    transactionId: '',
    screenshotUrl: ''
  });

  const [committees, setCommittees] = useState([]);
  const [portfolios1, setPortfolios1] = useState([]);
  const [portfolios2, setPortfolios2] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [comRes, setRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL || ''}/api/committees`),
          fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`)
        ]);
        
        const comData = await comRes.json();
        const setData = await setRes.json();
        
        setCommittees(comData);
        setSettings(setData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch initial data", error);
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch portfolios when committee preferences change
  React.useEffect(() => {
    const fetchPortfolios = async (committeeId, setter) => {
      if (!committeeId) {
        setter([]);
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/portfolios?committeeId=${committeeId}`);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Failed to fetch portfolios", error);
      }
    };

    fetchPortfolios(formData.committeePref1, setPortfolios1);
  }, [formData.committeePref1]);

  React.useEffect(() => {
    const fetchPortfolios = async (committeeId, setter) => {
      if (!committeeId) {
        setter([]);
        return;
      }
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/portfolios?committeeId=${committeeId}`);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error("Failed to fetch portfolios", error);
      }
    };

    fetchPortfolios(formData.committeePref2, setPortfolios2);
  }, [formData.committeePref2]);

  const validateStep = () => {
    switch (currentStep) {
      case 0:
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.institution || !formData.classYear) {
          setSubmitError('Please fill in all required fields (marked with *).');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setSubmitError('Passwords do not match.');
          return false;
        }
        break;
      case 1:
        if (!formData.studentIdUrl) {
          setSubmitError('Please upload your Student ID.');
          return false;
        }
        break;
      case 2:
        if (!formData.committeePref1 || !formData.committeePref2) {
          setSubmitError('Please select both committee preferences.');
          return false;
        }
        if (formData.committeePref1 === formData.committeePref2) {
          setSubmitError('Committee preferences cannot be the same.');
          return false;
        }
        break;
      case 3:
        if (!formData.portfolioPref1Comm1 || !formData.portfolioPref2Comm1 || !formData.portfolioPref1Comm2 || !formData.portfolioPref2Comm2) {
          setSubmitError('Please select all portfolio preferences.');
          return false;
        }
        break;
      case 4:
        if (!formData.munExperience) {
          setSubmitError('Please select your MUN experience.');
          return false;
        }
        break;
      default:
        break;
    }
    setSubmitError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep() && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [generatedRegistrationId, setGeneratedRegistrationId] = useState('');

  const handleSubmit = async () => {
    if (!formData.transactionId || !formData.screenshotUrl) {
      setSubmitError('Please provide Transaction ID and upload the payment screenshot.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Submit Registration & Payment together
      const payload = {
        ...formData,
        amount: 1500 // Or get from settings
      };

      const regResponse = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const regData = await regResponse.json();

      if (!regResponse.ok) {
        throw new Error(regData.message || 'Registration failed');
      }
      
      setGeneratedRegistrationId(regData.registrationId);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [uploadingField, setUploadingField] = useState(null);

  const handleUploadImage = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingField(fieldName);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/upload/public`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Upload failed');
      
      setFormData(prev => ({ ...prev, [fieldName]: data.url }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingField(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (settings && !settings.registrationOpen) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-border p-10 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-slate-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-navy mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Registration Closed</h2>
        <p className="text-slate">We are no longer accepting new delegate registrations for {settings.eventName || 'this event'}. Stay tuned for future announcements.</p>
        <button onClick={() => window.location.href = '/'} className="mt-8 px-6 py-2.5 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition">Return to Home</button>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-border p-10 text-center shadow-sm">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-3xl font-bold text-navy mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Registration Submitted!</h2>
        <p className="text-slate text-lg mb-8">Thank you for applying to Vasant Vaani Sansad 2.0. We will verify your payment and notify you regarding committee allocations soon.</p>
        
        {/* Credentials Box */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-navy mb-4 text-center">Your Login Credentials</h3>
          <p className="text-sm text-slate text-center mb-4">
            You can log into the Delegate Portal using your email and the password you just created. Please save this Registration ID for any support queries!
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-border/50">
              <span className="text-sm font-medium text-slate">Email</span>
              <span className="font-semibold text-navy">{formData.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate">Registration ID</span>
              <span className="font-mono font-bold text-gold text-lg tracking-wider bg-gold-subtle px-3 py-1 rounded-md">
                {generatedRegistrationId}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => window.location.href = '/'} className="px-6 py-3 border border-border text-navy font-medium rounded-lg hover:bg-surface transition w-full sm:w-auto">Return to Home</button>
          <button onClick={() => window.location.href = '/delegate/login'} className="px-6 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition w-full sm:w-auto">Login to Delegate Portal</button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>Personal Details</h2>
            {submitError && <div className="p-3 bg-error/10 border border-error/20 text-error rounded-lg text-sm">{submitError}</div>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="off" className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Create Password *</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="new-password" className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Confirm Password *</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} autoComplete="new-password" className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Institution/School *</label>
                <input type="text" name="institution" value={formData.institution} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Class/Year *</label>
                <input type="text" name="classYear" value={formData.classYear} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" placeholder="e.g. 12th Grade, 2nd Year BA" required />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button onClick={nextStep} className="px-6 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition">Next Step</button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>Identity Verification</h2>
            {submitError && <div className="p-3 bg-error/10 border border-error/20 text-error rounded-lg text-sm">{submitError}</div>}
            <p className="text-slate">Please upload a clear photo of your student ID card.</p>
            
            <div className="border-2 border-dashed border-border rounded-xl p-10 text-center bg-surface relative group overflow-hidden">
              {formData.studentIdUrl ? (
                <img src={formData.studentIdUrl} alt="Student ID" className="max-h-48 mx-auto object-contain" />
              ) : (
                <>
                  <ImageIcon size={32} className="mx-auto text-slate-light mb-3" />
                  <p className="text-slate-dark font-medium">Click to upload ID Card Image</p>
                  <p className="text-sm text-slate mt-1">JPEG, PNG, WEBP</p>
                </>
              )}
              
              <label className={`absolute inset-0 bg-navy/60 transition-opacity flex flex-col items-center justify-center text-white ${uploadingField === 'studentIdUrl' ? 'opacity-100 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100 cursor-pointer'}`}>
                {uploadingField === 'studentIdUrl' ? (
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mb-2" />
                    <span className="font-medium">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="mb-2" />
                    <span className="font-medium">{formData.studentIdUrl ? 'Change Image' : 'Upload Image'}</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUploadImage(e, 'studentIdUrl')}
                  disabled={uploadingField === 'studentIdUrl'}
                />
              </label>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="px-6 py-3 border border-border text-navy font-medium rounded-lg hover:bg-surface transition">Back</button>
              <button onClick={nextStep} className="px-6 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition">Next Step</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>Committee Preferences</h2>
            {submitError && <div className="p-3 bg-error/10 border border-error/20 text-error rounded-lg text-sm">{submitError}</div>}
            <p className="text-slate">Select your top 2 committee preferences.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Preference 1 *</label>
                <select name="committeePref1" value={formData.committeePref1} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required>
                  <option value="">Select Committee</option>
                  {committees.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Preference 2 *</label>
                <select name="committeePref2" value={formData.committeePref2} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required>
                  <option value="">Select Committee</option>
                  {committees.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="px-6 py-3 border border-border text-navy font-medium rounded-lg hover:bg-surface transition">Back</button>
              <button onClick={nextStep} className="px-6 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition">Next Step</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>Portfolio Preferences</h2>
            {submitError && <div className="p-3 bg-error/10 border border-error/20 text-error rounded-lg text-sm">{submitError}</div>}
            <p className="text-slate">Choose your portfolio/country preferences for your selected committees.</p>
            <div className="space-y-6">
              <div className="p-4 bg-surface rounded-xl border border-border">
                <h3 className="font-semibold text-navy mb-3">Committee 1: {committees.find(c => c._id === formData.committeePref1)?.name || 'Not selected'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-navy">Preference 1 *</label>
                    <select name="portfolioPref1Comm1" value={formData.portfolioPref1Comm1} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold" required disabled={!formData.committeePref1}>
                      <option value="">Select Portfolio</option>
                      {portfolios1.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-navy">Preference 2 *</label>
                    <select name="portfolioPref2Comm1" value={formData.portfolioPref2Comm1} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold" required disabled={!formData.committeePref1}>
                      <option value="">Select Portfolio</option>
                      {portfolios1.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-border">
                <h3 className="font-semibold text-navy mb-3">Committee 2: {committees.find(c => c._id === formData.committeePref2)?.name || 'Not selected'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-navy">Preference 1 *</label>
                    <select name="portfolioPref1Comm2" value={formData.portfolioPref1Comm2} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold" required disabled={!formData.committeePref2}>
                      <option value="">Select Portfolio</option>
                      {portfolios2.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-navy">Preference 2 *</label>
                    <select name="portfolioPref2Comm2" value={formData.portfolioPref2Comm2} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold" required disabled={!formData.committeePref2}>
                      <option value="">Select Portfolio</option>
                      {portfolios2.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="px-6 py-3 border border-border text-navy font-medium rounded-lg hover:bg-surface transition">Back</button>
              <button onClick={nextStep} className="px-6 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition">Next Step</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>Additional Info</h2>
            {submitError && <div className="p-3 bg-error/10 border border-error/20 text-error rounded-lg text-sm">{submitError}</div>}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">MUN Experience *</label>
                <select name="munExperience" value={formData.munExperience} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" required>
                  <option value="">Select Experience Level</option>
                  <option value="first">First Timer</option>
                  <option value="1-2">1-2 MUNs</option>
                  <option value="3-5">3-5 MUNs</option>
                  <option value="5plus">More than 5 MUNs</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">Referral Code (Optional)</label>
                <input type="text" name="referralCode" value={formData.referralCode} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Enter code if any" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-navy">How did you hear about us?</label>
                <input type="text" name="marketingSource" value={formData.marketingSource} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" placeholder="Instagram, Friend, Campus Ambassador, etc." />
              </div>
              <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-surface transition">
                <input type="checkbox" name="needsAccommodation" checked={formData.needsAccommodation} onChange={handleChange} className="w-5 h-5 text-gold rounded border-slate focus:ring-gold" />
                <div>
                  <div className="font-semibold text-navy">I require accommodation</div>
                  <div className="text-sm text-slate">Additional charges will apply for 2 nights stay.</div>
                </div>
              </label>
            </div>
            <div className="flex justify-between pt-4">
              <button onClick={prevStep} className="px-6 py-3 border border-border text-navy font-medium rounded-lg hover:bg-surface transition">Back</button>
              <button onClick={nextStep} className="px-6 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-light transition">Next Step</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>Payment Verification</h2>
            {submitError && <div className="p-3 bg-error/10 border border-error/20 text-error rounded-lg text-sm">{submitError}</div>}
            <p className="text-slate">Please transfer the registration fee of <strong className="text-navy">₹{settings?.registrationFee || 1500}</strong> to complete your application.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface p-6 rounded-xl border border-border flex flex-col items-center text-center">
                <div className="w-32 h-32 bg-white rounded-lg border border-border shadow-sm flex items-center justify-center mb-4">
                  <span className="text-slate font-medium">QR Code</span>
                </div>
                <div className="font-bold text-navy">{settings?.upiId || 'vkm@upi'}</div>
                <p className="text-sm text-slate mt-1">Scan to pay via any UPI app</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-navy">Transaction ID (UTR) *</label>
                  <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} className="w-full p-3 border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-gold" placeholder="12-digit UPI Ref No." required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-navy">Payment Screenshot *</label>
                  <div className="border-2 border-dashed border-border rounded-xl h-32 text-center bg-surface relative group overflow-hidden flex items-center justify-center">
                    {formData.screenshotUrl ? (
                      <img src={formData.screenshotUrl} alt="Payment Screenshot" className="max-h-full mx-auto object-contain" />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon size={24} className="mx-auto text-slate-light mb-2" />
                        <p className="text-xs font-medium text-slate-dark">Click to upload screenshot</p>
                      </div>
                    )}
                    <label className={`absolute inset-0 bg-navy/60 transition-opacity flex flex-col items-center justify-center text-white ${uploadingField === 'screenshotUrl' ? 'opacity-100 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100 cursor-pointer'}`}>
                      {uploadingField === 'screenshotUrl' ? (
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mb-1" />
                          <span className="text-xs font-medium">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={20} className="mb-1" />
                          <span className="text-xs font-medium">{formData.screenshotUrl ? 'Change' : 'Upload'}</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleUploadImage(e, 'screenshotUrl')}
                        disabled={uploadingField === 'screenshotUrl'}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 gap-2 sm:gap-4">
              <button onClick={prevStep} className="px-4 sm:px-6 py-3 border border-border text-navy font-medium rounded-lg hover:bg-surface transition whitespace-nowrap" disabled={isSubmitting || uploadingField !== null}>Back</button>
              <button onClick={handleSubmit} disabled={isSubmitting || uploadingField !== null} className="px-4 sm:px-6 py-3 bg-gold text-white font-medium rounded-lg hover:bg-gold-light transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base">
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10 sm:mb-16">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      <div className="bg-white rounded-2xl border border-border p-6 sm:p-10 shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
