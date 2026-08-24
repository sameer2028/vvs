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
      description: 'Air-conditioned auditorium for ceremonies.'
    },
    {
      icon: Building2,
      title: 'Committee Chambers',
      description: 'Spacious halls with modern seating & AV.'
    },
    {
      icon: Wifi,
      title: 'High-Speed Wi-Fi',
      description: 'Wi-Fi across halls for real-time research.'
    },
    {
      icon: Coffee,
      title: 'Delegate Dining',
      description: 'Complimentary lunch & high-tea lounge.'
    },
    {
      icon: ShieldCheck,
      title: 'Security & Medical',
      description: '24/7 security & on-campus first-aid desk.'
    },
    {
      icon: Compass,
      title: 'Help Desk',
      description: 'Registration support & delegate assistance.'
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

  const heroImage = "/vkm.jpeg";
  const institutionImage = venueImage || "/ChatGPT Image Aug 24, 2026, 10_34_37 AM.png";

  return (
    <div className="venue-page pt-20 lg:pt-24">
      <section className="venue-hero">
        <div className="venue-hero-orbit" />
        <div className="container-wide venue-hero-grid">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="venue-hero-copy">
            <span className="venue-eyebrow"><MapPin size={14} /> Official Conference Venue</span>
            <h1>Vasant Kanya<br /><span className="text-[#c69a4a] italic font-serif">Mahavidyalaya</span></h1>
            <p className="venue-location"><MapPin size={18} /> Kammacha, Varanasi, Uttar Pradesh — 221010</p>
            <div className="venue-date-card">
              <span className="venue-icon-circle"><Calendar size={20} /></span>
              <span><small>Conference Dates</small><strong>26 – 27 September 2026</strong></span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.1 }} className="venue-hero-visual">
            <div className="venue-hero-image">
              <img src={heroImage} alt="Vasant Kanya Mahavidyalaya campus" />
            </div>
            <div className="venue-floating-card"><Building2 size={22} /><span>A Premier Academic<br />Conference Destination</span><i /></div>
          </motion.div>
        </div>
        <div className="venue-hero-curve" />
      </section>

      <section className="venue-institution section-padding">
        <div className="container-wide venue-institution-grid">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="venue-institution-image">
            <img src={institutionImage} alt="Vasant Kanya Mahavidyalaya Campus Venue" />
            <span className="venue-image-label">Official venue</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="venue-institution-copy">
            <span className="venue-section-label">About the Institution</span>
            <h2>A Legacy of Excellence in Kashi</h2>
            <p>Established in 1954 under the inspiration of <strong>Dr. Annie Besant</strong> and founded by <strong>Dr. Rohit Mehta</strong>, <strong>Vasant Kanya Mahavidyalaya (VKM)</strong> is an esteemed institution affiliated with the prestigious <strong>Banaras Hindu University (BHU)</strong>.</p>
            <p>Situated in the historic heart of Varanasi at Kammacha, VKM provides a serene yet vibrant academic atmosphere ideal for intellectual exchanges, political debates, and global diplomacy simulations.</p>
            <div className="venue-fact-grid">
              {[
                { icon: Calendar, value: '1954', label: 'Founded' },
                { icon: GraduationCap, value: 'BHU, Varanasi', label: 'Affiliation' },
                { icon: MapPin, value: 'Kammacha', label: 'Campus Area' },
                { icon: Sparkles, value: 'Education as Service', label: 'Motto' },
              ].map(({ icon: Icon, value, label }) => <div className="venue-fact" key={label}><span><Icon size={18} /></span><strong>{value}</strong><small>{label}</small></div>)}
            </div>
            <a href={googleMapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="venue-directions"><Navigation size={16} /> Get Directions <ExternalLink size={13} /></a>
          </motion.div>
        </div>
      </section>

      <section className="venue-facilities section-padding">
        <div className="container-wide">
          <div className="venue-section-heading"><span className="venue-section-label">Infrastructure</span><h2>Venue Facilities for Delegates</h2><p>Designed to give delegates a seamless and comfortable conference experience.</p></div>
          <div className="venue-facility-strip">
            {facilities.map(({ icon: Icon, title, description }, i) => <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.05 }} className="venue-facility-card"><span><Icon size={21} /></span><div><h3>{title}</h3><p>{description}</p></div></motion.div>)}
          </div>
        </div>
      </section>

      {/* ── Premium Cartographic Map ──────────────────────────────── */}
      <CartographicArrivalMap />

      {/* Travel & Transport Guide */}
      <section className="venue-travel section-padding">
        <div className="container-wide">
          <div className="venue-section-heading">
            <span className="venue-section-label">Travel Guide</span>
            <h2>How to Reach the Venue</h2>
            <p>Vasant Kanya Mahavidyalaya is centrally located in Kammacha, making it easily accessible from all major transit hubs in Varanasi.</p>
          </div>

          <div className="venue-transit-grid">
            {transitOptions.map((opt, idx) => {
              const IconComp = opt.icon;
              return (
                <motion.div
                  key={opt.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="venue-transit-card"
                >
                  <div className="venue-transit-header">
                    <div className="venue-transit-icon">
                      <IconComp size={20} />
                    </div>
                    <h3>{opt.type}</h3>
                  </div>

                  <div className="venue-transit-details">
                    {opt.details.map((d) => (
                      <div key={d.name} className="venue-transit-item">
                        <div className="venue-transit-item-top">
                          <span className="venue-transit-item-name">{d.name}</span>
                          <span className="venue-transit-item-dist">{d.distance}</span>
                        </div>
                        <p className="venue-transit-item-time">{d.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="venue-landmarks section-padding">
        <div className="container-wide">
          <div className="venue-landmarks-card-wrapper">
            <h3 className="venue-landmarks-title">
              <Sparkles size={20} style={{ color: 'var(--venue-gold)' }} /> Explore Kashi: Nearby Landmarks
            </h3>
            <div className="gold-line mb-6" />
            <div className="venue-landmarks-grid">
              {nearbyLandmarks.map((lm) => (
                <div key={lm.name} className="venue-landmark-card">
                  <div>
                    <div className="venue-landmark-top">
                      <h4>{lm.name}</h4>
                      <span className="venue-landmark-dist">{lm.distance}</span>
                    </div>
                    <p>{lm.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

