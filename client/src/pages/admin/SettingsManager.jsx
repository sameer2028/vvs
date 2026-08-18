import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Settings, MessageCircleQuestion, Bell, Users, Image as ImageIcon, Upload } from 'lucide-react';

export default function SettingsManager() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include',  credentials: 'include' });
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      
      // Formatting dates for inputs
      if (data.startDate) data.startDate = data.startDate.split('T')[0];
      if (data.endDate) data.endDate = data.endDate.split('T')[0];
      if (data.registrationDeadline) data.registrationDeadline = data.registrationDeadline.split('T')[0];
      
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include', 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      
      if (!response.ok) throw new Error('Failed to save settings');
      alert('Settings saved successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // FAQ Handlers
  const addFaq = () => {
    setSettings(prev => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: '', answer: '', order: (prev.faqs?.length || 0) + 1 }]
    }));
  };

  const updateFaq = (index, field, value) => {
    const newFaqs = [...settings.faqs];
    newFaqs[index][field] = value;
    setSettings({ ...settings, faqs: newFaqs });
  };

  const removeFaq = (index) => {
    const newFaqs = [...settings.faqs];
    newFaqs.splice(index, 1);
    setSettings({ ...settings, faqs: newFaqs });
  };

  // Announcement Handlers
  const addAnnouncement = () => {
    setSettings(prev => ({
      ...prev,
      announcements: [...(prev.announcements || []), { title: '', content: '', isActive: true }]
    }));
  };

  const updateAnnouncement = (index, field, value) => {
    const newAnn = [...settings.announcements];
    newAnn[index][field] = value;
    setSettings({ ...settings, announcements: newAnn });
  };

  const removeAnnouncement = (index) => {
    const newAnn = [...settings.announcements];
    newAnn.splice(index, 1);
    setSettings({ ...settings, announcements: newAnn });
  };

  // Image Upload Handler
  const [isUploading, setIsUploading] = useState(false);
  const handleUploadImage = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Assuming Admin authentication JWT is handled by the browser/proxy automatically
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/upload`, { credentials: 'include', 
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      callback(data.url);
    } catch (err) {
      alert('Error uploading image: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Team Handlers
  const addTeamMember = () => {
    setSettings(prev => ({
      ...prev,
      teamMembers: [...(prev.teamMembers || []), { name: '', role: '', type: 'team', imageUrl: '', linkedin: '' }]
    }));
  };

  const updateTeamMember = (index, field, value) => {
    const newTeam = [...settings.teamMembers];
    newTeam[index][field] = value;
    setSettings({ ...settings, teamMembers: newTeam });
  };

  const removeTeamMember = (index) => {
    const newTeam = [...settings.teamMembers];
    newTeam.splice(index, 1);
    setSettings({ ...settings, teamMembers: newTeam });
  };

  // Gallery Handlers
  const addGalleryImage = () => {
    setSettings(prev => ({
      ...prev,
      gallery: [...(prev.gallery || []), { imageUrl: '', caption: '' }]
    }));
  };

  const updateGalleryImage = (index, field, value) => {
    const newGallery = [...settings.gallery];
    newGallery[index][field] = value;
    setSettings({ ...settings, gallery: newGallery });
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...settings.gallery];
    newGallery.splice(index, 1);
    setSettings({ ...settings, gallery: newGallery });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
            Content & Settings
          </h1>
          <p className="text-slate text-sm">Manage global event configuration and dynamic website content.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gold text-white rounded-lg font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {error && <div className="p-4 bg-error/10 text-error rounded-xl">{error}</div>}

      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="flex border-b border-border bg-surface overflow-x-auto whitespace-nowrap scrollbar-hide">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors shrink-0 ${activeTab === 'general' ? 'bg-white text-navy border-b-2 border-b-navy' : 'text-slate hover:text-navy'}`}
          >
            <Settings size={16} />
            General Settings
          </button>
          <button 
            onClick={() => setActiveTab('faqs')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors shrink-0 ${activeTab === 'faqs' ? 'bg-white text-navy border-b-2 border-b-navy' : 'text-slate hover:text-navy'}`}
          >
            <MessageCircleQuestion size={16} />
            FAQs
          </button>
          <button 
            onClick={() => setActiveTab('announcements')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors shrink-0 ${activeTab === 'announcements' ? 'bg-white text-navy border-b-2 border-b-navy' : 'text-slate hover:text-navy'}`}
          >
            <Bell size={16} />
            Announcements
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors shrink-0 ${activeTab === 'team' ? 'bg-white text-navy border-b-2 border-b-navy' : 'text-slate hover:text-navy'}`}
          >
            <Users size={16} />
            Team & Guests
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors shrink-0 ${activeTab === 'gallery' ? 'bg-white text-navy border-b-2 border-b-navy' : 'text-slate hover:text-navy'}`}
          >
            <ImageIcon size={16} />
            Gallery
          </button>
        </div>

        <div className="p-6">
          {/* GENERAL SETTINGS */}
          {activeTab === 'general' && (
            <div className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Event Name</label>
                  <input 
                    type="text" 
                    value={settings.eventName}
                    onChange={(e) => setSettings({...settings, eventName: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Registration Fee (₹)</label>
                  <input 
                    type="number" 
                    value={settings.registrationFee}
                    onChange={(e) => setSettings({...settings, registrationFee: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={settings.startDate}
                    onChange={(e) => setSettings({...settings, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">End Date</label>
                  <input 
                    type="date" 
                    value={settings.endDate}
                    onChange={(e) => setSettings({...settings, endDate: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy mb-1">Registration Deadline</label>
                  <input 
                    type="date" 
                    value={settings.registrationDeadline}
                    onChange={(e) => setSettings({...settings, registrationDeadline: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-1">Venue</label>
                <input 
                  type="text" 
                  value={settings.venue}
                  onChange={(e) => setSettings({...settings, venue: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy mb-2">Homepage About Section Image</label>
                <div className="w-full h-48 bg-surface border-2 border-dashed border-border rounded-lg overflow-hidden relative group max-w-sm">
                  {settings.aboutImage ? (
                    <img src={settings.aboutImage} alt="About preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate">
                      <ImageIcon size={24} className="mb-2" />
                      <span className="text-xs font-medium">No Image</span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                    <Upload size={20} className="mb-1" />
                    <span className="text-xs font-medium">Upload Image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleUploadImage(e, (url) => setSettings({...settings, aboutImage: url}))}
                    />
                  </label>
                </div>
                <p className="text-xs text-slate mt-2">This image will appear on the homepage in the "About VVS" section.</p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-border">
                <input 
                  type="checkbox" 
                  id="regOpen"
                  checked={settings.registrationOpen}
                  onChange={(e) => setSettings({...settings, registrationOpen: e.target.checked})}
                  className="w-5 h-5 accent-gold"
                />
                <label htmlFor="regOpen" className="font-bold text-navy select-none cursor-pointer">
                  Registration is Open
                </label>
                <span className="text-sm text-slate ml-2">Uncheck this to lock the registration form globally.</span>
              </div>
            </div>
          )}

          {/* FAQS */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button 
                  onClick={addFaq}
                  className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm rounded-lg hover:bg-navy-light transition-colors"
                >
                  <Plus size={16} /> Add FAQ
                </button>
              </div>

              <div className="space-y-4">
                {(!settings.faqs || settings.faqs.length === 0) ? (
                  <div className="text-center p-8 border border-dashed border-border rounded-xl text-slate">
                    No FAQs added yet.
                  </div>
                ) : (
                  settings.faqs.map((faq, index) => (
                    <div key={index} className="flex gap-4 p-4 border border-border rounded-xl bg-surface/30">
                      <div className="font-bold text-slate-dark pt-2">{index + 1}.</div>
                      <div className="flex-1 space-y-3">
                        <input 
                          type="text" 
                          placeholder="Question"
                          value={faq.question}
                          onChange={(e) => updateFaq(index, 'question', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none font-medium"
                        />
                        <textarea 
                          placeholder="Answer"
                          rows="2"
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none resize-none text-sm"
                        ></textarea>
                      </div>
                      <button 
                        onClick={() => removeFaq(index)}
                        className="text-slate hover:text-error self-start p-2 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button 
                  onClick={addAnnouncement}
                  className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm rounded-lg hover:bg-navy-light transition-colors"
                >
                  <Plus size={16} /> Add Announcement
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(!settings.announcements || settings.announcements.length === 0) ? (
                  <div className="col-span-full text-center p-8 border border-dashed border-border rounded-xl text-slate">
                    No active announcements.
                  </div>
                ) : (
                  settings.announcements.map((ann, index) => (
                    <div key={index} className="flex flex-col gap-3 p-4 border border-border rounded-xl bg-surface/30 relative">
                      <button 
                        onClick={() => removeAnnouncement(index)}
                        className="absolute top-4 right-4 text-slate hover:text-error transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <input 
                        type="text" 
                        placeholder="Announcement Title"
                        value={ann.title}
                        onChange={(e) => updateAnnouncement(index, 'title', e.target.value)}
                        className="w-full pr-8 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none font-bold text-navy"
                      />
                      <textarea 
                        placeholder="Announcement Details..."
                        rows="3"
                        value={ann.content}
                        onChange={(e) => updateAnnouncement(index, 'content', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none resize-none text-sm"
                      ></textarea>
                      <div className="flex items-center gap-2 mt-auto">
                        <input 
                          type="checkbox" 
                          checked={ann.isActive}
                          onChange={(e) => updateAnnouncement(index, 'isActive', e.target.checked)}
                          className="w-4 h-4 accent-navy"
                        />
                        <span className="text-sm font-medium text-slate-dark">Visible on Homepage</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TEAM MEMBERS */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button 
                  onClick={addTeamMember}
                  className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm rounded-lg hover:bg-navy-light transition-colors"
                >
                  <Plus size={16} /> Add Member/Guest
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(!settings.teamMembers || settings.teamMembers.length === 0) ? (
                  <div className="col-span-full text-center p-8 border border-dashed border-border rounded-xl text-slate">
                    No team members or guests added yet.
                  </div>
                ) : (
                  settings.teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col gap-3 p-4 border border-border rounded-xl bg-surface/30 relative">
                      <button 
                        onClick={() => removeTeamMember(index)}
                        className="absolute top-4 right-4 text-slate hover:text-error transition-colors z-10 bg-white/80 rounded-full p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                      
                      {/* Image Upload Area */}
                      <div className="w-full h-48 bg-surface border-2 border-dashed border-border rounded-lg overflow-hidden relative group">
                        {member.imageUrl && member.imageUrl !== '/assets/placeholder.jpg' ? (
                          <img src={member.imageUrl} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-slate">
                            <ImageIcon size={24} className="mb-2" />
                            <span className="text-xs font-medium">No Image</span>
                          </div>
                        )}
                        <label className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                          <Upload size={20} className="mb-1" />
                          <span className="text-xs font-medium">Upload Photo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleUploadImage(e, (url) => updateTeamMember(index, 'imageUrl', url))}
                          />
                        </label>
                      </div>

                      <select
                        value={member.type || 'team'}
                        onChange={(e) => updateTeamMember(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none text-sm text-slate-dark bg-white"
                      >
                        <option value="team">Organising Team Member</option>
                        <option value="guest">Guest Panel (Judging)</option>
                      </select>

                      <input 
                        type="text" 
                        placeholder="Full Name"
                        value={member.name}
                        onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none font-bold text-navy text-sm"
                      />
                      <input 
                        type="text" 
                        placeholder="Role (e.g. President or Chief Guest)"
                        value={member.role}
                        onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none text-sm text-slate-dark"
                      />
                      <input 
                        type="text" 
                        placeholder="LinkedIn URL (Optional)"
                        value={member.linkedin || ''}
                        onChange={(e) => updateTeamMember(index, 'linkedin', e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold outline-none text-xs text-slate"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100">
                <span className="text-sm font-medium">Add photos to display in the VVS 1.0 Gallery section on the public website.</span>
                <button 
                  onClick={addGalleryImage}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                >
                  <Plus size={16} /> Add Photo Box
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(!settings.gallery || settings.gallery.length === 0) ? (
                  <div className="col-span-full text-center p-8 border border-dashed border-border rounded-xl text-slate">
                    No gallery images added yet.
                  </div>
                ) : (
                  settings.gallery.map((img, index) => (
                    <div key={index} className="flex flex-col gap-2 p-3 border border-border rounded-xl bg-surface/30 relative">
                      <button 
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-4 right-4 text-slate hover:text-error transition-colors z-10 bg-white/80 rounded-full p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                      
                      {/* Image Upload Area */}
                      <div className="w-full aspect-square bg-surface border-2 border-dashed border-border rounded-lg overflow-hidden relative group">
                        {img.imageUrl ? (
                          <img src={img.imageUrl} alt="gallery preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-slate">
                            <ImageIcon size={24} className="mb-2" />
                            <span className="text-xs font-medium">No Image</span>
                          </div>
                        )}
                        <label className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                          <Upload size={20} className="mb-1" />
                          <span className="text-xs font-medium">Upload</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => handleUploadImage(e, (url) => updateGalleryImage(index, 'imageUrl', url))}
                          />
                        </label>
                      </div>

                      <input 
                        type="text" 
                        placeholder="Caption (Optional)"
                        value={img.caption || ''}
                        onChange={(e) => updateGalleryImage(index, 'caption', e.target.value)}
                        className="w-full px-2 py-1.5 border border-border rounded focus:ring-2 focus:ring-gold outline-none text-xs text-slate-dark text-center"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isUploading && (
        <div className="fixed inset-0 bg-navy/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium text-navy">Uploading to Cloudinary...</span>
          </div>
        </div>
      )}
    </div>
  );
}
