import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CartographicArrivalMap from '../../components/venue/CartographicArrivalMap';
import {
  MapPin,
  Navigation,
  Train,
  Plane,
  Bus,
  Building2,
  ShieldCheck,
  Wifi,
  Coffee,
  Mic2,
  Calendar,
  ExternalLink,
  PhoneCall,
  Compass,
  Sparkles,
  Camera,
  Star,
  GraduationCap
} from 'lucide-react';

export default function VenuePage() {
  const [venueImage, setVenueImage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, { credentials: 'include' });
        const data = await response.json();
        if (data.venueImage) {
          setVenueImage(data.venueImage);
        }
      } catch (err) {
        console.error('Failed to load venue image:', err);
      }
    };
    fetchSettings();
  }, []);

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.817457790596!2d82.99220027591605!3d25.2935299285097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e31fcd815b801%3A0xb35ec2e5f5da812f!2sVasant%20Kanya%20Mahavidyalaya!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";
  const googleMapsDirectionsUrl = "https://maps.google.com/?q=Vasant+Kanya+Mahavidyalaya+Kammacha+Varanasi";

  const facilities = [
    {
      icon: Mic2,
      title: 'Grand Auditorium',
      description: 'Air-conditioned main auditorium equipped with professional acoustics for opening and closing ceremonies.'
    },
    {
      icon: Building2,
      title: 'Committee Chambers',
      description: 'Dedicated spacious halls for Youth Parliament & MUN debates with modern seating and AV systems.'
    },
    {
      icon: Wifi,
      title: 'High-Speed Connectivity',
      description: 'Wi-Fi access across all committee halls to support real-time research and draft resolution drafting.'
    },
    {
      icon: Coffee,
      title: 'Delegate Dining Lounge',
      description: 'Curated dining area providing complimentary high-tea, snacks, and lunch during the conference days.'
    },
    {
      icon: ShieldCheck,
      title: 'Security & Medical Desk',
      description: '24/7 on-campus security coverage along with a dedicated first-aid and medical assistance desk.'
    },
    {
      icon: Compass,
      title: 'Help Desk & Press Bureau',
      description: 'On-site registration support, portfolio guidance, and media workspace for Press Conclave delegates.'
    }
  ];

  const transitOptions = [
    {
      icon: Train,
      type: 'By Train (Railway Stations)',
      details: [
        { name: 'Varanasi Junction (BSB)', distance: '4.5 km', time: '15-20 mins via Auto/Taxi' },
        { name: 'Banaras Railway Station (BSBS)', distance: '3.5 km', time: '10-15 mins via Auto/Taxi' },
        { name: 'Pt. Deen Dayal Upadhyaya Jn (DDU)', distance: '18 km', time: '40-50 mins via Cab/Bus' },
      ]
    },
    {
      icon: Plane,
      type: 'By Air (Airport)',
      details: [
        { name: 'Lal Bahadur Shastri Int\'l Airport (VNS)', distance: '26 km', time: '45-60 mins via Prepaid Taxi / Ola / Uber' }
      ]
    },
    {
      icon: Bus,
      type: 'Local Transit (In Varanasi)',
      details: [
        { name: 'Auto & E-Rickshaws', distance: 'Direct to Kammacha', time: 'Frequently available across Varanasi city' },
        { name: 'Ride Hailing (Ola / Uber)', distance: 'App Based', time: 'Pickup directly to VKM main entrance gate' }
      ]
    }
  ];

  const nearbyLandmarks = [
    { name: 'Assi Ghat', distance: '2.0 km', description: 'Famous riverfront known for morning Subah-e-Banaras and vibrant cafes.' },
    { name: 'BHU Main Gate (Lanka)', distance: '2.5 km', description: 'Iconic entrance to Asia\'s largest residential university campus.' },
    { name: 'Kashi Vishwanath Temple', distance: '3.2 km', description: 'The sacred Jyotirlinga shrine and newly built Vishwanath Corridor.' },
    { name: 'Dashashwamedh Ghat', distance: '3.5 km', description: 'World-famous Ganga Aarti venue in the historic heart of Kashi.' }
  ];

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero Header */}
      <section className="bg-navy text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-60" />
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
              <MapPin size={14} className="text-gold" /> Official Conference Venue
            </div>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Vasant Kanya Mahavidyalaya
            </h1>
            <p className="text-lg sm:text-xl text-gold-light font-medium max-w-3xl mx-auto mb-3">
              Kammacha, Varanasi, Uttar Pradesh — 221010
            </p>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto flex items-center justify-center gap-2">
              <Calendar size={16} className="text-gold" />
              <span>Conference Dates: <strong>26–27 September 2026</strong></span>
            </p>
            <div className="mt-6 w-20 h-[3px] bg-gold rounded-full mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Quick Overview & Institutional Context */}
      <section className="section-padding bg-ivory">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl border border-border p-6 sm:p-10 shadow-[var(--shadow-card)] mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Overview & Specs */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border">
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold text-gold uppercase tracking-wider">Institution Overview</span>
                    <h2 className="text-xl sm:text-3xl font-bold text-navy mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                      A Legacy of Excellence in Kashi
                    </h2>
                  </div>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy text-white text-xs sm:text-sm font-semibold rounded-lg sm:rounded-xl
                      hover:bg-navy-light transition-all duration-200 shadow-md shrink-0"
                  >
                    <Navigation size={14} className="text-gold" />
                    Get Directions
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                </div>

                <p className="text-xs sm:text-base text-slate leading-relaxed">
                  Established in 1954 under the inspiration of <strong>Dr. Annie Besant</strong> and founded by <strong>Dr. Rohit Mehta</strong>,
                  <strong> Vasant Kanya Mahavidyalaya (VKM)</strong> is an esteemed institution affiliated with the prestigious <strong>Banaras Hindu University (BHU)</strong>.
                  Situated in the historic heart of Varanasi at Kammacha, VKM provides a serene yet vibrant academic atmosphere ideal for intellectual exchanges, political debates, and global diplomacy simulations.
                </p>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                  {[
                    { label: 'Founded', value: '1954' },
                    { label: 'Affiliation', value: 'BHU, Varanasi' },
                    { label: 'Campus Area', value: 'Kammacha' },
                    { label: 'Motto', value: 'Education as Service' },
                  ].map((item) => (
                    <div key={item.label} className="p-2.5 bg-surface rounded-lg sm:rounded-xl border border-border/60 text-center">
                      <div className="text-sm sm:text-lg font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate mt-0.5 font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Venue Photo */}
              <div className="lg:col-span-5 h-full flex flex-col justify-center">
                <div className="w-full h-full min-h-[280px] sm:min-h-[350px] max-h-[440px] rounded-xl overflow-hidden bg-navy/5 relative group border border-border shadow-md flex items-center justify-center">
                  {venueImage ? (
                    <img
                      src={venueImage}
                      alt="Vasant Kanya Mahavidyalaya Campus Venue"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col items-center justify-center bg-gradient-to-br from-navy/5 via-gold/5 to-surface text-center min-h-[280px]">
                      <div className="w-14 h-14 rounded-full bg-gold-subtle flex items-center justify-center mb-3">
                        <Building2 size={28} className="text-gold-dark" />
                      </div>
                      <h3 className="text-base font-bold text-navy" style={{ fontFamily: 'var(--font-heading)' }}>
                        VKM Campus Photo
                      </h3>
                      <p className="text-xs text-slate mt-1 max-w-xs">
                        Admin can upload & update the venue photo anytime from the Admin Portal.
                      </p>
                    </div>
                  )}
                  {venueImage && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent p-4 text-white flex justify-between items-end">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded bg-gold text-navy text-[10px] font-bold uppercase tracking-wider mb-1">
                          Official Venue
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          Vasant Kanya Mahavidyalaya
                        </h4>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Campus Facilities Grid */}
          <div className="mb-8 sm:mb-16">
            <div className="text-center mb-6 sm:mb-10">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Infrastructure</span>
              <h2 className="text-xl sm:text-3xl font-bold text-navy mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Venue Facilities for Delegates
              </h2>
              <p className="text-slate text-xs sm:text-base mt-1.5 max-w-xl mx-auto">
                Designed to give delegates a seamless and comfortable conference experience.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {facilities.map((fac, i) => {
                const IconComponent = fac.icon;
                return (
                  <motion.div
                    key={fac.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="bg-white rounded-xl border border-border p-3.5 sm:p-6 hover:border-gold/40 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gold-subtle flex items-center justify-center mb-2.5 sm:mb-4 group-hover:bg-gold/20 transition-colors">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gold-dark" />
                      </div>
                      <h3 className="text-xs sm:text-lg font-bold text-navy mb-1 sm:mb-2 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                        {fac.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm text-slate leading-snug sm:leading-relaxed">
                        {fac.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Premium Cream Cartographic Map ──────────────────────────────── */}
      <CartographicArrivalMap />

      {/* Travel & Transport Guide */}
      <section className="section-padding bg-surface">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">Travel Guide</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
              How to Reach the Venue
            </h2>
            <p className="text-slate text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Vasant Kanya Mahavidyalaya is centrally located in Kammacha, making it easily accessible from all major transit hubs in Varanasi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {transitOptions.map((opt, idx) => {
              const IconComp = opt.icon;
              return (
                <motion.div
                  key={opt.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0">
                      <IconComp size={20} className="text-navy" />
                    </div>
                    <h3 className="font-bold text-navy text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                      {opt.type}
                    </h3>
                  </div>

                  <div className="space-y-4 flex-1">
                    {opt.details.map((d) => (
                      <div key={d.name} className="p-3 bg-surface rounded-xl border border-border/50">
                        <div className="flex items-center justify-between text-sm font-semibold text-navy">
                          <span>{d.name}</span>
                          <span className="text-xs font-bold text-gold px-2 py-0.5 rounded bg-gold-subtle shrink-0">
                            {d.distance}
                          </span>
                        </div>
                        <p className="text-xs text-slate mt-1">{d.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Nearby Attractions */}
          <div className="bg-white rounded-2xl border border-border p-6 sm:p-8">
            <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
              <Sparkles size={20} className="text-gold" /> Explore Kashi: Nearby Landmarks
            </h3>
            <div className="gold-line mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {nearbyLandmarks.map((lm) => (
                <div key={lm.name} className="p-4 bg-surface rounded-xl border border-border/60">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-navy text-sm">{lm.name}</h4>
                    <span className="text-xs font-bold text-navy bg-gold/20 px-2 py-0.5 rounded">{lm.distance}</span>
                  </div>
                  <p className="text-xs text-slate leading-relaxed">{lm.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
