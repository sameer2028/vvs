import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { InstagramIcon as Instagram } from '../../components/common/SocialIcons';
import { contactInfo } from '../../data/mockData';

export default function ContactPage() {
  return (
    <div className="contact-page pt-20 lg:pt-24 bg-[#F9F6F0]">
      {/* ── 1. Deep Navy Banner with Temple Line Artwork ──────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0b1a30] via-[#14284b] to-[#0f2240] text-white py-14 sm:py-20 border-b border-[#2c72b8]/30">
        {/* Kashi Temple Dome Outline SVG Watermark */}
        <div className="absolute right-0 bottom-0 top-0 opacity-15 pointer-events-none flex items-end justify-end">
          <svg viewBox="0 0 600 400" className="h-full w-auto text-white fill-none stroke-current" strokeWidth="1.5">
            {/* Central Temple Dome Outline */}
            <path d="M 300 80 Q 350 140 370 220 L 230 220 Q 250 140 300 80 Z" />
            <path d="M 300 40 L 300 80" strokeWidth="3" />
            <circle cx="300" cy="35" r="5" fill="currentColor" />
            <path d="M 210 220 L 390 220 L 400 400 L 200 400 Z" />
            <path d="M 270 300 C 270 260 330 260 330 300 L 330 400 L 270 400 Z" />
            {/* Left & Right Side Domes */}
            <path d="M 150 160 Q 185 200 200 260 L 100 260 Q 115 200 150 160 Z" />
            <path d="M 450 160 Q 485 200 500 260 L 400 260 Q 415 200 450 160 Z" />
            <path d="M 90 260 L 210 260 L 210 400 L 90 400 Z" />
            <path d="M 390 260 L 510 260 L 510 400 L 390 400 Z" />
          </svg>
        </div>

        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-left space-y-4"
          >
            {/* Pre-title Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold tracking-[0.25em] text-[#c69a4a] uppercase">
                CONTACT
              </span>
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
            </div>

            {/* Main Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-heading, "Playfair Display", Georgia, serif)' }}
            >
              Let’s <span className="text-[#c69a4a] italic font-serif">Connect</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-md pt-1">
              Have a question about VVS 2.0?<br />
              Reach out to the organizing team.
            </p>

            <div className="h-0.5 w-16 bg-[#c69a4a] rounded-full pt-1" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. 2x2 Watermarked Contact Cards Grid ─────────────────── */}
      <section className="py-12 sm:py-16 bg-[#F9F6F0]">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Card */}
            <motion.a
              href={`mailto:${contactInfo.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Mail size={24} />
                </div>
                <h3
                  className="text-2xl font-bold text-[#14284b] mb-1"
                  style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                >
                  Email
                </h3>
                <div className="w-8 h-0.5 bg-[#c69a4a] rounded-full my-3" />
                <p className="text-sm sm:text-base font-semibold text-[#2c72b8] group-hover:underline break-all">
                  {contactInfo.email}
                </p>
              </div>

              {/* Watermark Icon */}
              <div className="absolute -bottom-6 -right-6 text-[#14284b]/5 pointer-events-none">
                <Mail size={140} strokeWidth={1} />
              </div>
            </motion.a>

            {/* Instagram Card */}
            <motion.a
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group relative bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Instagram size={24} />
                </div>
                <h3
                  className="text-2xl font-bold text-[#14284b] mb-1"
                  style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                >
                  Instagram
                </h3>
                <div className="w-8 h-0.5 bg-[#c69a4a] rounded-full my-3" />
                <p className="text-sm sm:text-base font-semibold text-[#2c72b8] flex items-center gap-1.5 group-hover:underline">
                  {contactInfo.instagram}
                  <ExternalLink size={14} />
                </p>
              </div>

              {/* Watermark Icon */}
              <div className="absolute -bottom-6 -right-6 text-[#14284b]/5 pointer-events-none">
                <Instagram size={140} strokeWidth={1} />
              </div>
            </motion.a>

            {/* WhatsApp Card */}
            <motion.a
              href={`https://wa.me/91${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group relative bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <MessageCircle size={24} />
                </div>
                <h3
                  className="text-2xl font-bold text-[#14284b] mb-1"
                  style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                >
                  WhatsApp
                </h3>
                <div className="w-8 h-0.5 bg-[#c69a4a] rounded-full my-3" />
                <p className="text-sm sm:text-base font-semibold text-[#2c72b8] group-hover:underline">
                  {contactInfo.whatsapp}
                </p>
              </div>

              {/* Watermark Icon */}
              <div className="absolute -bottom-6 -right-6 text-[#14284b]/5 pointer-events-none">
                <MessageCircle size={140} strokeWidth={1} />
              </div>
            </motion.a>

            {/* Venue Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="group relative bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h3
                  className="text-2xl font-bold text-[#14284b] mb-1"
                  style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                >
                  Venue
                </h3>
                <div className="w-8 h-0.5 bg-[#c69a4a] rounded-full my-3" />
                <div className="text-sm text-slate-dark leading-relaxed">
                  <strong className="text-[#2c72b8] font-semibold block">{contactInfo.venue.name}</strong>
                  {contactInfo.venue.address}
                </div>
              </div>

              {/* Watermark Icon */}
              <div className="absolute -bottom-6 -right-6 text-[#14284b]/5 pointer-events-none">
                <MapPin size={140} strokeWidth={1} />
              </div>
            </motion.div>
          </div>

          {/* ── 3. Phone Contacts Section ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white rounded-2xl border border-border p-6 sm:p-10 shadow-sm overflow-hidden"
          >
            {/* Header with Gold Line Rules */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
              <h3
                className="text-xl sm:text-2xl font-bold text-[#14284b]"
                style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
              >
                Phone Contacts
              </h3>
              <div className="h-0.5 w-12 bg-[#c69a4a] rounded-full" />
            </div>

            {/* 2-Column Phone Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              {contactInfo.contacts.map((contact) => (
                <a
                  key={contact.name}
                  href={`tel:+91${contact.phone}`}
                  className="flex items-center gap-4 p-4 bg-[#f4f7fc] rounded-xl border border-[#e4eaf2]
                    hover:border-[#2c72b8]/40 hover:bg-[#eaf2fb]/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0b1a30] text-[#c69a4a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div
                      className="text-base font-bold text-[#14284b]"
                      style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                    >
                      {contact.name}
                    </div>
                    <div className="text-sm font-semibold text-[#2c72b8] mt-0.5">{contact.phone}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Temple Silhouette Watermark on Bottom-Right */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <svg viewBox="0 0 200 150" className="w-48 h-auto text-[#14284b] fill-none stroke-current" strokeWidth="1.5">
                <path d="M 100 20 Q 120 50 130 90 L 70 90 Q 80 50 100 20 Z" />
                <path d="M 60 90 L 140 90 L 145 150 L 55 150 Z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
