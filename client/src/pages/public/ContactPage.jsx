import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { InstagramIcon as Instagram } from '../../components/common/SocialIcons';
import { contactInfo } from '../../data/mockData';
import Button from '../../components/common/Button';

export default function ContactPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Page Header */}
      <section className="bg-navy text-white py-5 sm:py-7">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
              Contact
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Get in Touch
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Have questions? Reach out to the VVS 2.0 organizing team.
            </p>
            <div className="mt-5 w-16 h-[3px] bg-gold rounded-full mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section-padding bg-ivory">
        <div className="container-narrow mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* Email */}
            <motion.a
              href={`mailto:${contactInfo.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group bg-white rounded-xl border border-border p-6
                hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
                transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center mb-4
                group-hover:bg-gold/20 transition-colors">
                <Mail size={22} className="text-gold-dark" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Email
              </h3>
              <p className="text-sm text-slate">{contactInfo.email}</p>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group bg-white rounded-xl border border-border p-6
                hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
                transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center mb-4
                group-hover:bg-gold/20 transition-colors">
                <Instagram size={22} className="text-gold-dark" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Instagram
              </h3>
              <p className="text-sm text-slate flex items-center gap-1">
                {contactInfo.instagram}
                <ExternalLink size={12} />
              </p>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={`https://wa.me/91${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group bg-white rounded-xl border border-border p-6
                hover:border-gold/30 hover:shadow-[var(--shadow-card-hover)]
                transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center mb-4
                group-hover:bg-gold/20 transition-colors">
                <MessageCircle size={22} className="text-gold-dark" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                WhatsApp
              </h3>
              <p className="text-sm text-slate">{contactInfo.whatsapp}</p>
            </motion.a>

            {/* Venue */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-xl border border-border p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center mb-4">
                <MapPin size={22} className="text-gold-dark" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                Venue
              </h3>
              <p className="text-sm text-slate">
                {contactInfo.venue.name}<br />
                {contactInfo.venue.address}
              </p>
            </motion.div>
          </div>

          {/* Phone Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-border p-6 sm:p-8"
          >
            <h3
              className="text-xl font-bold text-navy mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Phone Contacts
            </h3>
            <div className="gold-line mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.contacts.map((contact) => (
                <a
                  key={contact.name}
                  href={`tel:+91${contact.phone}`}
                  className="flex items-center gap-4 p-4 bg-surface rounded-lg border border-border-light
                    hover:border-gold/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-subtle flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold-dark" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-navy">{contact.name}</div>
                    <div className="text-sm text-slate">{contact.phone}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Register CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Button to="/register" variant="primary" size="lg">
              Register for VVS 2.0
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
